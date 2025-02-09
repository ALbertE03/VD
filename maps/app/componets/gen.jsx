'use client';
import React, { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = {
    Hombres: "#8884d8",
    Mujeres: "#ffc658",
    Ambos: "#82ca9d",
};

const StackedAreaChart = ({ jsonUrl }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(jsonUrl);
                const jsonData = await response.json();

                const transformedData = Object.keys(jsonData["Ambos sexos"]).map((year) => ({
                    year,
                    Ambos: parseInt(jsonData["Ambos sexos"][year]?.Total || 0),
                    Mujeres: parseInt(jsonData["Mujeres"][year]?.Total || 0),
                    Hombres: parseInt((jsonData["Ambos sexos"][year]?.Total || 0) - (jsonData["Mujeres"][year]?.Total || 0)),
                }));

                setData(transformedData);
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };

        fetchData();
    }, [jsonUrl]);

    return (
        <div className="w-full pt-5 flex flex-col items-center h-[500px]">
            <h2 className="text-xl font-bold mb-4">Distribución del Nivel Educacional (1998-2022)</h2>
            <ResponsiveContainer width="90%" height={400}>
                <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" label={{ value: "Año", position: "insideBottom", offset: -5 }} />
                    <YAxis label={{ value: "Total", angle: -90, position: "insideLeft" }} />
                    <Tooltip />
                    <Legend />

                    <Area type="monotone" dataKey="Mujeres" stackId="1" stroke={COLORS.Mujeres} fill={COLORS.Mujeres} />
                    <Area type="monotone" dataKey="Hombres" stackId="1" stroke={COLORS.Hombres} fill={COLORS.Hombres} />
                    <Area type="monotone" dataKey="Ambos" stackId="1" stroke={COLORS.Ambos} fill={COLORS.Ambos} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StackedAreaChart;
