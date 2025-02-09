'use client';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import * as d3 from 'd3';
import React, { memo } from 'react';

const LineChartComponent = memo(({ urlGeneral, urlMujeres }) => {
    const [generalData, setGeneralData] = useState([]);
    const [womenData, setWomenData] = useState([]);
    const [branches, setBranches] = useState([]);
    const [selectedGeneralBranch, setSelectedGeneralBranch] = useState("");
    const [selectedWomenBranch, setSelectedWomenBranch] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const rawDataGeneral = await d3.csv(urlGeneral);
                const rawDataWomen = await d3.csv(urlMujeres);

                const availableBranches = rawDataGeneral
                    .map(row => row["RAMAS DE LA CIENCIA"])
                    .filter(name => name);

                setBranches(availableBranches);
                setSelectedGeneralBranch(availableBranches[0]);
                setSelectedWomenBranch(availableBranches[0]);

                const transformData = (branch, rawData) => {
                    return rawData
                        .filter(row => row["RAMAS DE LA CIENCIA"] === branch)
                        .flatMap(row =>
                            Object.keys(row)
                                .filter(key => key.includes("/"))
                                .map(year => ({
                                    year,
                                    value: +row[year] || 0
                                }))
                        );
                };

                setGeneralData(transformData(availableBranches[0], rawDataGeneral));
                setWomenData(transformData(availableBranches[0], rawDataWomen));



            } catch (error) {
                console.error("Error loading data:", error);
            }
        };

        fetchData();
    }, [urlGeneral, urlMujeres]);
    console.log("Datos Mujeres:", womenData);
    const handleGeneralChange = (event) => {
        const branch = event.target.value;
        setSelectedGeneralBranch(branch);
        d3.csv(urlGeneral).then(rawData => {
            setGeneralData(rawData
                .filter(row => row["RAMAS DE LA CIENCIA"] === branch)
                .flatMap(row =>
                    Object.keys(row)
                        .filter(key => key.includes("/"))
                        .map(year => ({
                            year,
                            value: +row[year] || 0
                        }))
                ));
        });
    };

    const handleWomenChange = (event) => {
        const branch = event.target.value;
        setSelectedWomenBranch(branch);
        d3.csv(urlMujeres).then(rawData => {
            setWomenData(rawData
                .filter(row => row["RAMAS DE LA CIENCIA"] === branch)
                .flatMap(row =>
                    Object.keys(row)
                        .filter(key => key.includes("/"))
                        .map(year => ({
                            year,
                            value: +row[year] || 0
                        }))
                ));
        });
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">Comparación de Matrículas por Rama</h1>

            {/* Selectores */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex flex-col items-center">
                    <label className="font-semibold mb-2">Seleccionar Rama (General):</label>
                    <select
                        className="border border-gray-300 rounded px-3 py-1 focus:ring-2 focus:ring-blue-500"
                        value={selectedGeneralBranch}
                        onChange={handleGeneralChange}
                    >
                        {branches.map(branch => (
                            <option key={branch} value={branch}>{branch}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col items-center">
                    <label className="font-semibold mb-2">Seleccionar Rama (Mujeres):</label>
                    <select
                        className="border border-gray-300 rounded px-3 py-1 focus:ring-2 focus:ring-pink-500"
                        value={selectedWomenBranch}
                        onChange={handleWomenChange}
                    >
                        {branches.map(branch => (
                            <option key={branch} value={branch}>{branch}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-2 gap-4">
                {/* Gráfico General */}
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <h2 className="text-center font-semibold mb-2">General</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={generalData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={3} dot={{ r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Gráfico Mujeres */}
                <div className="bg-pink-100 p-4 rounded-lg shadow-md">
                    <h2 className="text-center font-semibold mb-2">Mujeres</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={womenData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="value" stroke="#E91E63" strokeWidth={3} dot={{ r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
});
LineChartComponent.displayName = 'LineChartComponent';
export default LineChartComponent;
