'use client';

import React from 'react';
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    LineChart,
    Line,
    ResponsiveContainer,
} from 'recharts';

const SecondaryCharts = () => {
    const pieData = [
        { name: 'Secundaria Urbana', value: 14417 },
        { name: 'Secundaria Rural', value: 160 },
        { name: 'Media', value: 25572 },
        { name: 'Secundaria Básica', value: 14577 },
    ];

    const barData1 = [
        { name: 'Puras', Cantidad: 35 },
        { name: 'Mixtas', Cantidad: 4 },
    ];

    const barData2 = [
        { Municipio: 'Artemisa', Escuelas: 6 },
        { Municipio: 'Bahia Honda', Escuelas: 8 },
        { Municipio: 'Manal', Escuelas: 4 },
        { Municipio: 'Guanajay', Escuelas: 7 },
        { Municipio: 'Caimito', Escuelas: 8 },
        { Municipio: 'Bauta', Escuelas: 0 },
    ];

    const lineData = [
        { Año: '2018-2019', SecundariaBasica: 4729, Media: 9648 },
        { Año: '2019-2020', SecundariaBasica: 4707, Media: 9234 },
        { Año: '2020-2021', SecundariaBasica: 4333, Media: 7941 },
        { Año: '2021-2022', SecundariaBasica: 4225, Media: 7549 },
        { Año: '2022-2023', SecundariaBasica: 4590, Media: 7793 },
    ];

    const COLORS = ['#403D39', '#EB5E28', '#7E8D85', '#A68A64'];

    return (
        <div className="p-4 bg-[#CCC5B7] min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-[#403D39] text-center">
                        Secundaria Básica y Media - Distribución por Zona
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(2)}%`}
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-[#403D39] text-center">
                        Secundaria - Escuelas Puras y Mixtas
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barData1} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Cantidad" fill="#403D39" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-[#403D39] text-center">
                        Secundaria por Municipio
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barData2} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="Municipio" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Escuelas" fill="#403D39" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-[#403D39] text-center">
                        Secundaria y Media por Año
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={lineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="Año" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="SecundariaBasica" stroke="#6B705C" strokeWidth={2} />
                            <Line type="monotone" dataKey="Media" stroke="#EB5E28" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default SecondaryCharts;
