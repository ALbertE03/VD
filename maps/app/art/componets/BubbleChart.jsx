import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const EducationBarChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={500}>
            <BarChart
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="EDUCACIONES" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="2014-2015" fill="#8884d8" />
                <Bar dataKey="2015-2016" fill="#82ca9d" />
                <Bar dataKey="2016-2017" fill="#ffc658" />
                <Bar dataKey="2017-2018" fill="#ff7300" />
                <Bar dataKey="2018-2019" fill="#a4de6c" />
                <Bar dataKey="2019-2020" fill="#d0ed57" />
            </BarChart>
        </ResponsiveContainer>
    );
};
EducationBarChart.displayName = 'EducationBarChart';
export default EducationBarChart;
