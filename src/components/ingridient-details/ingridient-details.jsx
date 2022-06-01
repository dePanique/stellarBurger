import React from "react"
import styles from './ingridient-details.module.css'

const IngridientDetails = () => {
  return (
    <React.Fragment>
      <h3 className={styles.title}>Ingridient Details</h3>
      <div className={styles.image}></div>
      <p className={styles.itemDescription}></p>
      <ul className={styles.nutrientsRow}>
        <li className={styles.nutrientBlock}>
          <p className={styles.nutrientType}>Углеводы, г</p>
          <p className={styles.NutrientValue}>10, 2</p>
        </li>
        <li className={styles.nutrientBlock}>
          <p className={styles.nutrientType}>Углеводы, г</p>
          <p className={styles.NutrientValue}>10, 2</p>
        </li>
        <li className={styles.nutrientBlock}>
          <p className={styles.nutrientType}>Углеводы, г</p>
          <p className={styles.NutrientValue}>10, 2</p>
        </li>
        <li className={styles.nutrientBlock}>
          <p className={styles.nutrientType}>Углеводы, г</p>
          <p className={styles.NutrientValue}>10, 2</p>
        </li>
      </ul>
    </React.Fragment>
  )
}

export default IngridientDetails