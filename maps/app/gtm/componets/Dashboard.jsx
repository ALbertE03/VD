'use client';
import { Chart, registerables } from 'chart.js';
import './Dashboard.css';
import Table from './table';
import Expander from "./Expander";
import LinePlot from './LineChart';
Chart.register(...registerables);
import * as d3 from "d3";
import { useState, useEffect } from 'react';
const Dashboard = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        d3.csv('/data/gtm/alumnos por regimen de estudio.csv').then(data => {
            setData(data);
        });
    }, []);
    return (
        <div className='dashboard'>
            <div className='col1'>
                <h1>indicadores generales</h1>
                <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
                    <Expander title="Indicadores seleccionados por círculos infantiles por municipios" s={false} >
                        <Table
                            url="/data/gtm/indicacores seleccionados por circulos infantiles por municipios.csv"

                        />
                    </Expander>
                    <Expander title="Indicadores generales de la educación" s={false} >
                        <Table
                            url="/data/gtm/indicadores generales de la educacion.csv"
                        />
                    </Expander>
                    <Expander title="Indicadores generales de los círculos infantiles" s={true} >
                        <Table
                            url="/data/gtm/indicadores generales de los circulos infantiles.csv"
                        />
                    </Expander>
                </div>
            </div>
            <div>
                <h2>alumnos por regimen de estudio</h2>
                {data.length > 0 ? <LinePlot data={data} /> : <p>Cargando datos...</p>}
            </div>
        </div>
    );
}


export default Dashboard;
