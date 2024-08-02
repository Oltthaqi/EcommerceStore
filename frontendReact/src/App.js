import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Products from "./components/Products/Products";
import Home from "./components/home/Home";
import Login from "./components/LoginRegister/LoginRegister";
import Cart from "./components/Cart/Cart";

function App() {
  const [category, setCategory] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setCategory(typeof value === "string" ? value.split(",") : value);
  };
  const handlePriceRange = (newValue) => {
    setPriceRange(newValue);
  };
  const handleAvailabilityChange = (isChecked) => {
    setShowAvailableOnly(isChecked);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/Cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/Products" element={<Products />} />
        <Route
          path="/products"
          element={
            <Products
              category={category}
              onCategoryChange={handleCategoryChange}
              priceRange={priceRange}
              onChangePrice={handlePriceRange}
              showAvailableOnly={showAvailableOnly}
              onChangeAvailability={handleAvailabilityChange}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
