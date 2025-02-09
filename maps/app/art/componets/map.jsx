import * as d3 from "d3";
import { useEffect, useRef } from "react";

const GeoJSONMap = ({ geoJsonUrl, width = 800, height = 600 }) => {
    const svgRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        d3.json(geoJsonUrl)
            .then((geoData) => {
                console.log("GeoJSON cargado:", geoData);

                const projection = d3.geoMercator().fitSize([width, height], geoData);
                const pathGenerator = d3.geoPath().projection(projection);

                svg.selectAll("path")
                    .data(geoData.features)
                    .enter()
                    .append("path")
                    .attr("d", pathGenerator)
                    .attr("fill", "#d13838")
                    .attr("stroke", "#333")
                    .attr("stroke-width", 0.5)
                    .on("mouseover", function () {
                        d3.select(this).attr("fill", "#ffcc00");
                    })
                    .on("mouseout", function () {
                        d3.select(this).attr("fill", "#d13838");
                    });
            })
            .catch((error) => {
                console.error("Error cargando el GeoJSON:", error);
            });
    }, [geoJsonUrl]);

    return <svg ref={svgRef} width={width} height={height}></svg>;
};
GeoJSONMap.displayName = 'GeoJSONMap';
export default GeoJSONMap;
