import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';

const Heatmap = ({ url, title, categories }) => {
    const [data, setData] = useState([]);
    const svgRef = useRef(null);

    useEffect(() => {
        // Leer y procesar el archivo CSV
        d3.csv(url).then((rawData) => {
            const structuredData = processCSV(rawData);
            setData(structuredData);
        });
    }, []);

    const processCSV = (rawData) => {
        let years = ['2013-2014', '2014-2015', '2015-2016', '2016-2017', '2017-2018', '2018-2019'];

        return categories.flatMap(category =>
            years.map(year => ({
                category,
                year,
                value: +rawData.find(row => row.EDUCACIONES === category)[year] || 0
            }))
        );
    };

    useEffect(() => {
        if (data.length === 0) return;

        const margin = { top: 50, right: 50, bottom: 100, left: 100 };
        const width = 800 - margin.left - margin.right;
        const height = 600 - margin.top - margin.bottom;

        const svg = d3.select(svgRef.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const categories = Array.from(new Set(data.map(d => d.category)));
        const years = Array.from(new Set(data.map(d => d.year)));

        const x = d3.scaleBand()
            .range([0, width])
            .domain(years)
            .padding(0.05);

        const y = d3.scaleBand()
            .range([height, 0])
            .domain(categories)
            .padding(0.05);

        const colorScale = d3.scaleSequential()
            .interpolator(d3.interpolateYlOrRd)
            .domain([0, d3.max(data, d => d.value)]);

        svg.selectAll()
            .data(data)
            .enter()
            .append('rect')
            .attr('x', d => x(d.year))
            .attr('y', d => y(d.category))
            .attr('width', x.bandwidth())
            .attr('height', y.bandwidth())
            .style('fill', d => colorScale(d.value));

        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .selectAll('text')
            .style('text-anchor', 'end')
            .attr('dx', '-.8em')
            .attr('dy', '.15em')
            .attr('transform', 'rotate(-65)');

        svg.append('g')
            .call(d3.axisLeft(y));

        // Título
        svg.append('text')
            .attr('x', width / 2)
            .attr('y', -margin.top / 2)
            .attr('text-anchor', 'middle')
            .style('font-size', '16px')
            .text(title);
    }, [data]);

    return (
        <div>
            <svg ref={svgRef}></svg>
        </div>
    );
};
Heatmap.displayName = 'Heatmap';
export default Heatmap;
