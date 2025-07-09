import React from "react";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";

const App = () => {
  return (
    <div>
      <Hero />
      <Header />
    </div>
  );
};

export default React.memo(App);
