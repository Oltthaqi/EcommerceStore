import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Products from "./components/Products/Products";
import Home from "./components/home/Home";
import Login from "./components/LoginRegister/LoginRegister";

function App() {
  const [category, setCategory] = useState([]);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setCategory(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/products"
          element={
            <Products
              category={category}
              onCategoryChange={handleCategoryChange}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
