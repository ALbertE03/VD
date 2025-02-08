'use client';

import React, { useState, useEffect, memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import {
    BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import * as d3 from 'd3';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const PieChartComponent = memo(({ url }) => {
    const [data, setData] = useState([]);
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const rawData = await d3.csv(url);
                const availableYears = Object.keys(rawData[0]).filter(key => key !== "CONCEPTO");
                setYears(availableYears);
                setSelectedYear(availableYears[availableYears.length - 1]);

                const transformData = (year) => {
                    return rawData
                        .filter(row => row.CONCEPTO !== "Total")
                        .map(row => ({
                            name: row.CONCEPTO,
                            value: +row[year] || 0
                        }))
                        .filter(item => item.value > 0);
                };

                setData(transformData(availableYears[availableYears.length - 1]));
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };
        fetchData();
    }, [url]);

    const handleYearChange = (event) => {
        const year = event.target.value;
        setSelectedYear(year);
        d3.csv(url).then(rawData => {
            const updatedData = rawData
                .filter(row => row.CONCEPTO !== "Total")
                .map(row => ({
                    name: row.CONCEPTO,
                    value: +row[year] || 0
                }))
                .filter(item => item.value > 0);
            setData(updatedData);
        });
    };

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#D72638", "#A620A6"];

    return (
        <div className="w-full flex justify-center items-center h-[400px]">
            <div className="flex justify-center items-center">
                <ResponsiveContainer width={350} height={350}>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            fill="#8884d8"
                            label
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="ml-6">
                <label className="font-semibold block text-center mb-2">Seleccionar Año:</label>
                <select
                    className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedYear}
                    onChange={handleYearChange}
                >
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>
        </div>
    );
});

const AnalysisCarousel = ({ pieChartUrl }) => {
    const analyses = [
        { id: 1, title: 'Barras', type: 'bar', data: [{ name: 'Enero', value: 400 }, { name: 'Febrero', value: 300 }] },
        { id: 2, title: 'Líneas', type: 'line', data: [{ name: 'Enero', value: 100 }, { name: 'Febrero', value: 200 }] },
        { id: 3, title: 'asistencia promedio', type: 'piechart', data: null },
        { id: 4, title: 'Área', type: 'area', data: [{ name: 'Enero', value: 200 }, { name: 'Febrero', value: 400 }] },
    ];

    return (
        <div className="w-full p-4">
            <Swiper slidesPerView={1} navigation pagination={{ clickable: true }} modules={[Navigation, Pagination]}>
                <SwiperSlide>
                    <div className="grid grid-cols-2 gap-8">
                        {analyses.map((analysis) => (
                            <div key={analysis.id} className="p-6 bg-gray-100 shadow-md rounded-lg flex flex-col items-center w-full h-[450px]">
                                <h2 className="text-lg font-semibold mb-4">{analysis.title}</h2>
                                <div className="w-full h-[400px] flex justify-center items-center">
                                    {analysis.type === 'bar' && (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={analysis.data}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Bar dataKey="value" fill="#8884d8" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    )}
                                    {analysis.type === 'line' && (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={analysis.data}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Line type="monotone" dataKey="value" stroke="#82ca9d" />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    )}
                                    {analysis.type === 'piechart' && <PieChartComponent url={pieChartUrl} />}
                                    {analysis.type === 'area' && (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={analysis.data}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Area type="monotone" dataKey="value" stroke="#ff7300" fill="#ff7300" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default AnalysisCarousel;
