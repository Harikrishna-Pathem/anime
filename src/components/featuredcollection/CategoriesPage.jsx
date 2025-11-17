import React from "react";
import styles from "./Categories.module.css";

import noRestock from "../../images/categories/no-restock.png";
import actionFigures from "../../images/categories/action-figures.png";
import miniatures from "../../images/categories/miniatures.png";
import keyChains from "../../images/categories/keychains.png";
import Qposkets from "../../images/categories/q-posket.png";
import bubbleHeads from "../../images/categories/bubble-heads.png";
import premiumFigures from "../../images/categories/premimum-figures.png";
import DojosMystery from "../../images/categories/dojos-mistry.png";

const CategoriesPage = () => {
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

  return (
    <section className={styles.categoriesPageContainer}>
      <h1 className={styles.categoriesPageTitle}>All Categories</h1>

      <div className={styles.categoriesGrid}>
        {categories.map((category) => (
          <div key={category.id} className={styles.categoryCard}>
            <img src={category.image} alt={category.name} />
            <div className={styles.productInfo}>
              <h3 className={styles.categoryTitle}>{category.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesPage;
