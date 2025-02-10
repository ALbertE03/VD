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
    ResponsiveContainer,
} from 'recharts';

const EstadisticasEducacion = () => {
    const preuniversitarioMunicipioData = [
        { municipio: 'Artemisa', cantidad: 2 },
        { municipio: 'Bahia Honda', cantidad: 2 },
        { municipio: 'Manal', cantidad: 1 },
        { municipio: 'Guanajay', cantidad: 1 },
        { municipio: 'Caimito', cantidad: 1 },
        { municipio: 'Bauta', cantidad: 0 },
    ];

    const preuniversitarioAnualData = [
        { año: '2018-2019', preuniversitario: 1850, cienciasExactas: 136, tecnicaProfesional: 2213 },
        { año: '2019-2020', preuniversitario: 1741, cienciasExactas: 126, tecnicaProfesional: 1651 },
        { año: '2020-2021', preuniversitario: 1604, cienciasExactas: 120, tecnicaProfesional: 1855 },
        { año: '2021-2022', preuniversitario: 1525, cienciasExactas: 126, tecnicaProfesional: 1680 },
        { año: '2022-2023', preuniversitario: 1426, cienciasExactas: 109, tecnicaProfesional: 1609 },
    ];

    const primariaDistribucionZonaData = [
        { zona: 'Urbana', cantidad: 24919 },
        { zona: 'Rural', cantidad: 6166 },
    ];


    const primariaEscuelasData = [
        { tipo: 'Puras', cantidad: 14 },
        { tipo: 'Mixtas', cantidad: 1 },
    ];

    const COLORS = ['#403D39', '#EB5E28', '#A68A64', '#7E8D85'];

    return (
        <div className="p-4 bg-[#CCC5B7] min-h-screen">


            <div className="grid grid-cols-2 md:grid-cols-2 gap-6">

                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-[#403D39] text-center">
                        Preuniversitarios por Municipios
                    </h2>
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={preuniversitarioMunicipioData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="municipio" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="cantidad" fill={COLORS[0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-[#403D39] text-center">
                        Preuniversitario, Ciencias Exactas y Técnica y Profesional por Año
                    </h2>
                    <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={preuniversitarioAnualData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="año" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="preuniversitario" stroke={COLORS[2]} />
                            <Line type="monotone" dataKey="cienciasExactas" stroke={COLORS[1]} />
                            <Line type="monotone" dataKey="tecnicaProfesional" stroke={COLORS[3]} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>


                <div className="bg-white p-6 rounded-xl shadow-md col-span-2">
                    <h2 className="text-xl font-semibold mb-4 text-[#403D39] text-center">
                        Escuelas Puras y Mixtas
                    </h2>
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={primariaEscuelasData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="tipo" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="cantidad" fill={COLORS[0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default EstadisticasEducacion;
