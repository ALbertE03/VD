import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const StackedBarChart = ({ data }) => {
    const svgRef = useRef(null);

    useEffect(() => {
        if (!data || data.length === 0) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        // Dimensiones y márgenes
        const margin = { top: 50, right: 150, bottom: 100, left: 50 };
        const width = 800 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        // Crear el contenedor del gráfico
        const chart = svg
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Parsear los años (columnas)
        const years = data.columns.slice(1);

        // Preparar los datos para el apilamiento
        const stack = d3.stack()
            .keys(years) // Usar los años como claves
            .order(d3.stackOrderNone)
            .offset(d3.stackOffsetNone);

        const stackedData = stack(data);

        // Escalas
        const xScale = d3.scaleBand()
            .domain(data.map(d => d.EDUCACIONES)) // Eje X: Tipos de educación
            .range([0, width])
            .padding(0.2);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(stackedData, layer => d3.max(layer, d => d[1]))]) // Eje Y: Valores máximos
            .range([height, 0]);

        const colorScale = d3.scaleOrdinal(d3.schemeCategory10); // Escala de colores

        // Ejes
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        chart.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(xAxis)
            .selectAll("text")
            .attr("transform", "rotate(-45)")
            .style("text-anchor", "end");

        chart.append("g")
            .call(yAxis);

        // Barras apiladas
        chart.selectAll(".layer")
            .data(stackedData)
            .enter()
            .append("g")
            .attr("class", "layer")
            .attr("fill", (d, i) => colorScale(i)) // Colores por año
            .selectAll("rect")
            .data(d => d)
            .enter()
            .append("rect")
            .attr("x", d => xScale(d.data.EDUCACIONES)) // Posición X
            .attr("y", d => yScale(d[1])) // Posición Y
            .attr("height", d => yScale(d[0]) - yScale(d[1])) // Altura de la barra
            .attr("width", xScale.bandwidth()) // Ancho de la barra
            .on("mouseover", function (event, d) {
                // Resaltar la barra al pasar el mouse
                d3.select(this)
                    .attr("opacity", 0.8);

                // Mostrar tooltip
                const [year, value] = [d.data[d3.select(this.parentNode).datum().key], d[1] - d[0]];
                chart.append("text")
                    .attr("class", "tooltip")
                    .attr("x", xScale(d.data.EDUCACIONES) + xScale.bandwidth() / 2)
                    .attr("y", yScale(d[1]) - 5)
                    .attr("text-anchor", "middle")
                    .style("font-size", "12px")
                    .style("fill", "#333")
                    .text(`${year}: ${value}`);
            })
            .on("mouseout", function () {
                // Restaurar la opacidad y eliminar el tooltip
                d3.select(this)
                    .attr("opacity", 1);
                chart.selectAll(".tooltip").remove();
            });

        // Leyenda
        const legend = chart.append("g")
            .attr("transform", `translate(${width + 20}, 0)`);

        years.forEach((year, i) => {
            legend.append("rect")
                .attr("x", 0)
                .attr("y", i * 20)
                .attr("width", 15)
                .attr("height", 15)
                .attr("fill", colorScale(i));

            legend.append("text")
                .attr("x", 20)
                .attr("y", i * 20 + 12)
                .text(year)
                .style("font-size", "12px")
                .style("fill", "#333");
        });

        // Etiquetas de los ejes
        chart.append("text")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 10)
            .attr("text-anchor", "middle")
            .text("Tipo de Educación");

        chart.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2)
            .attr("y", -margin.left + 15)
            .attr("text-anchor", "middle")
            .text("Número de Graduados");

    }, [data]);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <svg ref={svgRef} style={{ width: '100%', height: '100%' }}></svg>
        </div>
    );
};

export default StackedBarChart;