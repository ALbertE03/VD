'use client';
import React, { useState } from "react";
import styles from "./Expander.module.css";

const Expander = ({ title, children, s }) => {
    const [isExpanded, setIsExpanded] = useState(s);

    const toggleExpander = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={styles.expanderContainer}>
            <div className={styles.expanderHeader} onClick={toggleExpander}>
                <h3>{title}</h3>
                <span className={styles.arrow}>{isExpanded ? "▲" : "▼"}</span>
            </div>
            <div
                className={`${styles.expanderContent} ${isExpanded ? styles.expanded : styles.collapsed
                    }`}
            >
                {children}
            </div>
        </div>
    );
};

export default Expander;