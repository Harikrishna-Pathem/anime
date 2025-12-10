import React, { useState } from "react";
import "./BundlesDeals.css";

const BundlesDeals = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? products.length - 1 : prev - 1
    );
  };

  const currentProduct = products[currentIndex];
  console.log(currentProduct);


  return (
    <section className="bundles-container">
      <h1 className="bundles-title">Bundle Deals</h1>

      <div className="bundle-card">
        {/* Left Section */}
        <div className="bundle-left">
          <p className="bundle-tag">Best Seller</p>
          <h2 className="bundle-title">{currentProduct.name}</h2>
          <p className="bundle-price">${currentProduct.price}</p>
          <p className="bundle-desc">{currentProduct.description}</p>
          <button className="bundle-btn">View Bundle</button>
        </div>

        {/* Right Section */}
        <div className="bundle-right">
          <img
            src={currentProduct.image}
            alt={currentProduct.name}
            className="bundle-image"
          />
        </div>

        {/* Navigation Buttons */}
        <div className="bundle-nav">
          <button onClick={handlePrev}>&lt; Prev</button>
          <button onClick={handleNext}>Next &gt;</button>
        </div>
      </div>
    </section>
  );
};

export default BundlesDeals;
