'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './subHeader.module.css';
import { usePathname } from 'next/navigation';
const SubHeader = ({ actual }) => {
    const router = useRouter();
    const [activeButton, setActiveButton] = useState(actual);
    const pathname = usePathname();
    const handleButtonClick = (section) => {
        setActiveButton(section);
        router.push(`${pathname}/${section}`);
    };

    return (
        <nav className={styles.menu}>
            {['infantil', 'primaria', 'secundaria', 'preuniversitario', 'universidad'].map((section) => (
                <button
                    key={section}
                    className={`${styles.menuButton} ${activeButton === section ? styles.active : ''}`}
                    onClick={() => handleButtonClick(section)}
                >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
            ))}
        </nav>
    );
};
SubHeader.displayName = 'SubHeader';
export default SubHeader;
