'use client';

import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// Datos del CSV
const data = {
    "2016": [351, 817, 994, 997, 942],
    "2017": [322, 798, 946, 1057, 925],
    "2018": [314, 641, 865, 921, 898],
    "2019": [335, 49, 643, 734, 571],
    "2020": [299, 572, 687, 782, 765],
    "2021": [396, 704, 895, 899, 815],
};

// Colores para cada grado
const COLORS = ['#403D39', '#A68A64', '#D4A373', '#B8B2A6', '#7E8D85'];

const PieChartWithSelector = () => {
    const [selectedYear, setSelectedYear] = useState('2016');

    // Transformar los datos para el año seleccionado
    const pieData = data[selectedYear].map((value, index) => ({
        name: `${index + 2}°`, // 2°, 3°, 4°, 5°, 6°
        value,
    }));

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h1 className="text-xl font-semibold mb-4 text-[#6B705C]">Asistencia a los Círculos Infantiles</h1>

            {/* Selector de año */}
            <div className="mb-4">
                <label htmlFor="yearSelector" className="block text-sm font-medium text-gray-700">
                    Seleccionar Año:
                </label>
                <select
                    id="yearSelector"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                >
                    {Object.keys(data).map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            {/* Gráfico de pie */}
            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label
                    >
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PieChartWithSelector;