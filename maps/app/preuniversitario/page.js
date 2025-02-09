import Header from "../componets/header";
import SubHeader from "../componets/subHeader";
import AnalysisCarousel from "./analisysgrid";
export default function Home() {
    return (
        <div>
            <Header />
            <SubHeader actual={'preuniversitario'} />
            <AnalysisCarousel pieChartUrl={'/data/general/18.5-escuelas-por-educaciones-.csv'} />
        </div>
    );
}
