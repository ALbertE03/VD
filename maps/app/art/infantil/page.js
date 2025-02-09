import Header from "@/app/componets/header";
import SubHeader from "@/app/componets/subHeader";
import AnalysisCarousel from "./analisysgrid";

export default function Home() {
    return (
        <div>
            <Header />
            <h1 className="flex justify-center items-center text-4xl text-[#3E3C3C] py-10 bg-[#CCC5B7] uppercase font-bold ">
                Artemisa
            </h1>
            <SubHeader actual={'infantil'} />
            <AnalysisCarousel pieChartUrl={'/data/general/18.3-asistencia-promedio-en-los-circulos-infantiles.csv'} />
        </div>
    );
}
