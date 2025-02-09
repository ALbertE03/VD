'use client';
import * as d3 from "d3";
import { useEffect, useState, useRef } from "react";

const AreaChart = ({ data, width = 400, height = 200, title, seriesNames, colorScale, selectedSeries, onHoverSeries }) => {
    const svgRef = useRef();
    const [tooltip, setTooltip] = useState(null);

    const margin = { top: 20, right: 30, bottom: 50, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    if (!data || data.length === 0) return <div>No hay datos disponibles</div>;

    const years = Object.keys(data[0]).filter(key => key !== "EDUCACIONES");
    const series = data.filter(d => seriesNames.includes(d.EDUCACIONES));

    const x = d3.scalePoint()
        .domain(years)
        .range([margin.left, innerWidth + margin.left]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(series, d => d3.max(years, year => +d[year] || 0))])
        .nice()
        .range([innerHeight, margin.top]);

    const area = d3.area()
        .defined((d) => !isNaN(d) && d !== null)
        .x((d, i) => x(years[i]))
        .y0(innerHeight)
        .y1(d => y(d));

    useEffect(() => {
        if (svgRef.current) {
            const svg = d3.select(svgRef.current);
            svg.selectAll(".x-axis").remove();
            svg.selectAll(".y-axis").remove();

            svg.append("g")
                .attr("transform", `translate(0, ${innerHeight})`)
                .attr("class", "x-axis")
                .call(d3.axisBottom(x).tickSizeOuter(0));

            svg.append("g")
                .attr("transform", `translate(${margin.left}, 0)`)
                .attr("class", "y-axis")
                .call(d3.axisLeft(y).tickSizeOuter(0));
        }
    }, [data]);

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "10px" }}>
            <h4>{title}</h4>
            <svg ref={svgRef} width={width} height={height}>
                {series.map((d, i) => (
                    <g key={i} opacity={selectedSeries.size === 0 || selectedSeries.has(d.EDUCACIONES) ? 1 : 0.2}>
                        <path
                            fill={colorScale(d.EDUCACIONES)}
                            stroke="none"
                            fillOpacity={0.6}
                            d={area(years.map(year => +d[year] || null))}
                            onMouseEnter={() => onHoverSeries(d.EDUCACIONES)}
                            onMouseLeave={() => onHoverSeries(null)}
                        />
                    </g>
                ))}
            </svg>
        </div>
    );
};

const Legend = ({ seriesNames, colorScale, selectedSeries, toggleSeries }) => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '20px', gap: '10px' }}>
            {seriesNames.map((name) => (
                <div
                    key={name}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        opacity: selectedSeries.has(name) ? 1 : 0.5,
                    }}
                    onClick={() => toggleSeries(name)}
                >
                    <div style={{
                        width: '12px',
                        height: '12px',
                        backgroundColor: colorScale(name),
                        marginRight: '5px'
                    }} />
                    <span>{name}</span>
                </div>
            ))}
        </div>
    );
};

const Container = ({ data }) => {
    const [selectedSeries, setSelectedSeries] = useState(new Set());
    const colorScale = d3.scaleOrdinal(d3.schemeTableau10);

    const toggleSeries = (name) => {
        setSelectedSeries(prev => {
            const newSelection = new Set(prev);
            if (newSelection.has(name)) {
                newSelection.delete(name);
            } else {
                newSelection.add(name);
            }
            return newSelection;
        });
    };

    const allSeriesNames = ["Primaria Urbana", "Primaria Rural", "Secundaria Urbana", "Secundaria Rural", "Preuniversitario Urbano", "Preuniversitario Rural"];

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Legend
                seriesNames={allSeriesNames}
                colorScale={colorScale}
                selectedSeries={selectedSeries}
                toggleSeries={toggleSeries}
            />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
                <AreaChart
                    data={data}
                    title="Primaria"
                    seriesNames={["Primaria Urbana", "Primaria Rural"]}
                    colorScale={colorScale}
                    selectedSeries={selectedSeries}
                    onHoverSeries={(name) => console.log(name)}
                />
                <AreaChart
                    data={data}
                    title="Secundaria"
                    seriesNames={["Secundaria Urbana", "Secundaria Rural"]}
                    colorScale={colorScale}
                    selectedSeries={selectedSeries}
                    onHoverSeries={(name) => console.log(name)}
                />
            </div>
            <AreaChart
                data={data}
                title="Preuniversitario"
                seriesNames={["Preuniversitario Urbano", "Preuniversitario Rural"]}
                colorScale={colorScale}
                selectedSeries={selectedSeries}
                onHoverSeries={(name) => console.log(name)}
            />
        </div>
    );
};


const CSVLoader = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        d3.csv("/data/gtm/personal docente por educaciones.csv").then(csvData => {
            const transformedData = csvData.map(row => {
                let formattedRow = { EDUCACIONES: row.EDUCACIONES };
                Object.keys(row).forEach(key => {
                    if (key !== "EDUCACIONES" && !isNaN(+row[key])) {
                        formattedRow[key] = +row[key];
                    }
                });
                return formattedRow;
            }).filter(row => row.EDUCACIONES !== "Total" && Object.keys(row).length > 1);
            setData(transformedData);
        }).catch(error => {
            console.error("Error cargando el CSV:", error);
        });
    }, []);

    return data ? <Container data={data} /> : <div>Cargando datos...</div>;
};
CSVLoader.displayName = 'CSVLoader';
export default CSVLoader;
