'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './header.css';

function Header() {
    const pathname = usePathname();

    const provinces = [
        { path: '/pr', name: 'Pinar Del Rio' },
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
        { path: '/ij', name: 'Isla De La Juventud' },
    ];

    const isProvinceRoute = provinces.some((province) => province.path === pathname);

    return (
        <header>
            <div className="title">
                <h1>Educación en Cuba</h1>
            </div>
            <nav>
                {isProvinceRoute && (
                    <Link href="/gene" data-content="general">General</Link>
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

export default Header;