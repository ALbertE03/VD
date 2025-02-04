'use client';
import React, { useEffect, useState, memo } from "react";
import Papa from "papaparse";
import styles from "./table.module.css";

const Table = memo(({ url }) => {
    const [data, setData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadCSV = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    setError("Error al cargar el archivo CSV. Respuesta no válida.");
                    return;
                }

                const csvData = await response.text();
                const parsedData = Papa.parse(csvData, { header: true }).data;

                if (parsedData.length > 0) {
                    setHeaders(Object.keys(parsedData[0]));
                    setData(parsedData);
                }
                setLoading(false);
            } catch (error) {
                setError("Hubo un error al cargar el archivo CSV.");
                setLoading(false);
            }
        };

        loadCSV();
    }, [url]);

    if (loading) {
        return <div className={styles.loading}>Cargando...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.tableWrapper}>
            <table className={styles.styledTable}>
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {headers.map((header, colIndex) => (
                                <td key={colIndex}>{row[header] || ""}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
});

export default Table;