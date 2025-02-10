'use client';

import React, { useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
} from 'recharts';

const EstadisticasEducacion = () => {

    const datosEscuelas = {
        'Artemisa': [49, 217, 77, 39, 15, 1, 22, 14, 8, 1, 12, 29],
        'Bahia Honda': [2, 44, 6, 2, 2, null, 2, 1, 1, null, 1, 3],
        'Manal': [3, 17, 8, 4, 2, null, 2, 1, 1, null, 1, 3],
        'Guanajay': [2, 9, 4, 2, 1, null, 1, 1, null, null, 1, 3],
        'Caimito': [7, 17, 7, 4, 1, null, 2, 1, 1, null, 2, 2],
        'Bauta': [7, 17, 8, 5, 1, null, 2, 1, 1, null, 1, 3]
    };

    const labelsEscuelas = [
        'Círculos infantiles', 'Primaria', 'Media', 'Secundaria Básica',
        'Preuniversitario', 'Ciencias Exactas', 'Técnica y Profesional',
        'Centros Politécnicos', 'Escuelas de Oficios',
        'Formación de Personal Pedagógico', 'Especial', 'Adultos'
    ];


    const labelsEstudiantes = [
        'Primaria', 'Secundaria Básica', 'Preuniversitario',
        'Ciencias Exactas', 'Técnica y Profesional', 'Formación Pedagógica',
        'Especial', 'Adultos'
    ];

    const estudiantesHombres = [2794, 2328, 488, 44, 1124, 43, 212, 241];
    const estudiantesMujeres = [2419, 2262, 938, 65, 701, 115, 129, 387];


    const labelsDocentes = [
        'Círculos Infantiles', 'Preescolar', 'Primaria',
        'Secundaria Básica', 'Preuniversitario', 'Ciencias Exactas',
        'Técnica y Profesional', 'Formación Pedagógica',
        'Especial', 'Adultos', 'Idiomas'
    ];

    const docentesHombres = [0, 0, 486,
        298, 194, 24,
        373, 37,
        48, 61, 12];
    const docentesMujeres = [8086, 947, 399, 4252,
        1058, 325, 15,
        429, 58,
        475, 145, 27];


    const graduadosData = [
        { año: '2018-2019', primaria: 4610, secundariaBasica: 4729, preuniversitario: 1850, tecnicaProfesional: 2213 },
        { año: '2019-2020', primaria: 5330, secundariaBasica: 4707, preuniversitario: 1741, tecnicaProfesional: 1651 },
        { año: '2020-2021', primaria: 5309, secundariaBasica: 4333, preuniversitario: 1604, tecnicaProfesional: 1855 },
        { año: '2021-2022', primaria: 5138, secundariaBasica: 4225, preuniversitario: 1525, tecnicaProfesional: 1680 },
        { año: '2022-2023', primaria: 5213, secundariaBasica: 4590, preuniversitario: 1426, tecnicaProfesional: 1609 }
    ];

    const [municipioSeleccionado, setMunicipioSeleccionado] = useState('Artemisa');

    const handleMunicipioChange = (event) => {
        setMunicipioSeleccionado(event.target.value);
    };

    return <div className="p-4 bg-[#CCC5B7] min-h-screen">

        <div className="grid grid-cols-2 gap-4 mb-8">

            <div className="bg-white p-6 rounded-xl shadow-md">
                <label htmlFor="municipioSelect" className="block text-lg font-semibold text-[#403D39] mb-2">
                    Selecciona un municipio:
                </label>
                <select
                    id="municipioSelect"
                    value={municipioSeleccionado}
                    onChange={handleMunicipioChange}
                    className="w-full p-2 border border-[#252422] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A68A64]"
                >
                    {Object.keys(datosEscuelas).map((municipio) => (
                        <option key={municipio} value={municipio}>{municipio}</option>
                    ))}
                </select>
                <h2 className="text-xl font-semibold mb-4 text-[#403D39] text-center">
                    Escuelas por Tipo de Educación en el Municipio
                </h2>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={labelsEscuelas.map((label, index) => ({
                        tipo: label,
                        cantidad: datosEscuelas[municipioSeleccionado][index] || 0,
                    }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="tipo" />
                        <YAxis />
                        <Tooltip />
                        <Legend align="center" />
                        <Bar dataKey="cantidad" fill="#A68A64" />
                    </BarChart>
                </ResponsiveContainer>
            </div>


            <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-[#403D39] text-center">
                    Estudiantes por Género y Tipo de Educación
                </h2>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={labelsEstudiantes.map((label, index) => ({
                        tipo: label,
                        hombres: estudiantesHombres[index] || 0,
                        mujeres: estudiantesMujeres[index] || 0,
                    }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="tipo" />
                        <YAxis />
                        <Tooltip />
                        <Legend align="center" />
                        <Bar dataKey="hombres" fill="#7E8D85" />
                        <Bar dataKey="mujeres" fill="#D4A373" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>


        <div className="grid grid-cols-2 gap-4 mb-8">

            <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-[#403D39] text-center">
                    Personal Docente por Género y Tipo de Educación
                </h2>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={labelsDocentes.map((label, index) => ({
                        tipo: label,
                        hombres: docentesHombres[index] || 0,
                        mujeres: docentesMujeres[index] || 0,
                    }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="tipo" />
                        <YAxis />
                        <Tooltip />
                        <Legend align="center" />
                        <Bar dataKey="hombres" fill="#6B705C" />
                        <Bar dataKey="mujeres" fill="#A68A64" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-[#403D39] text-center">
                    Graduados por Tipo de Educación (2018-2023)
                </h2>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={graduadosData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="año" />
                        <YAxis />
                        <Tooltip />
                        <Legend align="center" />
                        <Line type="monotone" dataKey="total" stroke="#252422" />
                        <Line type="monotone" dataKey="primaria" stroke="#EB5E28" />
                        <Line type="monotone" dataKey="secundariaBasica" stroke="#7E8D85" />
                        <Line type="monotone" dataKey="preuniversitario" stroke="#6B705C" />
                        <Line type="monotone" dataKey="tecnicaProfesional" stroke="#A68A64" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
};

export default EstadisticasEducacion;
