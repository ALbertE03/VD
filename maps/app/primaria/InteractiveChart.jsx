"use client";
import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const InteractiveChart = () => {
    const [data, setData] = useState([]);
    const [selectedConcept, setSelectedConcept] = useState("");
    const [availableConcepts, setAvailableConcepts] = useState([]);

    useEffect(() => {
        const csvData = `CONCEPTO,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021
Preuniversitario,245,266,292,336,369,375,345,319,303,277,261,252,251,263,274,301,313,312,306,326,356,368,371,371,414,333,292,278,283,295,299,296,302,302,299,286,287
`;

        const parsedData = d3.csvParse(csvData);

        const years = Object.keys(parsedData[0]).filter((key) => key !== "CONCEPTO");
        const transformedData = years.map((year) => {
            const entry = { year };
            parsedData.forEach((row) => {
                entry[row.CONCEPTO] = +row[year] || 0;
            });
            return entry;
        });

        setAvailableConcepts(parsedData.map((row) => row.CONCEPTO));
        setSelectedConcept(parsedData[0]?.CONCEPTO);
        setData(transformedData);
    }, []);

    return (
        <div className="p-8 w-full flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Cantidad de Escuelas</h2>


            <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" angle={-90} textAnchor="end" interval={0} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                        type="monotone"
                        dataKey={selectedConcept}
                        stroke="#8884d8"
                        fill="#8884d8"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default InteractiveChart;
