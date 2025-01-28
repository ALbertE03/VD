'use client';
import React, { useState, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import Papa from 'papaparse';
import { Bar, Pie } from 'react-chartjs-2';
import './chart.css';
import Table from './table';
import Expander from "./Expander";
Chart.register(...registerables);


const BarChart = ({ title, dataUrl }) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadCSV = async () => {
            try {
                const response = await fetch(dataUrl);
                if (!response.ok) {
                    setError('Error al cargar el archivo CSV. Respuesta no válida.');
                    setLoading(false);
                    return;
                }

                const csvData = await response.text();
                console.log("CSV Data:", csvData);

                const parsedData = Papa.parse(csvData).data;

                if (parsedData.length < 2) {
                    setError('El archivo CSV está vacío o no tiene suficientes datos.');
                    setLoading(false);
                    return;
                }

                const json = parsedData.slice(1).map(row => {
                    const obj = {};
                    parsedData[0].forEach((header, index) => {
                        obj[header] = row[index];
                    });
                    return obj;
                }).filter(item => Object.keys(item).length > 0);

                console.log("Parsed JSON:", json);

                if (json.length === 0) {
                    setError('El archivo CSV no tiene datos válidos.');
                    setLoading(false);
                    return;
                }

                const labels = Object.keys(json[0]).filter(key => key !== 'CONCEPTOS');
                const datasets = json
                    .filter(item => item.CONCEPTOS && item.CONCEPTOS.includes("(Total)"))
                    .map((item) => ({
                        label: item.CONCEPTOS,
                        data: labels.map(label => parseFloat(item[label])),
                        backgroundColor: labels.map(() =>
                            `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`
                        ),
                        borderColor: labels.map(() =>
                            `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`
                        ),
                        borderWidth: 1
                    }));

                setData({
                    labels,
                    datasets
                });

                setLoading(false);
            } catch (error) {
                console.error('Error al cargar el CSV:', error);
                setError('Hubo un error al cargar el archivo CSV');
                setLoading(false);
            }
        };

        loadCSV();
    }, [dataUrl]);


    if (loading) {
        return <div className="loading">Cargando...</div>;
    }

    // Manejo de error
    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="chart-container">
            <h2>{title}</h2>
            {data.labels && data.datasets && data.labels.length > 0 && data.datasets.length > 0 ? (
                <Bar
                    data={data}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false,
                                position: 'top'
                            }
                        },
                        scales: {
                            x: {
                                grid: {
                                    display: false
                                },
                                ticks: {
                                    autoSkip: false
                                }
                            },
                            y: {
                                grid: {
                                    drawBorder: true,
                                    drawOnChartArea: true
                                },
                                ticks: {
                                    beginAtZero: true
                                }
                            }
                        }
                    }}
                />
            ) : (
                <div>No se pueden mostrar los datos del gráfico.</div>
            )}
        </div>
    );
};

