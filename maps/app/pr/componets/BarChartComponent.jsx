'use client';
import { React, useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Papa from 'papaparse';


const BarChartComponent = () => {
    const [data, setData] = useState([]);
    async function parseCSV(csvContent) {
        const lines = csvContent.trim().split('\n');
        const headers = lines[0].split(',');

        return lines.slice(1).map(line => {
            const values = line.split(',');
            return headers.reduce((obj, header, index) => {
                obj[header.trim()] = values[index] ? values[index].trim() : '';
                return obj;
            }, {});
        });
    }
    useEffect(() => {
        async function fetchCSV() {
            const response = await fetch('/data/gtm/matricula final de los circulos infantiles.csv');

            const reader = response.body.getReader();
            const result = await reader.read();
            const decoder = new TextDecoder('utf-8');
            const csv = decoder.decode(result.value);
            const results = await parseCSV(csv)
            const transformedData = Object.keys(results[0])
                .filter(key => key !== 'AÑOS')
                .map(year => ({
                    name: year,
                    Total: parseInt(results[0][year], 10),
                    SegundoAnno: parseInt(results[1][year], 10),
                    TercerAnno: parseInt(results[2][year], 10),
                    CuartoAnno: parseInt(results[3][year], 10),
                    QuintoAnno: parseInt(results[4][year], 10),
                    SextoAnno: parseInt(results[5][year], 10),
                }));
            setData(transformedData);
        }

        fetchCSV();
    }, [])

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={data}
                margin={{
                    top: 20, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Total" fill="#8884d8" />
                <Bar dataKey="SegundoAnno" fill="#82ca9d" />
                <Bar dataKey="TercerAnno" fill="#ffc658" />
                <Bar dataKey="CuartoAnno" fill="#ff7300" />
                <Bar dataKey="QuintoAnno" fill="#00c49f" />
                <Bar dataKey="SextoAnno" fill="#0088fe" />
                <Bar dataKey="Ninos" fill="#ff0000" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartComponent;