import React from 'react'
import styles from "./index.module.css";

const Loader = () => {
    return (
        <div className={styles.containerLoader}>
            <div className={styles.loader}></div>
        </div>
    )
}

export default Loader