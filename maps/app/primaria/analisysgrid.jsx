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
import InteractiveChart from './InteractiveChart';
const COLORS = ["#6B705C"];

const ChartComponent = ({ title, data, chartType: Chart, children }) => (
    <div className="p-8">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <ResponsiveContainer width="100%" height={400}>
            <Chart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                {children}
            </Chart>
        </ResponsiveContainer>
    </div>
);

const BarChartComponent = memo(({ url }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const rawData = await d3.csv(url);
                const conceptosDeseados = ['Primaria'];


                const filteredData = rawData.filter((row) => {
                    const concepto = row.CONCEPTO.replace(/"/g, '').trim();
                    return conceptosDeseados.includes(concepto);
                });

                if (filteredData.length === 0) {
                    console.error("No se encontraron datos para los conceptos especificados.");
                    return;
                }

                const formattedData = filteredData.map((row) => {
                    const newRow = { CONCEPTO: row.CONCEPTO };
                    Object.keys(row).forEach((key) => {
                        if (key !== "CONCEPTO") {
                            newRow[key] = Math.round(+row[key] || 0);
                        }
                    });
                    return newRow;
                });


                const years = Object.keys(formattedData[0]).filter((key) => key !== "CONCEPTO");
                const transformedData = years.map((year) => {
                    const yearData = { year };
                    formattedData.forEach((row) => {
                        if (row[year] !== 0) {
                            yearData[row.CONCEPTO] = row[year];
                        }
                    });
                    return yearData;
                });

                console.log(transformedData);
                setData(transformedData);
            } catch (error) {
                console.error("Error al cargar los datos:", error);
            }
        };

        fetchData();
    }, [url]);

    if (data.length === 0) {
        return <p>Cargando datos...</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Personal docente</h1>
            <ResponsiveContainer width="90%" height={400}>
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{ left: 30, right: 30 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="year" />
                    <Tooltip />
                    <Legend />
                    <Bar
                        dataKey="Primaria"
                        fill="#6B705C"
                        name="Primaria"
                        key="Primaria"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
});
BarChartComponent.displayName = 'BarChartComponent';
const AnalysisCarousel = ({ pieChartUrl }) => {
    const [data, setData] = useState([]);
    const [availableYears, setAvailableYears] = useState([]);

    useEffect(() => {
        const csvData = `CONCEPTO,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022
Círculos infantiles,844,854,927,1021,1072,1116,1150,1157,1156,1102,1107,1114,1115,1113,1118,1119,1119,1116,1117,1123,1112,1113,1107,1110,1108,1105,1096,1086,1082.0,1078.0,1083.0,1084.0,1084.0,1088.0,1085.0,1083.0,1094.0,1115
Capacidad a final del año,92911,95776,109498,125556,135142,141910,146917,148922,148855,148656,148752,148517,148403,149162,149080,149040,146816,147042,147745,150023,150598,150782,151034,151122,150625,150622,151190,151582,152469.0,152786.0,152044.0,152514.0,151223.0,151331.0,152970.0,153069.0,153069.0,156783
Matrícula final,103352,109923,120628,142073,149309,157947,149936,152008,145039,144311,145569,144533,145088,145364,146920,146669,154569,146760,146028,140979,132020,131041,130441,129811,130965,131538,134110,138681,139878.0,137501.0,137454.0,135851.0,136060.0,134276.0,134914.0,137570.0,142362.0,142870
Asistencia promedio anual,72480,76546,79886,89617,100236,108376,108312,112558,106764,105402,108365,110026,111280,115404,120217,122182,128593,127257,126755,122200,112820,111837,111493,110541,109493,104223,107709,111303,114303.0,110002.0,111625.33333333334,110822.0,109030.0,116847.90303030303,111660.0,80030.0,88994.0,83297
Personal técnico educacional,20194,20984,21172,23358,26690,27414,28529,27226,26515,22528,21928,21960,20644,19786,19270,19358,19269,18517,19117,19334,19631,19908,19797,21004,20421,22037,23611,24126,23734.0,23292.0,23010.0,22032.0,20476.0,20476.0,20843.0,20549.0,23088.0,24631
Madres beneficiadas,95694,101530,110779,131816,136557,145248,138502,140518,142137,137616,136435,135014,135012,135183,137625,136956,142042,139304,142505,131398,125393,122536,119632,119602,120861,120749,121607,128578,129988.0,125801.0,123694.0,124458.0,123473.0,122314.0,121956.0,125202.0,125552.0,126086`;

        const parsedData = d3.csvParse(csvData);
        const availableYears = Object.keys(parsedData[0]).filter(key => key !== "CONCEPTO");
        setAvailableYears(availableYears);

        const transformedData = parsedData.map(row => ({
            name: row.CONCEPTO,
            ...availableYears.reduce((acc, year) => {
                acc[year] = +row[year] || 0;
                return acc;
            }, {})
        }));

        setData(transformedData);
    }, []);


    const transformDataForLineAndArea = (concept) => {
        return availableYears.map(year => ({
            year: year,
            value: data.find(d => d.name === concept)[year] || 0
        }));
    };

    return (
        <div className="w-full p-4">
            <Swiper slidesPerView={1} navigation pagination={{ clickable: true }} modules={[Navigation, Pagination]}>
                <SwiperSlide>
                    <div className="grid grid-cols-2 gap-4">

                        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-md">
                            <InteractiveChart />
                        </div>
                        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-md">
                            <BarChartComponent url={pieChartUrl} />
                        </div>

                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};
AnalysisCarousel.displayName = 'AnalysisCarousel';
export default AnalysisCarousel;