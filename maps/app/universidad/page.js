import Header from "../componets/header";
import SubHeader from "../componets/subHeader";
import AnalysisCarousel from "../componets/analisysgrid";

export default function Home() {
    return (
        <div>
            <Header />
            <SubHeader actual={'universidad'} />
            <AnalysisCarousel pieChartUrl={'/data/general/18.3-asistencia-promedio-en-los-circulos-infantiles.csv'} />
        </div>
    );
}
