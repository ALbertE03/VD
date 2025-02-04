'use client';
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { csvParse } from 'd3-dsv';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Registrar componentes de Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const EducationLevelChart = ({ url }) => {
    const [data, setData] = useState({ labels: [], datasets: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Cargar y parsear el CSV desde la URL
                const rawData = await fetch(url).then((response) => response.text());
                const parsedData = csvParse(rawData);

                // Formatear los datos para Chart.js
                const formattedData = formatDataForChart(parsedData);
                setData(formattedData);
                setLoading(false);
            } catch (error) {
                console.error('Error al cargar los datos:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    // Función para formatear los datos
    const formatDataForChart = (parsedData) => {
        // Obtener los años (columnas) desde la primera fila
        const years = Object.keys(parsedData[0]).filter((key) => key.trim() !== "" && key !== "CONCEPTO");

        // Crear el array de labels (años)
        const labels = years;

        // Crear el array de datasets (niveles educativos)
        const datasets = parsedData.map((row) => {
            const label = row.CONCEPTO ? row.CONCEPTO.trim() : "Desconocido"; // Manejo de caso donde CONCEPTO podría ser undefined
            const dataValues = years.map((year) => +row[year] || 0); // Convertir a número

            return {
                label,
                data: dataValues,
                backgroundColor: getRandomColor(), // Color aleatorio para cada nivel educativo
                borderColor: 'rgba(0, 0, 0, 0.1)',
                borderWidth: 1,
            };
        });

        return { labels, datasets };
    };

    // Función para generar colores aleatorios
    const getRandomColor = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgba(${r}, ${g}, ${b}, 0.6)`;
    };

    // Opciones del gráfico
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Matrícula por Nivel Educativo',
                font: {
                    size: 18,
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Años',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Cantidad de Matrículas',
                },
                beginAtZero: true,
            },
        },
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-600">Cargando datos...</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6">Matrícula por Nivel Educativo</h1>
            <div style={{ width: '100%', height: '600px' }}>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default EducationLevelChart;
