'use client';
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import * as d3 from 'd3';

const BarChartComponent = ({ url }) => {
    const [data, setData] = useState([]);
    const [average, setAverage] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const rawData = await d3.csv(url);


                const totalRow = rawData.find(row => row.CONCEPTO?.trim() === "Total");

                if (!totalRow) {
                    console.error("No se encontró la fila 'Total' en los datos.");
                    return;
                }

                const transformedData = Object.keys(totalRow)
                    .filter(key => key !== "CONCEPTO" && key.trim() !== "")
                    .map(year => ({
                        year: year.trim(),
                        value: +totalRow[year] || 0
                    }));

                const totalValues = transformedData.map(d => d.value);
                const avg = totalValues.reduce((acc, curr) => acc + curr, 0) / totalValues.length;
                setAverage(avg);

                setData(transformedData);
            } catch (error) {
                console.error("Error al cargar los datos:", error);
            }
        };

        fetchData();
    }, [url]);

    if (data.length === 0) {
        return <p>Cargando datos...</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">personal docente frente al aula</h1>
            <ResponsiveContainer width="100%" height={500}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                    <ReferenceLine
                        y={average}
                        label={{
                            value: `Media: ${average.toFixed(0)}`,
                            position: 'insideTopRight',
                            fill: 'black',
                            fontSize: 14,
                            fontWeight: 'bold',
                            backgroundColor: 'white',
                            padding: 4
                        }}
                        stroke="black"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarChartComponent;
