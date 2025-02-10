'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
function Header() {
    const pathname = usePathname();

    const provinces = [
        { path: '/pr', name: 'Pinar del Rio' },
        { path: '/art', name: 'Artemisa' },
        { path: '/lh', name: 'La Habana' },
        { path: '/may', name: 'Mayabeque' },
        { path: '/mtz', name: 'Matanzas' },
        { path: '/cfg', name: 'Cienfuegos' },
        { path: '/vc', name: 'Villa Clara' },
        { path: '/ss', name: 'Sancti Spíritus' },
        { path: '/ca', name: 'Ciego de Ávila' },
        { path: '/cmg', name: 'Camagüey' },
        { path: '/t', name: 'Las Tunas' },
        { path: '/gr', name: 'Granma' },
        { path: '/h', name: 'Holguín' },
        { path: '/sc', name: 'Santiago De Cuba' },
        { path: '/gtm', name: 'Guantánamo' },

    ];
    const check = [{ path: '/infantil', name: 'infantiles' },
    { path: '/secundaria', name: 'secundaria' },
    { path: '/primaria', name: 'primaria' },
    { path: '/preuniversitario', name: 'preuniversitario' },
    { path: '/universidad', name: 'universidad' },
    { path: '/art/secundaria', name: 'art-secundaria' },
    { path: '/art/primaria', name: 'art-primaria' },
    { path: '/art/preuniversitario', name: 'art-preuniversitario' },
    { path: '/art/universidad', name: 'art-universidad' },
    { path: '/art/infantil', name: 'art-infantiles' }]

    const isProvinceRoute = provinces.some((province) => province.path === pathname);
    const ischeck = check.some((province) => province.path === pathname);
    return (
        <header>
            <div className="title">
                <h1>Educación en Cuba</h1>
            </div>
            <nav>
                {(isProvinceRoute || ischeck) && (
                    <Link href="/" data-content="general"><FontAwesomeIcon icon={faHome} /></Link>
                )}
                <div className="dropdown">
                    <button className="dropdown-toggle" aria-haspopup="true" aria-expanded="false">
                        Provincial &#9662;
                    </button>
                    <div className="dropdown-content" role="menu">
                        {provinces.map((province) => (
                            <Link
                                key={province.path}
                                href={province.path}
                                data-content={province.path.replace('/', '')}
                                role="menuitem"
                            >
                                {province.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>
        </header>
    );
}
Header.displayName = 'Header';
export default Header;