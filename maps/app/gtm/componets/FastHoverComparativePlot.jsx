import * as d3 from "d3";
import { useRef, useState } from "react";

const LinePlot = ({ data, width = 400, height = 300, title, filterFn }) => {
    const svgRef = useRef();
    const [hoveredSeries, setHoveredSeries] = useState(null);

    const margin = { top: 20, right: 15, bottom: 40, left: 40 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const filteredData = data.filter(filterFn);
    const years = ['2016-2017', '2017-2018', '2018-2019', '2019-2020'];
    const seriesNames = filteredData.map(d => d.CONCEPTOS);

    const color = d3.scaleOrdinal(d3.schemeTableau10).domain(seriesNames);

    const formattedData = seriesNames.map(name => ({
        name,
        values: years.map(year => ({
            year,
            value: +filteredData.find(d => d.CONCEPTOS === name)[year] || 0
        }))
    }));

    const x = d3.scalePoint()
        .domain(years)
        .range([margin.left, chartWidth + margin.left]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(formattedData.flatMap(series => series.values.map(v => v.value)))])
        .nice()
        .range([chartHeight + margin.top, margin.top]);

    const line = d3.line()
        .x(d => x(d.year))
        .y(d => y(d.value));


    const handleSeriesHover = (seriesName) => {
        setHoveredSeries(seriesName);
    };

    const handleMouseMove = (event) => {
        const [xPos, yPos] = d3.pointer(event, svgRef.current);
        const closestPoint = formattedData
            .flatMap(series => series.values.map(d => ({ ...d, series: series.name })))
            .reduce((closest, d) => {
                const distance = Math.hypot(x(d.year) - xPos, y(d.value) - yPos);
                return distance < 20 && distance < closest.distance
                    ? { distance, ...d }
                    : closest;
            }, { distance: Infinity });

        if (closestPoint.distance < 20) {
            const tooltip = d3.select(`#tooltip-${title}`);
            tooltip.style("opacity", 1)
                .style("left", `${Math.min(x(closestPoint.year) + 10, width - 120)}px`)
                .style("top", `${y(closestPoint.value) - 40}px`)
                .html(`
          <div style="color: ${color(closestPoint.series)}; font-weight: 600;">
            ${closestPoint.series}
          </div>
          <div style="color: #666;">
            ${closestPoint.year}: ${d3.format(",")(closestPoint.value)}
          </div>
        `);
        } else {
            d3.select(`#tooltip-${title}`).style("opacity", 0);
        }
    };

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: width,
            margin: '10px',
            padding: '5px'
        }}>
            <h3 style={{
                fontSize: '0.9rem',
                marginBottom: '8px',
                color: '#333'
            }}>{title}</h3>

            <svg
                ref={svgRef}
                viewBox={`0 0 ${width} ${height}`}
                preserveAspectRatio="xMidYMid meet"
                style={{ width: '100%', height: 'auto' }}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => {
                    setHoveredSeries(null);
                    d3.select(`#tooltip-${title}`).style("opacity", 0);
                }}
            >

                <g transform={`translate(0,${chartHeight + margin.top})`}>
                    {x.domain().map((d, i) => (
                        <g key={i} transform={`translate(${x(d)},0)`}>
                            <text
                                x="0"
                                y="20"
                                fontSize="0.6rem"
                                textAnchor="end"
                                transform="rotate(-45)"
                                fill="#666"
                            >
                                {d.split('-')[0]}
                            </text>
                        </g>
                    ))}
                </g>


                <g transform={`translate(${margin.left},0)`}>
                    {y.ticks(5).map((tick, i) => (
                        <g key={i} transform={`translate(0,${y(tick)})`}>
                            <line x2={chartWidth} stroke="#eee" />
                            <text
                                x="-5"
                                y="2"
                                fontSize="0.6rem"
                                textAnchor="end"
                                fill="#666"
                            >
                                {d3.format("~s")(tick)}
                            </text>
                        </g>
                    ))}
                </g>


                {formattedData.map((series) => (
                    <g
                        key={series.name}
                        style={{ transition: 'opacity 0.1s' }}
                        opacity={hoveredSeries && hoveredSeries !== series.name ? 0.2 : 1}
                        onMouseEnter={() => handleSeriesHover(series.name)}
                        onMouseLeave={() => handleSeriesHover(null)}
                    >
                        <path
                            fill="none"
                            stroke={color(series.name)}
                            strokeWidth={1.5}
                            d={line(series.values)}
                        />
                        {series.values.map((d, j) => (
                            <circle
                                key={j}
                                cx={x(d.year)}
                                cy={y(d.value)}
                                r={3}
                                fill={color(series.name)}
                                stroke="#fff"
                                strokeWidth={1}
                            />
                        ))}
                    </g>
                ))}
            </svg>

            <div
                id={`tooltip-${title}`}
                style={{
                    position: 'absolute',
                    opacity: 0,
                    background: 'rgba(255, 255, 255, 0.95)',
                    padding: '8px',
                    borderRadius: '4px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                    pointerEvents: 'none',
                    fontSize: '0.75rem',
                    border: '1px solid #ddd',
                    maxWidth: '150px',
                    lineHeight: '1.3'
                }}
            />


            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginTop: '10px',
                padding: '5px'
            }}>
                {formattedData.map((series) => (
                    <div
                        key={series.name}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            opacity: hoveredSeries && hoveredSeries !== series.name ? 0.2 : 1,
                            transition: 'opacity 0.1s',
                            padding: '4px 8px',
                            borderRadius: '4px'
                        }}
                        onMouseEnter={() => handleSeriesHover(series.name)}
                        onMouseLeave={() => handleSeriesHover(null)}
                    >
                        <div style={{
                            width: '12px',
                            height: '12px',
                            background: color(series.name),
                            borderRadius: '2px',
                            marginRight: '6px'
                        }}></div>
                        <span style={{
                            fontSize: '0.75rem',
                            color: '#444'
                        }}>
                            {series.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function FastHoverComparativePlot({ data }) {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '15px',
            padding: '10px',
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto'
        }}>
            <LinePlot
                data={data}
                title="Totales"
                filterFn={d => d.CONCEPTOS.toLowerCase().includes("(total)")}
                width={400}
                height={280}
            />

            <LinePlot
                data={data}
                title="Medias-Especiales"
                filterFn={d =>
                    d.CONCEPTOS.toLowerCase().includes("(media)") ||
                    d.CONCEPTOS.toLowerCase().includes("(especial)")
                }
                width={400}
                height={280}
            />
        </div>
    );
}