import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../Auth.jsx";
import "./SingleProductPage.css";

const SingleProductPage = () => {
  const { id } = useParams();
  const { products } = useAuthContext();
  const product = products.find((p) => p.id === Number(id));

  // simple local quantity state (keeps the UI interactive on all sizes)
  const [qty, setQty] = useState(1);

  if (!product) return <h2 className="not-found">Product Not Found</h2>;

  // Filter 4 other products (randomish — preserve original behaviour)
  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  const increase = () => setQty((q) => Math.min(99, q + 1));
  const decrease = () => setQty((q) => Math.max(1, q - 1));

  return (

    <>

      {/* <p>
        <span onClick={() => navigate('/category')}>Category</span>
        <i className="bi bi-chevron-right"></i>Products
      </p> */}
      <div className="page-wrapper">
        <div className="details-container">
          {/* LEFT IMAGES */}
          <div className="left-images" aria-hidden={false}>
            <img
              src={product.image}
              className="main-image"
              alt={product.productName}
              loading="lazy"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="right-info">
            <h3 className="brand-title">The Dojos Figurines</h3>
            <h1 className="product-title">{product.productName}</h1>

            <div className="rating" aria-label="rating">
              ⭐⭐⭐⭐⭐ <span>(35 reviews)</span>
            </div>

            <h2 className="price">₹ {product.cost}</h2>
            <p className="stock-warning">Only 3 left!</p>

            {/* Quantity */}
            <div className="qty-and-actions">
              <div className="qty-box" role="group" aria-label="Quantity selector">
                <button className="qty-btn" onClick={decrease} aria-label="Decrease quantity">
                  −
                </button>
                <span className="qty-value" aria-live="polite">{qty}</span>
                <button className="qty-btn" onClick={increase} aria-label="Increase quantity">
                  +
                </button>
              </div>

              {/* Buttons */}
              <div className="btn-row">
                <button className="add-cart" aria-label="Add to cart">
                  Add to Cart
                </button>
                <button className="buy-now" aria-label="Buy now">
                  Buy Now
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="section">
              <h3>Product Description</h3>
              <p>
                Write the entire description here. Make the text SEO optimized.
              </p>
            </div>

            {/* Specifications */}
            <div className="section specifications">
              <h3>Specifications</h3>
              <ul className="spec-list">
                <li><div className="d-flex justify-content-between"><p className="spec-key">Height</p> <p>12 inches</p></div></li>
                <hr />
                <li><div className="d-flex justify-content-between"><p className="spec-key">Material</p> <p>PVC Plastic</p></div></li>
                <hr />
                <li><div className="d-flex justify-content-between"><p className="spec-key">Weight</p> <p>540 grams</p></div></li>
              </ul>
            </div>

            {/* Return Policy */}
            <div className="section">
              <h3>Return Policy</h3>
              <p>Return is only possible if the packaging is unbroken.</p>
            </div>

            {/* Care Guide */}
            <div className="section">
              <h3>Care Guide</h3>
              <p>Keep away from sunlight. Dust lightly with a soft brush.</p>
            </div>
          </div>

          {/* Customers Also Viewed */}
          <div className="related-products">
            <h2>Customers also viewed</h2>
            <div className="related-list">
              {related.map((item) => (
                <div key={item.id} className="related-card" role="button" tabIndex={0}>
                  <img src={item.image} alt={item.productName} loading="lazy" />
                  <p className="related-name">{item.productName}</p>
                  <span className="related-price">₹ {item.cost}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProductPage;
