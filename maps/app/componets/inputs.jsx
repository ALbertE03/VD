'use client';
import React, { useState } from 'react';
import Grafico from './graficos';
import OptionsForm from './form';
const Inputs = () => {
    const [chartData, setChartData] = useState(null);
    const [chartOptions, setChartOptions] = useState({});
    const [chartType, setChartType] = useState('line');

    const handleFormSubmit = (data) => {
        const formattedData = {
            labels: data.labels,
            datasets: [
                {
                    label: 'Ventas',
                    data: data.values,
                    fill: true,
                    backgroundColor: data.backgroundColor,
                    borderColor: data.borderColor,
                    borderWidth: 4,
                    pointBackgroundColor: data.borderColor,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: data.borderColor,
                    tension: 0.1,
                },
            ],
        };

        const options = {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Meses',
                        font: { size: 16, weight: 'bold' },
                        color: '#333',
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Ventas',
                        font: { size: 16, weight: 'bold' },
                        color: '#333',
                    },
                    beginAtZero: true,
                },
            },
            plugins: {
                legend: { display: true, position: 'top', labels: { fontColor: '#333', fontSize: '14' } },
                tooltip: { backgroundColor: 'rgba(0,0,0,.7)', titleColor: '#fff', bodyColor: '#fff' }
            },
        };

        setChartType(data.chartType);
        setChartData(formattedData);
        setChartOptions(options);
    };

    return (
        <div className="inputs-section bg-gray-100 p-4 rounded-lg shadow-md lg:w-1/3 flex flex-col">
            <OptionsForm onSubmit={handleFormSubmit} />
            {chartData && (
                <Grafico type={chartType} data={chartData} options={chartOptions} />
            )}
        </div>
    );
};

export default Inputs;
