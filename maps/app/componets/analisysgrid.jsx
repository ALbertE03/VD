'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import {
    BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './analisysgrid.module.css';

const AnalysisCarousel = () => {
    const analyses = [
        { id: 1, title: 'Barras', type: 'bar', data: [{ name: 'Enero', value: 400 }, { name: 'Febrero', value: 300 }] },
        { id: 2, title: 'Líneas', type: 'line', data: [{ name: 'Enero', value: 100 }, { name: 'Febrero', value: 200 }] },
        { id: 3, title: 'Torta', type: 'pie', data: [{ name: 'Enero', value: 700 }, { name: 'Febrero', value: 600 }] },
        { id: 4, title: 'Área', type: 'area', data: [{ name: 'Enero', value: 200 }, { name: 'Febrero', value: 400 }] },
        { id: 5, title: 'Barras', type: 'bar', data: [{ name: 'Enero', value: 500 }, { name: 'Febrero', value: 300 }] },
        { id: 6, title: 'Líneas', type: 'line', data: [{ name: 'Enero', value: 800 }, { name: 'Febrero', value: 700 }] },
        { id: 7, title: 'Torta', type: 'pie', data: [{ name: 'Enero', value: 300 }, { name: 'Febrero', value: 600 }] },
        { id: 8, title: 'Área', type: 'area', data: [{ name: 'Enero', value: 900 }, { name: 'Febrero', value: 500 }] },
    ];

    const groupedAnalyses = [];
    for (let i = 0; i < analyses.length; i += 4) {
        groupedAnalyses.push(analyses.slice(i, i + 4));
    }

    return (
        <div className={styles.carouselContainer}>
            <Swiper
                slidesPerView={1}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                pagination={{
                    clickable: true,
                    el: '.swiper-pagination',
                    type: 'bullets',
                }}
                modules={[Navigation, Pagination]}
            >
                {groupedAnalyses.map((group, index) => (
                    <SwiperSlide key={index}>
                        <div className={styles.gridContainer}>
                            {group.map((analysis) => (
                                <div key={analysis.id} className={styles.analysisCard}>
                                    <h2 className={styles.analysisTitle}>{analysis.title}</h2>
                                    <div className={styles.chartContainer}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            {analysis.type === 'bar' && (
                                                <BarChart data={analysis.data}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="name" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Bar dataKey="value" fill="#8884d8" />
                                                </BarChart>
                                            )}
                                            {analysis.type === 'line' && (
                                                <LineChart data={analysis.data}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="name" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Line type="monotone" dataKey="value" stroke="#82ca9d" />
                                                </LineChart>
                                            )}
                                            {analysis.type === 'pie' && (
                                                <PieChart>
                                                    <Pie
                                                        data={analysis.data}
                                                        dataKey="value"
                                                        nameKey="name"
                                                        cx="50%"
                                                        cy="50%"
                                                        outerRadius={50}
                                                        fill="#ffc658"
                                                        label
                                                    >
                                                        <Cell fill="#8884d8" />
                                                        <Cell fill="#82ca9d" />
                                                    </Pie>
                                                    <Tooltip />
                                                </PieChart>
                                            )}
                                            {analysis.type === 'area' && (
                                                <AreaChart data={analysis.data}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="name" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Area type="monotone" dataKey="value" stroke="#ff7300" fill="#ff7300" />
                                                </AreaChart>
                                            )}
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className={`swiper-button-next ${styles.customNextButton}`}></div>
            <div className={`swiper-button-prev ${styles.customPrevButton}`}></div>
            <div className={`swiper-pagination ${styles.customPagination}`}></div>
        </div>
    );
};

export default AnalysisCarousel;
