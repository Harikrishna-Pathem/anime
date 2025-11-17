import React, { useRef } from "react";
import "./FeaturedProducts.css";

const FeaturedProducts = ({ products }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    const scrollAmount = current.offsetWidth * 0.8; // scroll by ~80% of container width
    current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="featured-container">
      <h1 className="featured-title">Featured Products</h1>

      {/* Scroll buttons */}
      {/* <div className="scroll-buttons">
        <button onClick={() => scroll("left")}>&lt;</button>
        <button onClick={() => scroll("right")}>&gt;</button>
      </div> */}

      {/* Product cards */}
      <div className="explore-menu-list" ref={scrollRef}>
        {products.map((product) => (
          <div key={product.id} className="explore-menu-list-item">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.items} items</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
