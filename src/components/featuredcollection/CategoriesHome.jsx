import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Categories.module.css";

import noRestock from "../../images/categories/no-restock.png";
import actionFigures from "../../images/categories/action-figures.png";
import miniatures from "../../images/categories/miniatures.png";
import keyChains from "../../images/categories/keychains.png";
import Qposkets from "../../images/categories/q-posket.png";
import bubbleHeads from "../../images/categories/bubble-heads.png";
import premiumFigures from "../../images/categories/premimum-figures.png";
import DojosMystery from "../../images/categories/dojos-mistry.png";

const CategoriesHome = () => {
  const navigate = useNavigate();

  const categories = [
    { id: 1, name: "No Restock", image: noRestock },
    { id: 2, name: "Action Figures", image: actionFigures },
    { id: 3, name: "Miniatures", image: miniatures },
    { id: 4, name: "Keychains", image: keyChains },
    { id: 5, name: "Q-Poskets", image: Qposkets },
    { id: 6, name: "Bubble Heads", image: bubbleHeads },
    { id: 7, name: "Premium Figures", image: premiumFigures },
    { id: 8, name: "Dojo's Mystery", image: DojosMystery },
  ];

  const visibleCategories = categories.slice(0, 5);

  return (
    <section className={styles.featuredContainer}>
      <div className={styles.headerRow}>
        <h1 className={styles.featuredTitle}>Product Categories</h1>

        <button 
          className={styles.moreBtn}
          onClick={() => navigate("/categories")}
        >
          More →
        </button>
      </div>

      <div className={styles.exploreMenuList}>
        {visibleCategories.map((category) => (
          <div key={category.id} className={styles.exploreMenuListItem}>
            <div className={styles.productImage}>
              <img src={category.image} alt={category.name} />
            </div>
            <div className={styles.productInfo}>
              <h3>{category.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesHome;
