import React from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const BubbleChart = ({ data }) => {
    if (!data || data.length === 0) return <div>No data available</div>;

    // Procesamos los datos para obtener x, y, z y name
    const processedData = data.map(d => ({
        x: +d.Primaria,
        y: +d.Media,
        z: +d.Total, // Esta es la propiedad que se usará para el tamaño
        name: d.Municipio
    }));

    // Función personalizada para mostrar el contenido del tooltip
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const { name, x, y, z } = payload[0].payload; // Obtener los datos del punto
            return (
                <div style={{
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                    padding: '10px',
                    borderRadius: '5px',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                    fontSize: '0.85rem'
                }}>
                    <p><strong>Municipio:</strong> {name}</p>
                    <p><strong>Primaria:</strong> {x}</p>
                    <p><strong>Media:</strong> {y}</p>
                    <p><strong>Total:</strong> {z}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <ResponsiveContainer width="100%" height={400}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="x" name="Primaria" />
                <YAxis type="number" dataKey="y" name="Media" />
                <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                <Scatter
                    name="Municipios"
                    data={processedData}
                    fill="#8884d8"
                    shape="circle"
                    // Se usa z para definir el tamaño de las burbujas
                    size={({ z }) => Math.sqrt(z) * 10000} // Puedes ajustar el valor multiplicado según sea necesario
                />
            </ScatterChart>
        </ResponsiveContainer>
    );
};

export default BubbleChart;
