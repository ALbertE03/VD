'use client';

import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import PieChartWithSelector from './PieChart';
const COLORS = ['#6B705C', '#EB5E28', '#7E8D85', '#A68A64', '#D4A373', '#B8B2A6'];

const CombinedCharts = () => {

    const municipios1 = ['Bahía Honda', 'Mariel', 'Guanajay', 'Caimito', 'Bauta', 'San Antonio de los Baños', 'Güira de Melena', 'Alquizar', 'Artemisa', 'Candelaria', 'San Cristóbal'];
    const circulosInfantiles = [2, 3, 2, 7, 7, 6, 5, 3, 6, 2, 6];
    const relacionAlumnoDocente = [5.2, 5.4, 8.5, 4.8, 8.3, 8.4, 6.8, 4.9, 8.4, 7.0, 7.4];

    const municipios2 = ['Bahía Honda', 'Mariel', 'Guanajay', 'Caimito', 'Bauta', 'San Antonio de los Baños', 'Güira de Melena', 'Alquizar', 'Artemisa', 'Candelaria', 'San Cristóbal'];
    const alumnos = [319, 293, 341, 354, 497, 654, 394, 282, 861, 202, 787];
    const profesores = [61, 54, 40, 74, 60, 78, 58, 58, 102, 29, 106];

    const años = ['2019-2020', '2020-2021', '2021-2022', '2022-2023', '2023-2024'];
    const alumnosAño = [5350, 5357, 5269, 5098, 4984];
    const profesoresAño = [651, 725, 775, 792, 720];
    const relacionAlumnoDocenteAño = [8.2, 7.4, 6.8, 6.4, 6.9];

    const municipios5 = ['Artemisa', 'Bahia Honda', 'Manal', 'Guanajay', 'Caimito', 'Bauta'];
    const escuelas5 = [2, 3, 2, 7, 7];

    const dataPie = [
        { name: '2°', value: 351 },
        { name: '3°', value: 817 },
        { name: '4°', value: 994 },
        { name: '5°', value: 997 },
        { name: '6°', value: 942 },
    ];

    return (
        <div className="p-4 bg-[#CCC5B7] min-h-screen grid grid-cols-2 grid-rows-2 gap-4">


            <div className="bg-white p-4 rounded-xl shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-4 text-[#403D39] text-center">Alumnos y Profesores por Municipio</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={municipios2.map((municipio, index) => ({
                        municipio,
                        alumnos: alumnos[index],
                        profesores: profesores[index],
                    }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="municipio" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="alumnos" fill="#6B705C" name="Alumnos" />
                        <Bar dataKey="profesores" fill="#EB5E28" name="Profesores" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-4 text-[#403D39] text-center">Datos por Año</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={años.map((año, index) => ({
                        año,
                        alumnos: alumnosAño[index],
                        profesores: profesoresAño[index],
                        relacionAlumnoDocente: relacionAlumnoDocenteAño[index],
                    }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="año" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="alumnos" fill="#6B705C" name="Alumnos" />
                        <Bar dataKey="profesores" fill="#EB5E28" name="Profesores" />
                        <Bar dataKey="relacionAlumnoDocente" fill="#7E8D85" name="Relación Alumno/Docente" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-4 text-[#403D39] text-center">Círculos Infantiles y Relación Alumno/Docente por Municipio</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={municipios1.map((municipio, index) => ({
                        municipio,
                        circulosInfantiles: circulosInfantiles[index],
                        relacionAlumnoDocente: relacionAlumnoDocente[index],
                    }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="municipio" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="circulosInfantiles" fill="#6B705C" name="Círculos Infantiles" />
                        <Bar dataKey="relacionAlumnoDocente" fill="#EB5E28" name="Relación Alumno/Docente" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-4 text-[#403D39] text-center">Círculos Infantiles por Municipio</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={municipios5.map((municipio, index) => ({
                        municipio,
                        escuelas: escuelas5[index],
                    }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="municipio" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="escuelas" fill="#6B705C" name="Escuelas" />
                    </BarChart>
                </ResponsiveContainer>
            </div>


            <div className="bg-white p-6 rounded-xl shadow-md mb-8 col-span-2">
                <PieChartWithSelector />
            </div>
        </div>
    );
};

export default CombinedCharts;