const PieChart = ({ title, dataUrl }) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [total, setTotal] = useState(0);
    const [showTotal, setShowTotal] = useState(false);

    useEffect(() => {
        const loadCSV = async () => {
            try {
                const response = await fetch(dataUrl);
                if (!response.ok) {
                    setError('Error al cargar el archivo CSV. Respuesta no válida.');
                    setLoading(false);
                    return;
                }

                const csvData = await response.text();
                console.log("CSV Data:", csvData);

                const parsedData = Papa.parse(csvData).data;

                if (parsedData.length < 2) {
                    setError('El archivo CSV está vacío o no tiene suficientes datos.');
                    setLoading(false);
                    return;
                }


                const json = parsedData.slice(1).map(row => {
                    const obj = {};
                    parsedData[0].forEach((header, index) => {
                        obj[header] = row[index];
                    });
                    return obj;
                }).filter(item => {
                    return item.ANOS !== 'Total' && Object.keys(item).length > 0;
                });

                console.log("Parsed JSON (sin 'Total'):", json);

                if (json.length === 0) {
                    setError('El archivo CSV no tiene datos válidos.');
                    setLoading(false);
                    return;
                }


                const labels = json.map(item => item.ANOS);
                const dataValues = json.map(item => {

                    return Object.keys(item)
                        .filter(key => key !== 'ANOS' && !key.includes('Total'))
                        .reduce((sum, key) => sum + parseFloat(item[key] || 0), 0);
                });

                const totalValue = dataValues.reduce((acc, curr) => acc + curr, 0);
                setTotal(totalValue);

                setShowTotal(totalValue > 0);

                setData({
                    labels,
                    datasets: [{
                        data: dataValues,
                        backgroundColor: labels.map(() =>
                            `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.7)`
                        ),
                        borderColor: labels.map(() =>
                            `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`
                        ),
                        borderWidth: 1
                    }]
                });

                setLoading(false);
            } catch (error) {
                console.error('Error al cargar el CSV:', error);
                setError('Hubo un error al cargar el archivo CSV');
                setLoading(false);
            }
        };

        loadCSV();
    }, [dataUrl]);

    if (loading) {
        return <div className="loading">Cargando...</div>;
    }


    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="chart-container">
            <h2>{title}</h2>
            <div className="chart-content">
                {data.labels && data.datasets && data.labels.length > 0 && data.datasets[0].data.length > 0 ? (
                    <>
                        <Pie
                            data={data}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        display: false,
                                        position: 'top'
                                    },
                                    tooltip: {
                                        callbacks: {
                                            label: function (tooltipItem) {

                                                const total = tooltipItem.dataset.data.reduce((acc, curr) => acc + curr, 0);

                                                const percentage = ((tooltipItem.raw / total) * 100).toFixed(2);
                                                return `${tooltipItem.label}: ${tooltipItem.raw} (${percentage}%)`;
                                            }
                                        }
                                    },
                                    datalabels: {
                                        formatter: function (value, context) {

                                            const total = context.chart.data.datasets[0].data.reduce((acc, curr) => acc + curr, 0);

                                            const percentage = ((value / total) * 100).toFixed(2);
                                            return `${percentage}%`;
                                        },
                                        color: 'white',
                                        font: {
                                            weight: 'bold',
                                            size: 14
                                        }
                                    }
                                }
                            }}
                        />
                        {showTotal && (
                            <div className="total-value">
                                <h3>Total: {total}</h3>
                            </div>
                        )}
                    </>
                ) : (
                    <div>No se pueden mostrar los datos del gráfico.</div>
                )}
            </div>
        </div>
    );
};

const Dashboard = () => {
    return (
        <div className='dashboard'>
            <div className='col1'>
                <h1>indicadores generales</h1>
                <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>

                    <Expander title="Indicadores seleccionados por círculos infantiles por municipios">
                        <Table
                            url="/data/gtm/indicacores seleccionados por circulos infantiles por municipios.csv"

                        />
                    </Expander>
                    <Expander title="Indicadores generales de la educación">
                        <Table
                            url="/data/gtm/indicadores generales de la educacion.csv"
                        />
                    </Expander>
                    <Expander title="Indicadores generales de los círculos infantiles">
                        <Table
                            url="/data/gtm/indicadores generales de los circulos infantiles.csv"
                        />
                    </Expander>
                </div>
            </div>


            <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>

                <Expander title="Indicadores seleccionados por círculos infantiles por municipios">
                    <Table
                        url="/data/gtm/indicacores seleccionados por circulos infantiles por municipios.csv"

                    />
                </Expander>
                <Expander title="Indicadores generales de la educación">
                    <Table
                        url="/data/gtm/indicadores generales de la educacion.csv"
                    />
                </Expander>
                <Expander title="Indicadores generales de los círculos infantiles">
                    <Table
                        url="/data/gtm/indicadores generales de los circulos infantiles.csv"
                    />
                </Expander>
            </div>

        </div>
    );
}


export default Dashboard;
