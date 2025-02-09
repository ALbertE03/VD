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
        const csvData = `CONCEPTO,1985/86,1986/87,1987/88,1988/89,1989/90,1990/91,1991/92,1992/93,1993/94,1994/95,1995/96,1996/97,1997/98,1998/99,1999/00,2000/01,2001/02,2002/03,2003/04,2004/05,2005/06,2006/07,2007/08,2008/09,2009/10,2010/11,20011/12,2012/13,2013/14,2014/15,2015/16,2016/17,2017/18,2018/19,2019/20,2020/21,2021/22
Superior,35,35,35,35,35,35,35,34,33,33,32,56,57,58,59,63,63,64,64,64,65,56,56,59,60,58,59,58,58,51,43,41,50,50,50,50,50`;

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
