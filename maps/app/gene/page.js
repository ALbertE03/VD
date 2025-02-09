
import Header from "../componets/header";
import BarChartComponent from '../componets/barseries'
import EducationChart from "../componets/GeneralSection";
import TimeSeriesChart from "../componets/timeseries";
import TimeSeriesChart1 from "../componets/timeseries copy";
import PieChartComponent from "../componets/piechart";
import Expander from "../componets/Expander";
import Table from "../componets/table";
import LineChartComponent from "../componets/ramaCiencia";
import EducationLevelChart from "../componets/science";
import SubHeader from "../componets/subHeader";
import StackedAreaChart from "../componets/gen";

export default function Home() {
    return (
        <div>
            <Header />
            <SubHeader />
            <div className="p-4 grid grid-cols-2 gap-4">
                <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-md">
                    <StackedAreaChart jsonUrl={'/data/general/7.6-nivel-educacional-de-la-poblacion-economicamente-activa-por-sexos.json'} />
                </div>

                <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-md">
                    <BarChartComponent url={'data/general/18.7-personal-docente-frente-al-aula-por-educaciones.csv'} />
                </div>

                <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-md">
                    <TimeSeriesChart1 url={"/data/general/18.24-matricula-inicial-por-10-000-habitantes-.csv"} name={'matricula inicial por 10000 habitantes'} />
                </div>

                <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-md">
                    <TimeSeriesChart1 url={"/data/general/18.13-graduados-por-educaciones.csv"} name={'graduados por educación'} />
                </div>

                <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-md">
                    <TimeSeriesChart url={"/data/general/18.2-matricula-final-de-los-circulos-infantiles.csv"} name={'matricula final de los circulos infantiles'} />
                </div>

                <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-md">
                    <Expander title="Indicadores Generales de la educación" s={true}>
                        <Table url="/data/general/18.4-indicadores-generales-de-la-educacion.csv"></Table>
                    </Expander>
                </div>

                <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-md">
                    <LineChartComponent urlGeneral={'/data/general/18.19-matricula-inicial-de-la-educacion-superior-por-ramas-de-la-ciencia-.csv'} urlMujeres={'/data/general/18.22-graduados-de-la-educacion-superior-por-ramas-de-la-ciencia.-mujeres-.csv'} />
                </div>

                <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-md">
                    <EducationLevelChart url={'/data/general/7.6-nivel-educacional-de-la-poblacion-economicamente-activa-mujeres.csv'} />
                </div>
            </div>

        </div>
    );
}
