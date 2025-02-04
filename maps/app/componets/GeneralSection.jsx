'use client';

import React, { useState, useEffect, memo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EducationChart = memo(() => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {

        fetch('/data/general/18.14-graduados-mujeres-por-educaciones-Primaria.csv')
            .then((response) => response.text())
            .then((csvText) => {

                const rows = csvText.split('\n');
                const headers = rows[0].split(',');
                const data = {};

                rows.slice(1).forEach((row) => {
                    const columns = row.split(',');

                    if (columns.length > 1) {
                        const key = columns[1].trim();


                        if (columns.slice(2).every((value) => !isNaN(Number(value)))) {
                            data[key] = columns.slice(2).map(Number);
                        }
                    }
                });


                const years = headers.slice(2);
                const formattedData = years.map((year, index) => ({
                    year,
                    Mujeres: data['Primaria'] ? data['Primaria'][index] : 0,
                }));

                setChartData(formattedData);
            })
            .catch((error) => {
                console.error('Error al cargar el archivo CSV:', error);
            });
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-4">Graduados por Género</h1>
            <p className="text-center text-gray-600 mb-6">Datos de graduados en Cuba (1985/86 - 2014/15)</p>

            <div style={{ width: '100%', height: '500px' }}>
                <ResponsiveContainer>
                    <LineChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" angle={-45} textAnchor="end" interval={0} height={70} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Mujeres" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
});

export default EducationChart;