"use client";

import dynamic from 'next/dynamic';
import { Chart as ChartJS, LineElement, PointElement, BarElement, ArcElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, BarElement, ArcElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const LineChart = dynamic(() => import('react-chartjs-2').then(mod => mod.Line), { ssr: false });
const BarChart = dynamic(() => import('react-chartjs-2').then(mod => mod.Bar), { ssr: false });
const PieChart = dynamic(() => import('react-chartjs-2').then(mod => mod.Pie), { ssr: false });

const Grafico = ({ type, data, options }) => {
    let ChartComponent;

    switch (type) {
        case 'bar':
            ChartComponent = BarChart;
            break;
        case 'pie':
            ChartComponent = PieChart;
            break;
        case 'line':
        default:
            ChartComponent = LineChart;
            break;
    }

    return (
        <div style={{
            display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'
        }}>
            <ChartComponent data={data} options={options} />
        </div>
    );
};

export default Grafico;
