import Header from "../componets/header";
import Dashboard from "./componets/Dashboard";
//import './page.css';
import SubHeader from "./componets/subHeader";
import EstadisticasEducacion from "./gra";
export default function Home() {
    return <div >
        <Header />
        <h1 className="flex justify-center items-center text-4xl text-[#3E3C3C] py-10 bg-[#CCC5B7] uppercase font-bold ">
            Artemisa
        </h1>
        <SubHeader />
        <EstadisticasEducacion />
    </div >

};

