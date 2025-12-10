import React, { useEffect, useState } from "react";
import styles from "./CategoryProducts.module.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAuthContext } from "../../Auth";
import { useNavigate, useParams } from "react-router-dom";

export default function CategoryProducts() {
  const { categoryName } = useParams();
  const { products } = useAuthContext();
  const navigate = useNavigate();

  // filter products by category from context
  const filteredProducts = products.filter((p) => p.category === categoryName);

  // local products state (so we can toggle wishlist locally without mutating global context)
  const [productsList, setProductsList] = useState(filteredProducts);

  // keep productsList in sync when route / products change
  useEffect(() => {
    setProductsList(filteredProducts);
  }, [categoryName, products]);

  // cart state: { [productId]: quantity }
  const [cart, setCart] = useState({});

  const toggleWishlist = (id, e) => {
    // prevent triggering card navigation
    if (e) e.stopPropagation();

    setProductsList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, wishlisted: !p.wishlisted } : p))
    );
  };

  const addToCart = (id, e) => {
    if (e) e.stopPropagation();
    setCart((prev) => ({ ...prev, [id]: 1 }));
  };

  const incrementQty = (id, e) => {
    if (e) e.stopPropagation();
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const decrementQty = (id, e) => {
    if (e) e.stopPropagation();
    setCart((prev) => {
      const current = prev[id] || 0;
      if (current <= 1) {
        // remove from cart
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: current - 1 };
    });
  };

  return (
    <>
      {/* <p>
        <span onClick={() => navigate('/')}>Home</span>
        <i className="bi bi-chevron-right"></i>Products
      </p> */}
      <section className={styles.listContainer}>
        <h1 className={styles.listTitle}>All Products</h1>

        <div className={styles.grid}>
          {productsList?.map((product) => (
            <div
              key={product.id}
              className={styles.gridCard}
              onClick={() => navigate(`/product/${product.id}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") navigate(`/product/${product.id}`);
              }}
            >
              <div className={styles.gridImageWrapper}>
                <img src={product.image} alt={product.productName} />

                <div
                  className={styles.wishlistIcon}
                  onClick={(e) => toggleWishlist(product.id, e)}
                  title={product.wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  role="button"
                >
                  {product.wishlisted ? (
                    <FaHeart color="red" size={22} />
                  ) : (
                    <FaRegHeart color="black" size={22} />
                  )}
                </div>
              </div>

              <div className={styles.gridInfo}>
                <h3>{product.productName}</h3>
                <div className="d-flex justify-content-between">
                  <p>RS : ₹{product.cost}</p>




                  {/* Add to cart / quantity controls */}
                  <div className={styles.cartArea} onClick={(e) => e.stopPropagation()}>
                    {cart[product.id] ? (
                      <div className={styles.cartControls}>
                        <button
                          className={styles.qtyBtn}
                          onClick={(e) => decrementQty(product.id, e)}
                          aria-label={`Decrease quantity of ${product.productName}`}
                        >
                          -
                        </button>
                        <div className={styles.qtyDisplay} aria-live="polite">
                          {cart[product.id]}
                        </div>
                        <button
                          className={styles.qtyBtn}
                          onClick={(e) => incrementQty(product.id, e)}
                          aria-label={`Increase quantity of ${product.productName}`}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        className={styles.addCartBtn}
                        onClick={(e) => addToCart(product.id, e)}
                        aria-label={`Add ${product.productName} to cart`}
                      >
                        Add to cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
