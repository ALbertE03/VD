'use client';
import { Chart, registerables } from 'chart.js';
import Table from './table';
import Expander from "./Expander";
import ComparativePlot from './FastHoverComparativePlot';
import CSVLoader from './EducationVisualization';
import GeoJSONMap from './map';
import BarChartComponent from './BarChartComponent'
import EducationBarChart from './BubbleChart';
import * as d3 from "d3";
import { useState, useEffect } from 'react';
import styles from "./Dashboard.module.css";
import MatriculasTable from './MatriculasTable';
import Heatmap from './HeapMao';
Chart.register(...registerables);

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);

    useEffect(() => {
        d3.csv('/data/gtm/alumnos por regimen de estudio.csv').then(setData);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const csvData = await d3.csv("/data/gtm/becarios por educaciones.csv");
                setData1(csvData);
            } catch (error) {
                console.error("Error cargando datos:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className={styles.dashboard}>
            <div className={styles.col1}>
                <h1>Indicadores Generales</h1>
                <div className={styles.expanderContainer}>
                    <Expander title="Indicadores por Círculos Infantiles" s={false}>
                        <Table url="/data/gtm/indicadores generales de los circulos infantiles.csv" />
                    </Expander>
                    <Expander title="Indicadores Generales de Educación" s={false}>
                        <Table url="/data/gtm/indicadores generales de la educacion.csv" />
                    </Expander>
                    <Expander title="Indicadores Generales de los Círculos Infantiles" s={false}>
                        <Table url="/data/gtm/indicacores seleccionados por circulos infantiles por municipios.csv" />
                    </Expander>
                </div>
            </div>
            <div className={styles.col2}>
                <div className={styles.heap}>
                    <div className={styles.heatmapContainer}>
                        <Heatmap
                            url={'/data/gtm/graduados por. educaciones.csv'}
                            title={"Heatmap de graduados por educación"}
                            categories={['Primaria', 'Media', 'Preuniversitario', 'Ciencias exactas', 'Técnica y profesional', 'Especial', 'Adultos', 'Superior']}
                        />
                    </div>
                    <div className={styles.heatmapContainer}>
                        <Heatmap
                            url={'/data/gtm/graduados mujeres por eduacionnes.csv'}
                            title={'Heatmap de graduados mujeres por educación'}
                            categories={['Primaria', 'Media', 'Secundaria basica', 'Preuniversitario', 'Técnica y profesional', 'Técnico medio', 'Obrero calificado', 'Otros organismos', 'Especial', 'Formacion personal pedagdégico', 'Adultos']}
                        />
                    </div>
                </div>

                <h1>Matrículas por cada 10000 habitantes</h1>
                <MatriculasTable />
                <h1>matricula final de los circulos infantiles</h1>
                <BarChartComponent />
                <div className={styles.chartContainer}>
                    <h1>becarios por educaciones</h1>
                    {data1.length > 0 ? <EducationBarChart data={data1} /> : <p>Cargando datos...</p>}
                </div>
                <h2 className={styles.sectionTitle}>Alumnos por Régimen de Estudio</h2>
                {data.length > 0 ? <ComparativePlot data={data} /> : <p>Cargando datos...</p>}
                <h2 className={styles.sectionTitle}>Personal Docente por Educación</h2>
                <CSVLoader />

            </div>
        </div>
    );
};

export default Dashboard;
