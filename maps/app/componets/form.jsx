import React, { useState } from 'react';
import Form from 'next/form';

const OptionsForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        chartType: 'line',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        labels: '',
        values: '',
    });

    const [csvLabels, setCsvLabels] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    function csvFileToJson(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                const csvString = event.target.result;
                const rows = csvString.split("\n");
                const headers = rows[0].split(",").map(header => header.trim());
                const jsonData = [];

                for (let i = 1; i < rows.length; i++) {
                    const values = rows[i].split(",").map(value => value.trim());
                    const obj = {};

                    headers.forEach((header, index) => {
                        obj[header] = values[index] || null;
                    });

                    jsonData.push(obj);
                }

                resolve(jsonData);
            };

            reader.onerror = (error) => {
                reject(error);
            };

            reader.readAsText(file);
        });
    }

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.name.endsWith('.csv')) {
                alert("Please upload a valid CSV file.");
                return;
            }
            csvFileToJson(file)
                .then(jsonData => {

                    const labels = Object.keys(jsonData[0]).filter(key => key !== "");
                    setCsvLabels(labels.map(label => label.trim()));
                    setFormData(prevData => ({
                        ...prevData,
                        labels: labels
                    }));
                })
                .catch(error => {
                    console.error("Error al leer el archivo:", error);
                });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const labelsArray = formData.labels.split(',').map(label => label.trim());
        const valuesArray = formData.values.split(',').map(value => parseFloat(value.trim()));

        if (labelsArray.length !== valuesArray.length) {
            alert('El número de etiquetas debe coincidir con el número de valores.');
            return;
        }

        onSubmit({ ...formData, labels: labelsArray, values: valuesArray });
    };

    return (
        <Form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
            <h2>Opciones del Gráfico</h2>
            <div>
                <label htmlFor="chartType">Tipo de Gráfico:</label>
                <select
                    id="chartType"
                    name="chartType"
                    value={formData.chartType}
                    onChange={handleChange}
                >
                    <option value="line">Línea</option>
                    <option value="bar">Barra</option>
                    <option value="pie">Pastel</option>
                </select>
            </div>
            <div>
                <label htmlFor="backgroundColor">Color de Fondo:</label>
                <input
                    type="text"
                    id="backgroundColor"
                    name="backgroundColor"
                    value={formData.backgroundColor}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="borderColor">Color del Borde:</label>
                <input
                    type="text"
                    id="borderColor"
                    name="borderColor"
                    value={formData.borderColor}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="labels">Etiquetas (separadas por comas):</label>
                <input
                    type="text"
                    id="labels"
                    name="labels"
                    value={formData.labels}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="values">Valores (separados por comas):</label>
                <input
                    type="text"
                    id="values"
                    name="values"
                    value={formData.values}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="csvFile">Cargar archivo CSV:</label>
                <input
                    type="file"
                    id="csvFile"
                    accept=".csv"
                    onChange={handleFileUpload}
                />
            </div>

            {csvLabels.length > 0 && (
                <div>
                    <label htmlFor="csvLabelsSelect">Seleccionar el eje x:</label>
                    <select
                        id="csvLabelsSelect"
                        name="csvLabelsSelect"
                        onChange={(e) => setFormData({ ...formData, labels: e.target.value })}
                        defaultValue=""
                    >
                        <option value="" disabled>-- Selecciona una etiqueta --</option>
                        {csvLabels.map((label, index) => (
                            <option key={index} value={label}>{label}</option>
                        ))}
                    </select>
                </div>
            )}
            {csvLabels.length > 0 && (
                <div>
                    <label htmlFor="csvLabelsSelect">Seleccionar el eje y:</label>
                    <select
                        id="csvLabelsSelect"
                        name="csvLabelsSelect"
                        onChange={(e) => setFormData({ ...formData, labels: e.target.value })}
                        defaultValue=""
                    >
                        <option value="" disabled>-- Selecciona una etiqueta --</option>
                        {csvLabels.map((label, index) => (
                            <option key={index} value={label}>{label}</option>
                        ))}
                    </select>
                </div>
            )}

            <button type="submit">Generar Gráfico</button>
        </Form>
    );
};

export default OptionsForm;
