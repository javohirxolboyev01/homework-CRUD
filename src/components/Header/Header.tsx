import React, { useState, type ChangeEvent } from "react";

const Header = () => {
  interface IData {
    id: number;
    name: string;
    surname: string;
    status: string;
  }

  const [form, setForm] = useState({
    name: "",
    surname: "",
    status: "",
  });
  const [data, setData] = useState<IData[]>([]);

  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    surname: "",
    status: "",
  });

  const handleDelete = (id: number) => {
    console.log(id);
    let res = data.filter((value: any) => value.id !== id);
    setData(res);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSave = () => {
    if (!form.name.trim()) return;
    const newUser = {
      id: Date.now(),
      name: form.name,
      surname: form.surname,
      status: form.status,
    };

    setData([...data, newUser]);

    setForm({ name: "", surname: "", status: "" });
  };

  const handleEdit = (user: any) => {
    setEditId(user.id);
    setEditForm({
      name: user.name,
      surname: user.surname,
      status: user.status,
    });
  };

  const handleSaveEdit = () => {
    setData(
      data.map((todo) => (todo.id === editId ? { ...todo, ...editForm } : todo))
    );
    setEditId(null);
    setEditForm({ name: "", surname: "", status: "" });
  };

  return (
    <div>
      <h1>Todo app</h1>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="surname"
        value={form.surname}
        placeholder="Surname"
        onChange={handleChange}
      />
      <input
        type="text"
        name="status"
        placeholder="Status"
        value={form.status}
        onChange={handleChange}
      />
      <button onClick={onSave}>Add</button>

      <ul>
        {data.map((user) => (
          <li key={user.id}>
            {editId === user.id ? (
              <div>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={editForm.surname}
                  onChange={(e) =>
                    setEditForm({ ...editForm, surname: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={editForm.status}
                  onChange={(e) =>
                    setEditForm({ ...editForm, status: e.target.value })
                  }
                />
                <button onClick={handleSaveEdit}>Save</button>
              </div>
            ) : (
              <div>
                <p>{user.name}</p>
                <p>{user.surname}</p>
                <p>{user.status}</p>
              </div>
            )}
            {editId !== user.id && (
              <>
                <button
                  style={{
                    color: "black",
                    background: "coral",
                    padding: "5px",
                    margin: "2px",
                  }}
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                <button
                  style={{ color: "white", background: "red", padding: "5px" }}
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(Header);
