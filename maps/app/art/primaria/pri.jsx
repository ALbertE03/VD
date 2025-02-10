'use client';

import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer
} from 'recharts';

const PrimaryCharts = () => {
    const data1 = [
        { name: 'Puras', Cantidad: 154 },
        { name: 'Mixtas', Cantidad: 23 },
    ];

    const data2 = [
        { name: 'Artemisa', Cantidad: 44 },
        { name: 'Bahia Honda', Cantidad: 17 },
        { name: 'Manal', Cantidad: 9 },
        { name: 'Guanajay', Cantidad: 17 },
        { name: 'Caimito', Cantidad: 17 },
        { name: 'Bauta', Cantidad: 17 },
    ];

    const data3 = [
        { name: '2018-2019', Primaria: 4610, Especial: 530 },
        { name: '2019-2020', Primaria: 5330, Especial: 330 },
        { name: '2020-2021', Primaria: 5309, Especial: 373 },
        { name: '2021-2022', Primaria: 5138, Especial: 364 },
        { name: '2022-2023', Primaria: 5213, Especial: 341 },
    ];

    const data4 = [
        { name: 'Urbana', value: 24919 },
        { name: 'Rural', value: 6166 },
    ];

    const COLORS = ['#7E8D85', '#D4A373'];

    return (
        <div className="p-4 bg-[#CCC5B7] min-h-screen grid grid-cols-2 grid-rows-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-[#6B705C] text-center">Primaria - Escuelas Puras y Mixtas</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data1} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Cantidad" fill="#7E8D85" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-[#6B705C] text-center">Primaria por Municipio</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data2} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Cantidad" fill="#7E8D85" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-[#6B705C] text-center">Primaria y Especial por Año</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data3} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Primaria" stroke="#6B705C" strokeWidth={2} />
                        <Line type="monotone" dataKey="Especial" stroke="#D4A373" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-[#6B705C] text-center">Primaria - Distribución por Zona</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={data4}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(2)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data4.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PrimaryCharts;
