'use client';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import * as d3 from 'd3';
import React, { memo } from 'react';
const TimeSeriesChart1 = memo(({ url, name }) => {
    const [data, setData] = useState([]);
    const [activeLine, setActiveLine] = useState(null); // Estado para controlar el hover
    const [visibleLines, setVisibleLines] = useState({}); // Estado para controlar la visibilidad de las líneas
    const [chartTitle, setChartTitle] = useState(name);

    useEffect(() => {
        if (name) setChartTitle(name);
    }, [name]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const rawData = await d3.csv(url);

                // Convertir los valores a números y transformar los datos
                const formattedData = rawData.map((row) => {
                    const newRow = { CONCEPTO: row.CONCEPTO };
                    Object.keys(row).forEach((key) => {
                        if (key !== "CONCEPTO") {
                            newRow[key] = +row[key] || 0; // Convertir a número y manejar NaN
                        }
                    });
                    return newRow;
                });

                // Transformar los datos para Recharts
                const years = Object.keys(formattedData[0]).filter((key) => key !== "CONCEPTO");
                const transformedData = years.map((year) => {
                    const yearData = { year };
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
        return <p>Cargando datos...</p>; // Mensaje de carga
    }

    const colors = [
        "#8884d8", "#82ca9d", "#ffc658", "#ff7300",
        "#00c49f", "#0088fe", "#ff0000", "#d0ed57",
        "#ff7300", "#a4de6c", "#c6e2ff", "#ffbb28",
        "#ff8042", "#ffc658", "#00C49F", "#0088FE"
    ];

    const handleLineClick = (concepto) => {
        setVisibleLines((prev) => ({
            ...prev,
            [concepto]: !prev[concepto], // Alternar visibilidad
        }));
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">{chartTitle}</h1>
            <ResponsiveContainer width="100%" height={500}>
                <LineChart
                    data={data}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend
                        onClick={(e) => handleLineClick(e.dataKey)} // Manejar clics en la leyenda
                    />
                    {Object.keys(data[0])
                        .filter((key) => key !== "year")
                        .map((concepto, index) => (
                            <Line
                                key={concepto}
                                type="monotone"
                                dataKey={concepto}
                                stroke={colors[index % colors.length]}
                                strokeWidth={activeLine === concepto ? 4 : 2} // Aumentar grosor si está activa
                                strokeOpacity={visibleLines[concepto] === false ? 0 : (activeLine && activeLine !== concepto ? 0.3 : 1)} // Opacidad reducida si no está activa o no visible
                                onMouseEnter={() => setActiveLine(concepto)} // Establecer línea activa al pasar el mouse
                                onMouseLeave={() => setActiveLine(null)} // Restablecer al salir
                            />
                        ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
});

export default TimeSeriesChart1;
