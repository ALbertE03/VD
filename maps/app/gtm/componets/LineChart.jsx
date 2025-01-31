import * as d3 from "d3";
import { useRef, useEffect, useState } from "react";

export default function LinePlot({
    data,
    width = 640,
    height = 400,
    marginTop = 20,
    marginRight = 20,
    marginBottom = 30,
    marginLeft = 40
}) {
    const svgRef = useRef();
    const gx = useRef();
    const gy = useRef();
    const gyGrid = useRef();
    const [hoveredPoint, setHoveredPoint] = useState(null);
    const [hiddenSeries, setHiddenSeries] = useState(new Set());

    const filteredData = data.filter(d =>
        d.CONCEPTOS.toLowerCase().includes("(total)")
    );

    const years = ['2016-2017', '2017-2018', '2018-2019', '2019-2020'];
    const seriesNames = filteredData.map(d => d.CONCEPTOS);

    const color = d3.scaleOrdinal()
        .domain(seriesNames)
        .range([
            '#2c5c6a', '#4a8c79', '#7cb518', '#ff6b35',
            '#5e548e', '#ef476f', '#118ab2', '#06d6a0'
        ]);

    const formattedData = seriesNames.map(name => ({
        name,
        values: years.map(year => ({
            year,
            value: +filteredData.find(d => d.CONCEPTOS === name)[year] || 0
        }))
    }));

    const x = d3.scalePoint()
        .domain(years)
        .range([marginLeft, width - marginRight]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(formattedData.flatMap(series =>
            hiddenSeries.has(series.name) ? [] : series.values.map(v => v.value)
        ))])
        .nice()
        .range([height - marginBottom, marginTop]);

    const line = d3.line()
        .x(d => x(d.year))
        .y(d => y(d.value));

    useEffect(() => {
        d3.select(gx.current).call(d3.axisBottom(x).tickSizeOuter(0));
        d3.select(gy.current).call(d3.axisLeft(y).ticks(5));
        d3.select(gyGrid.current).call(
            d3.axisLeft(y)
                .tickSize(-width + marginLeft + marginRight)
                .tickFormat("")
        );
    }, [x, y]);

    const handleMouseMove = (event) => {
        const [xPos, yPos] = d3.pointer(event, svgRef.current);
        const closestPoint = formattedData
            .flatMap(series =>
                hiddenSeries.has(series.name)
                    ? []
                    : series.values.map(d => ({ ...d, series: series.name }))
            )
            .reduce((closest, d) => {
                const distance = Math.hypot(x(d.year) - xPos, y(d.value) - yPos);
                return distance < 20 && distance < closest.distance
                    ? { distance, ...d }
                    : closest;
            }, { distance: Infinity });

        if (closestPoint.distance < 20) {
            setHoveredPoint(closestPoint);
            d3.select("#tooltip")
                .style("left", `${x(closestPoint.year) + marginLeft - 30}px`)
                .style("top", `${y(closestPoint.value) - 30}px`)
                .style("opacity", 1);
        } else {
            setHoveredPoint(null);
            d3.select("#tooltip").style("opacity", 0);
        }
    };

    const toggleSeries = (name) => {
        setHiddenSeries(prev => {
            const next = new Set(prev);
            next.has(name) ? next.delete(name) : next.add(name);
            return next;
        });
    };

    return (
        <div style={{ position: 'relative' }}>
            <svg
                ref={svgRef}
                width={width}
                height={height}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => {
                    setHoveredPoint(null);
                    d3.select("#tooltip").style("opacity", 0);
                }}
            >
                <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
                <g ref={gy} transform={`translate(${marginLeft},0)`} />
                <g ref={gyGrid} transform={`translate(${marginLeft},0)`} className="grid" />

                {formattedData.map((series) => !hiddenSeries.has(series.name) && (
                    <g
                        key={series.name}
                        opacity={hoveredPoint && hoveredPoint.series !== series.name ? 0.3 : 1}
                    >
                        <path
                            fill="none"
                            stroke={color(series.name)}
                            strokeWidth={2.5}
                            d={line(series.values)}
                        />
                        {series.values.map((d, j) => (
                            <circle
                                key={j}
                                cx={x(d.year)}
                                cy={y(d.value)}
                                r={4.5}
                                fill={color(series.name)}
                                stroke="#fff"
                                strokeWidth={2}
                            />
                        ))}
                    </g>
                ))}
            </svg>

            <div id="tooltip" style={{
                position: 'absolute',
                opacity: 0,
                background: '#ffffff',
                padding: '12px',
                borderRadius: '8px',
                boxShadow: '0 3px 10px rgba(0,0,0,0.15)',
                pointerEvents: 'none',
                fontFamily: 'Arial',
                fontSize: '14px',
                transition: 'opacity 0.2s',
                border: '1px solid #e0e0e0',
                minWidth: '140px'
            }}>
                {hoveredPoint && (
                    <div>
                        <div style={{
                            color: color(hoveredPoint.series),
                            fontWeight: 600,
                            fontSize: '15px',
                            marginBottom: '6px'
                        }}>
                            {hoveredPoint.series}
                        </div>
                        <div style={{ color: '#444' }}>
                            <div style={{ marginBottom: '4px' }}>Año: {hoveredPoint.year}</div>
                            <div>Valor: {d3.format(",.0f")(hoveredPoint.value)}</div>
                        </div>
                    </div>
                )}
            </div>

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                marginTop: '16px',
                padding: '12px',
                borderRadius: '8px',
                background: '#f8f9fa',
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
            }}>
                {formattedData.map((series) => (
                    <div
                        key={series.name}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            opacity: hiddenSeries.has(series.name) ? 0.3 : 1,
                            transition: 'all 0.2s',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            background: hoveredPoint?.series === series.name ? 'rgba(0,0,0,0.05)' : 'transparent'
                        }}
                        onClick={() => toggleSeries(series.name)}
                    >
                        <div style={{
                            width: '16px',
                            height: '16px',
                            background: color(series.name),
                            borderRadius: '4px',
                            marginRight: '12px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}></div>
                        <span style={{
                            fontSize: '14px',
                            color: '#2d3436',
                            fontWeight: 500,
                            textDecoration: hiddenSeries.has(series.name) ? 'line-through' : 'none'
                        }}>
                            {series.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}