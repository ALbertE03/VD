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
    ResponsiveContainer,
} from 'recharts';

const EstadisticasEducacionSuperior = () => {
    const ensenanzaSuperiorData = [
        {
            año: '2018-2019',
            centrosPolitecnicos: 1754,
            escuelasOficios: 180,
            adultos: 1279,
            formacionPedagogica: 142,
        },
        {
            año: '2019-2020',
            centrosPolitecnicos: 1492,
            escuelasOficios: 159,
            adultos: 4475,
            formacionPedagogica: 135,
        },
        {
            año: '2020-2021',
            centrosPolitecnicos: 1708,
            escuelasOficios: 147,
            adultos: 473,
            formacionPedagogica: 149,
        },
        {
            año: '2021-2022',
            centrosPolitecnicos: 1525,
            escuelasOficios: 155,
            adultos: 811,
            formacionPedagogica: 119,
        },
        {
            año: '2022-2023',
            centrosPolitecnicos: 1469,
            escuelasOficios: 140,
            adultos: 602,
            formacionPedagogica: 158,
        },
    ];

    const escuelasData = [
        { tipo: 'Puras', cantidad: 21 },
        { tipo: 'Mixtas', cantidad: 1 },
    ];

    const COLORS = ['#403D39', '#EB5E28', '#7E8D85', '#A68A64'];

    return (
        <div className="p-4 bg-[#CCC5B7] min-h-screen">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-[#403D39] text-center">
                        Enseñanza Superior por Año
                    </h2>
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={ensenanzaSuperiorData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="año" />
                            <YAxis />
                            <Tooltip />
                            <Legend align="center" />
                            <Line
                                type="monotone"
                                dataKey="centrosPolitecnicos"
                                stroke={COLORS[0]}
                                strokeWidth={2}
                                name="Centros Politécnicos"
                            />
                            <Line
                                type="monotone"
                                dataKey="escuelasOficios"
                                stroke={COLORS[1]}
                                strokeWidth={2}
                                name="Escuelas de Oficios"
                            />
                            <Line type="monotone" dataKey="adultos" stroke={COLORS[2]} strokeWidth={2} name="Adultos" />
                            <Line
                                type="monotone"
                                dataKey="formacionPedagogica"
                                stroke={COLORS[3]}
                                strokeWidth={2}
                                name="Formación de Personal Pedagógico"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-[#403D39] text-center">
                        Educación Superior - Escuelas Puras y Mixtas
                    </h2>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={escuelasData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="tipo" />
                            <YAxis />
                            <Tooltip />
                            <Legend align="center" />
                            <Bar dataKey="cantidad" fill={COLORS[0]} name="Cantidad de escuelas" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default EstadisticasEducacionSuperior;
