'use client';
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import * as d3 from 'd3';

const InfografiaMunicipios = ({ url }) => {
    const [data, setData] = useState([]);
    const [dataPie, setDataPie] = useState([]);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        d3.csv(url).then((rawData) => {
            // Convertir los valores a números
            const formattedData = rawData.map((row) => ({
                ...row,
                Total: +row.Total,
                Primaria: +row.Primaria,
                Media: +row.Media,
                Especial: +row.Especial,
                Adultos: +row.Adultos,
                Superior: +row.Superior,
                Otras: +row.Otras,
            }));

            setData(formattedData);

            // Preparar datos para el gráfico de pastel
            if (formattedData.length > 0) {
                setDataPie([
                    { name: "Primaria", value: formattedData[0].Primaria },
                    { name: "Media", value: formattedData[0].Media },
                    { name: "Especial", value: formattedData[0].Especial },
                    { name: "Adultos", value: formattedData[0].Adultos },
                    { name: "Superior", value: formattedData[0].Superior },
                    { name: "Otras", value: formattedData[0].Otras },
                ]);
            }
        });
    }, [url]);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Verifica que los datos estén disponibles antes de renderizar
    if (!isClient || data.length === 0 || dataPie.length === 0) {
        return <p>Cargando datos...</p>; // Mensaje de carga
    }

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF1919"];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Escuelas por municipios de Guantánamo</h1>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Total de Matrículas por Municipio</h2>
                <BarChart width={800} height={400} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="MUNICIPIOS" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Total" fill="#8884d8" />
                </BarChart>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">Distribución de Matrículas en {data[0].MUNICIPIOS}</h2>
                <PieChart width={400} height={400}>
                    <Pie
                        data={dataPie}
                        cx={200}
                        cy={200}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label
                    >
                        {dataPie.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>
        </div>
    );
};

export default InfografiaMunicipios;