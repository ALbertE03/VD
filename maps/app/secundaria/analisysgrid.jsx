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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]; // Colores para Urbana, Rural y Nivel Económicamente Activo
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


const LineChartMultiple = ({ data, availableYears }) => {
    // Transformar los datos para que el eje X muestre los años y tenga dos líneas (Urbana y Rural)
    const transformedData = availableYears.map(year => ({
        year: year,
        Urbana: data.find(d => d.name === 'Urbana')[year] || 0,
        Rural: data.find(d => d.name === 'Rural')[year] || 0
    }));

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={transformedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Urbana" stroke={COLORS[0]} name="Urbana" />
                <Line type="monotone" dataKey="Rural" stroke={COLORS[1]} name="Rural" />
            </LineChart>
        </ResponsiveContainer>
    );
};

const BarChartComponent = ({ data, availableYears }) => {
    // Transformar los datos para que el eje X muestre los años y tenga una barra (Becarios)
    const transformedData = availableYears.map(year => ({
        year: year,
        Becarios: data.find(d => d.name === 'becarios')[year] || 0
    }));

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={transformedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Becarios" fill={COLORS[0]} name="Becarios" />
            </BarChart>
        </ResponsiveContainer>
    );
};

const AreaChartComponent = ({ data, availableYears }) => {
    console.log("Datos recibidos en AreaChartComponent:", data);

    const semiInternosData = data.find(d => d.name.trim() === 'semi internos');
    console.log("Datos de 'semi internos':", semiInternosData);

    const transformedData = availableYears.map(year => ({
        year: year,
        'Semi Internos': semiInternosData ? semiInternosData[year] || 0 : 0
    }));

    console.log("Datos transformados para el gráfico:", transformedData);

    return (
        <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={transformedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="Semi Internos" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.3} />
            </AreaChart>
        </ResponsiveContainer>
    );
};
const transformDataForLine = (data, concept) => {
    if (!data || data.length === 0) {
        return []; // Si no hay datos, devolvemos un arreglo vacío
    }

    const conceptData = data.find(d => d.name === concept);
    if (!conceptData) {
        return []; // Si no se encuentra el concepto, devolvemos un arreglo vacío
    }

    // Filtrar años desde 1998 hasta 2022
    return Object.keys(conceptData)
        .filter(key => key !== "name" && +key >= 1998 && +key <= 2022)
        .map(year => ({
            year: year,
            value: conceptData[year] || 0 // Usamos el valor del año o 0 si no existe
        }));
};
const AnalysisCarousel = () => {
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]); // Datos para el nivel educacional de la población
    const [data3, setData3] = useState([]); // Datos para becarios
    const [data4, setData4] = useState([]); // Datos para semi internos
    const [availableYears, setAvailableYears] = useState([]);

    useEffect(() => {
        const csvData = `CONCEPTO,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022
graduados total,153139,174423,166212,159857,150566,141334,122543,108309,101650,93834,94537,114466,123829,128878,150679,138957,150967,160304,162023,167382,154744,144062,140273,134626,132699,125257,134708,132456,130844,125185,120017,122375,119664,112528,112528,98908,99031
Urbana,2350,2315,2306,2307,2278,2272,2266,2327,2286,2258,2260,2275,2274,2269,2261,2268,2281,2330,2336,2335,2332,2337,2334,2336,2296,2213,2177,2132,2113,2097,2083,2084,2081,2080,2081,2076,2076
Rural,7837,7522,7311,7215,7139,7103,7080,7041,7154,7167,7160,7206,7213,7132,7099,7091,7077,7017,6693,6670,6702,6710,6688,6663,5919,5031,4876,4789,4729,4730,4754,4779,4806,4828,4840,4849,4864`;
        const csvData4 = `CONCEPTO,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022
        semi internos,315695,313422,309207,316929,323353,339405,344576,354306,365848,360571,361339,367407,369147,372511,372013,369574,363273,359422,368974,378259,389218,397272,397008,400592,391297,372807,353799,344367,338636,331587,333702`;
        const csvData2 = `CONCEPTO,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022
nivel educacional de la población,1400,1449,1416,1423,1435,1425,1409,1443,1346,1353,1353,1264,1229,1198,1139,1103,1106,1128,1115,995,993,987,999,0,941`;

        const csvData3 = `CONCEPTO,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022
becarios,33361,31839,29282,24743,22470,19885,14064,10986,10382,9704,9593,8987,9741,10080,9981,10309,9731,8793,8955,9486,8677,8159,7688,7401,5358,3101,2871,3459,3916,3108,3072`;

        const parsedData = d3.csvParse(csvData);
        const parsedData2 = d3.csvParse(csvData2);
        const parsedData3 = d3.csvParse(csvData3);
        const parsedData4 = d3.csvParse(csvData4);

        const availableYears = Object.keys(parsedData[0]).filter(key => key !== "CONCEPTO");
        setAvailableYears(availableYears);

        const transformedData = parsedData.map(row => ({
            name: row.CONCEPTO,
            ...availableYears.reduce((acc, year) => {
                const value = row[year];
                acc[year] = value && !isNaN(value) ? Math.round(+value) : 0;
                return acc;
            }, {})
        }));

        const transformedData2 = parsedData2.map(row => ({
            name: row.CONCEPTO,
            ...Object.keys(row)
                .filter(key => key !== "CONCEPTO")
                .reduce((acc, year) => {
                    const value = row[year];
                    acc[year] = value && !isNaN(value) ? Math.round(+value) : 0;
                    return acc;
                }, {})
        }));

        const transformedData3 = parsedData3.map(row => ({
            name: row.CONCEPTO,
            ...availableYears.reduce((acc, year) => {
                const value = row[year];
                acc[year] = value && !isNaN(value) ? Math.round(+value) : 0;
                return acc;
            }, {})
        }));

        const transformedData4 = parsedData4.map(row => ({
            name: row.CONCEPTO,
            ...availableYears.reduce((acc, year) => {
                const value = row[year];
                acc[year] = value && !isNaN(value) ? Math.round(+value) : 0;
                return acc;
            }, {})
        }));

        setData(transformedData);
        setData2(transformedData2);
        setData3(transformedData3);
        setData4(transformedData4);
    }, []);

    return (
        <div className="w-full p-4">
            <Swiper slidesPerView={1} navigation pagination={{ clickable: true }} modules={[Navigation, Pagination]}>
                <SwiperSlide>
                    <div className="grid grid-cols-2 grid-rows-2 gap-4">
                        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-md">
                            <div className="p-8">
                                <h2 className="text-xl font-semibold mb-4">Urbana vs Rural (Todos los Años)</h2>
                                <LineChartMultiple
                                    data={data}
                                    availableYears={availableYears}
                                />
                            </div>
                        </div>
                        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-md">
                            <ChartComponent
                                title="Nivel Educacional de la Población (1998-2022)"
                                data={transformDataForLine(data2, 'nivel educacional de la población')}
                                chartType={LineChart}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" />
                                <YAxis />
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#8884d8", color: "white" }}
                                    labelStyle={{ fontWeight: "bold", color: "white" }}
                                    formatter={(value) => [`${value}`, 'Valor']}
                                    labelFormatter={(label) => `Año: ${label}`}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="value" stroke={COLORS[2]} />
                            </ChartComponent>
                        </div>
                        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-md">
                            <div className="p-8">
                                <h2 className="text-xl font-semibold mb-4">Becarios (1985-2022)</h2>
                                <BarChartComponent
                                    data={data3}
                                    availableYears={availableYears}
                                />
                            </div>
                        </div>
                        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-md">
                            <div className="p-8">
                                <h2 className="text-xl font-semibold mb-4">Semi Internos (1985-2022)</h2>
                                <AreaChartComponent
                                    data={data4}
                                    availableYears={availableYears}
                                />
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};
AnalysisCarousel.displayName = 'AnalysisCarousel';
export default AnalysisCarousel;