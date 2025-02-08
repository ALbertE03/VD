import Header from "../componets/header";
import SubHeader from "../componets/subHeader";
import AnalysisCarousel from "../componets/analisysgrid";
export default function Home() {
    return (
        <div>
            <Header />
            <SubHeader actual={'primaria'} />
            <AnalysisCarousel />
        </div>
    );
}
