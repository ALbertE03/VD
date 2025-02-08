'use client';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import * as d3 from 'd3';
import React, { memo } from 'react';
const TimeSeriesChart = memo(({ url, name }) => {
    const [data, setData] = useState([]);
    const [activeLine, setActiveLine] = useState(null);
    const [chartTitle, setChartTitle] = useState(name);

    useEffect(() => {
        if (name) setChartTitle(name);
    }, [name]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const rawData = await d3.csv(url);


                const formattedData = rawData.map((row) => {
                    const newRow = { CONCEPTO: row.CONCEPTO };
                    Object.keys(row).forEach((key) => {
                        if (key !== "CONCEPTO") {
                            newRow[key] = +row[key] || 0;
                        }
                    });
                    return newRow;
                });


                const years = Object.keys(formattedData[0]).filter((key) => key !== "CONCEPTO");
                const transformedData = years.map((year) => {
                    const yearData = { year: +year };
                    formattedData.forEach((row) => {
                        yearData[row.CONCEPTO] = row[year];
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
        return <p>Cargando datos...</p>;
    }

    const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#00c49f", "#0088fe", "#ff0000"];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">{chartTitle}</h1>
            <ResponsiveContainer width="100%" height={500}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="year"
                        type="number"
                        domain={['dataMin', 'dataMax']}
                        tickFormatter={(tick) => tick}
                        angle={-30}
                        textAnchor="end"
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {Object.keys(data[0])
                        .filter((key) => key !== "year")
                        .map((concepto, index) => (
                            <Line
                                key={concepto}
                                type="monotone"
                                dataKey={concepto}
                                stroke={colors[index % colors.length]}
                                strokeWidth={activeLine === concepto ? 4 : 2}
                                strokeOpacity={activeLine && activeLine !== concepto ? 0.3 : 1}
                                onMouseEnter={() => setActiveLine(concepto)}
                                onMouseLeave={() => setActiveLine(null)}
                            />
                        ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
});

export default TimeSeriesChart;