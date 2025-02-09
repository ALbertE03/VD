'use client';
import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    {
        CONCEPTO: 'Cursos',
        2000: 79846,
        2001: 92582,
        2002: 93836,
        2003: 314560,
        2004: 342200,
        2005: 385191,
        2006: 413139,
        2007: 364961,
        2008: 336560,
        2009: 409622,
        2010: 307932,
        2011: 367378,
        2012: 334064,
        2013: 299103,
        2014: 282959,
        2015: 226501,
        2016: 411374,
        2017: 209990,
        2018: 198455,
        2019: 428378,
        2020: 423196,
        2021: 176824,
    },
    {
        CONCEPTO: 'Entrenamientos',
        2000: 3556,
        2001: 4311,
        2002: 4103,
        2003: 26734,
        2004: 34289,
        2005: 20124,
        2006: 25616,
        2007: 48312,
        2008: 29029,
        2009: 26788,
        2010: 27047,
        2011: 21866,
        2012: 17016,
        2013: 21745,
        2014: 26225,
        2015: 16624,
        2016: 14781,
        2017: 21660,
        2018: 24422,
        2019: 23169,
        2020: 23278,
        2021: 18270,
    },
    {
        CONCEPTO: 'Diplomados',
        2000: 13518,
        2001: 16521,
        2002: 14123,
        2003: 71183,
        2004: 70083,
        2005: 76870,
        2006: 59185,
        2007: 45661,
        2008: 56340,
        2009: 44472,
        2010: 41048,
        2011: 36823,
        2012: 37275,
        2013: 39230,
        2014: 27440,
        2015: 22525,
        2016: 21683,
        2017: 21687,
        2018: 22539,
        2019: 13148,
        2020: 11095,
        2021: 15714,
    },
    {
        CONCEPTO: 'Maestrías y especialidades',
        2000: 9385,
        2001: 11708,
        2002: 12403,
        2003: 49337,
        2004: 37419,
        2005: 113091,
        2006: 143597,
        2007: 192167,
        2008: 197828,
        2009: 144284,
        2010: 144642,
        2011: 109859,
        2012: 75054,
        2013: 50730,
        2014: 54188,
        2015: 50451,
        2016: 41906,
        2017: 44805,
        2018: 45543,
        2019: 52371,
        2020: 52817,
        2021: 51594,
    },
    {
        CONCEPTO: 'Doctorados',
        2000: 840,
        2001: 958,
        2002: 930,
        2003: 2942,
        2004: 2511,
        2005: 4129,
        2006: 3930,
        2007: 5443,
        2008: 5749,
        2009: 5254,
        2010: 5776,
        2011: 5384,
        2012: 4744,
        2013: 4576,
        2014: 6487,
        2015: 6041,
        2016: 4310,
        2017: 4592,
        2018: 4390,
        2019: 4514,
        2020: 5120,
        2021: 5980,
    },
];

const COLORS = ['#8884d8', '#8dd1e1', '#82ca9d', '#ffc658', '#ff8042'];

const PieChartWithSelector = () => {
    const [selectedYear, setSelectedYear] = useState('2000');

    const years = Object.keys(data[0]).filter((key) => key !== 'CONCEPTO');

    const pieData = data.map((item) => ({
        name: item.CONCEPTO,
        value: item[selectedYear],
    }));

    return (
        <div style={{ width: '100%', height: 500, padding: 20 }}>
            <h1 className="text-2xl font-bold mb-6">Postgrado</h1>
            <div style={{ marginBottom: 20 }}>
                <label htmlFor="year-select">Selecciona un año: </label>
                <select
                    id="year-select"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                >
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        label={({ name }) => name}
                        fill="#8884d8"
                    >
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PieChartWithSelector;
