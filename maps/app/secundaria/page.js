import Header from "../componets/header";
import SubHeader from "../componets/subHeader";
import AnalysisCarousel from "./analisysgrid";
export default function Home() {
    return (
        <div>
            <Header />
            <SubHeader actual={'secundaria'} />
            <AnalysisCarousel />
        </div>
    );
}
