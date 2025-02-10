'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from './subHeader.module.css';

const SubHeader = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [activeButton, setActiveButton] = useState('');

    useEffect(() => {
        // Extraer la sección actual de la URL
        const currentSection = pathname.split('/').pop();
        if (['infantil', 'primaria', 'secundaria', 'preuniversitario', 'universidad'].includes(currentSection)) {
            setActiveButton(currentSection);
        }
    }, [pathname]);

    const handleButtonClick = (section) => {
        setActiveButton(section);
        // Construir la nueva ruta
        let newPath;
        if (pathname === '/art') {
            // Si estamos en /art, simplemente añadimos la sección
            newPath = `/art/${section}`;
        } else if (pathname.startsWith('/art/')) {
            // Si ya estamos en una subsección de /art, reemplazamos la última parte
            newPath = `/art/${section}`;
        } else {
            // En cualquier otro caso, añadimos /art/sección a la ruta actual
            newPath = `${pathname}/art/${section}`;
        }
        router.push(newPath);
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
