'use client';
import { React, useState, useEffect, } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import * as d3 from 'd3';


const GroupedBarChart = ({ url, name }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const rawData = await d3.csv(url);
                const conceptosDeseados = [
                    'Matrícula inicial',
                    'Graduados'
                ];


                const filteredData = rawData.filter((row) => {
                    const concepto = row.CONCEPTO.replace(/"/g, '').trim();
                    return conceptosDeseados.includes(concepto);
                });


                if (filteredData.length === 0) {
                    console.error("No se encontraron datos para los conceptos especificados.");
                    return;
                }

                const formattedData = filteredData.map((row) => {
                    const newRow = { CONCEPTO: row.CONCEPTO };
                    Object.keys(row).forEach((key) => {
                        if (key !== "CONCEPTO") {
                            newRow[key] = Math.round(+row[key] || 0);
                        }
                    });
                    return newRow;
                });



                const years = Object.keys(formattedData[0]).filter((key) => key !== "CONCEPTO");
                const transformedData = years.map((year) => {
                    const yearData = { year };
                    formattedData.forEach((row) => {
                        if (row[year] !== 0) {
                            yearData[row.CONCEPTO] = row[year];
                        }
                    });
                    return yearData;
                });
                setData(transformedData);

            } catch (error) {
                console.error("Error loading data:", error);
            }
        };
        fetchData();
    }, [url]);
    if (data.length === 0) {
        return <div>Loading...</div>;
    }
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">{name}</h1>
            <ResponsiveContainer width="100%" height={500}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Matrícula inicial" fill="#D8D2C3" name="Matrícula Inicial" />
                    <Bar dataKey="Graduados" fill="#B8B2A6" name="Graduados" />
                </BarChart>
            </ResponsiveContainer></div>
    );
};
GroupedBarChart.displayName = 'GroupedBarChart';
export default GroupedBarChart;