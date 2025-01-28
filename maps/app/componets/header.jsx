import Link from 'next/link';
import './header.css';

function Header() {
    return (
        <header>
            <div className="title">
                <h1>Educación en Cuba</h1>
            </div>
            <nav>
                <Link href="gene" data-content="general">General</Link>
                <div className="dropdown">
                    <button className="dropdown-toggle">Provincial &#9662;</button>
                    <div className="dropdown-content">
                        <Link href="pr" data-content="pr">Pinar Del Rio</Link>
                        <Link href="Art" data-content="Arte">Artemisa</Link>
                        <Link href="lh" data-content="LH">La Habana</Link>
                        <Link href="May" data-content="Maya">Mayabeque</Link>
                        <Link href="Mtz" data-content="Mtz">Matanzas</Link>
                        <Link href="Cfg" data-content="Cfg">Cienfuegos</Link>
                        <Link href="vc" data-content="VC">Villa Clara</Link>
                        <Link href="ss" data-content="SS">Sancti Spíritus</Link>
                        <Link href="ca" data-content="CAv">Ciego de Ávila</Link>
                        <Link href="cmg" data-content="Cmg">Camagüey</Link>
                        <Link href="t" data-content="LT">Las Tunas</Link>
                        <Link href="gr" data-content="Gr">Granma</Link>
                        <Link href="h" data-content="Hol">Holguín</Link>
                        <Link href="sc" data-content="SC">Santiago De Cuba</Link>
                        <Link href="gtm" data-content="gtm">Guantánamo</Link>
                        <Link href="ij" data-content="ij">Isla De La Juventud</Link>
                    </div>
                </div>
            </nav>
            <hr />

        </header>
    );
}

export default Header;
