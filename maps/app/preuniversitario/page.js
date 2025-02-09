import Header from "../componets/header";
import SubHeader from "../componets/subHeader";
import AnalysisCarousel from "../componets/analisysgrid";
export default function Home() {
    return (
        <div>
            <Header />
            <SubHeader actual={'preuniversitario'} />
            <AnalysisCarousel pieChartUrl={'/data/general/18.3-asistencia-promedio-en-los-circulos-infantiles.csv'} csvUrl={'/data/general/18.4-indicadores-generales-de-la-educacion.csv'} />
        </div>
    );
}
