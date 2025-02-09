'use client';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import * as d3 from 'd3';
import React, { memo } from 'react';

const TimeSeriesChart1 = memo(({ url, name }) => {
    const [data, setData] = useState([]);
    const [activeLine, setActiveLine] = useState(null);
    const [visibleLines, setVisibleLines] = useState({});
    const [chartTitle, setChartTitle] = useState(name);

    useEffect(() => {
        if (name) setChartTitle(name);
    }, [name]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const rawData = await d3.csv(url);

                // Lista de conceptos que deseamos mostrar
                const conceptosDeseados = [
                    "Primaria",
                    "Secundaria básica",
                    "Preuniversitario",
                    "Técnica y profesional",
                    "Técnico medio",
                    "Obrero calificado",
                    "Superior",
                    'Matrícula inicial',
                    'Graduados',
                    'Ciencias técnicas',
                    'Ciencias naturales y matemáticas',
                    'Ciencias agropecuarias',
                    'Ciencias económicas',
                    'Ciencias sociales y humanísticas',
                    'Ciencias Pedagógicas',
                    'Ciencias médicas', 'Ciencias de la Cultura física y el Deporte', 'Ciencias del Arte'
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

                // Mostrar todas las líneas por defecto
                const initialVisibleLines = formattedData.reduce((acc, row) => {
                    acc[row.CONCEPTO] = true;
                    return acc;
                }, {});
                setVisibleLines(initialVisibleLines);
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };

        fetchData();
    }, [url]);

    if (data.length === 0) {
        return <p>Cargando datos...</p>;
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
            [concepto]: !prev[concepto],
        }));
    };

    const formatTooltip = (value) => Math.round(value);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">{chartTitle}</h1>
            <ResponsiveContainer width="100%" height={500}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(value) => Math.round(value)} />
                    <Tooltip formatter={formatTooltip} />
                    <Legend
                        onClick={(e) => handleLineClick(e.dataKey)}
                        onMouseEnter={(e) => setActiveLine(e.dataKey)}
                        onMouseLeave={() => setActiveLine(null)}
                        wrapperStyle={{ cursor: 'pointer' }}
                    />
                    {Object.keys(data[0])
                        .filter((key) => key !== "year")
                        .map((concepto, index) => (
                            <Line
                                key={concepto}
                                type="monotone"
                                dataKey={concepto}
                                stroke={colors[index % colors.length]}
                                strokeWidth={activeLine === concepto ? 6 : 4}
                                strokeOpacity={visibleLines[concepto] === false ? 0 : (activeLine && activeLine !== concepto ? 0.3 : 1)}
                                onMouseEnter={() => setActiveLine(concepto)}
                                onMouseLeave={() => setActiveLine(null)}
                                dot={false}
                                activeDot={{ r: 8 }}
                                style={{
                                    transition: 'stroke-width 0.3s, stroke-opacity 0.3s',
                                    cursor: 'pointer',
                                }}
                            />
                        ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
});

export default TimeSeriesChart1;