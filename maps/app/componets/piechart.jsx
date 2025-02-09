'use client';
import { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
import * as d3 from 'd3';
import React, { memo } from 'react';

const PieChartComponent = memo(({ url }) => {
    const [data, setData] = useState([]);
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const rawData = await d3.csv(url);


                const availableYears = Object.keys(rawData[0]).filter(key => key !== "CONCEPTO");

                setYears(availableYears);
                setSelectedYear(availableYears[availableYears.length - 1]);


                const transformData = (year) => {
                    return rawData
                        .filter(row => row.CONCEPTO !== "Total")
                        .map(row => ({
                            name: row.CONCEPTO,
                            value: +row[year] || 0
                        }))
                        .filter(item => item.value > 0);
                };

                setData(transformData(availableYears[availableYears.length - 1]));
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };

        fetchData();
    }, [url]);

    const handleYearChange = (event) => {
        const year = event.target.value;
        setSelectedYear(year);

        d3.csv(url).then(rawData => {
            const updatedData = rawData
                .filter(row => row.CONCEPTO !== "Total")
                .map(row => ({
                    name: row.CONCEPTO,
                    value: +row[year] || 0
                }))
                .filter(item => item.value > 0);

            setData(updatedData);
        });
    };

    if (data.length === 0) {
        return <p className="text-center text-gray-600">Cargando datos...</p>;
    }


    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#D72638", "#A620A6"];

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4 text-center">Asistencia Promedio a los circulos infantiles</h1>

            <div className="flex justify-center mb-4">
                <label className="mr-2 font-semibold">Seleccionar Año:</label>
                <select
                    className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedYear}
                    onChange={handleYearChange}
                >
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>

            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        fill="#8884d8"
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
});
PieChartComponent.displayName = 'PieChartComponent';
export default PieChartComponent;
