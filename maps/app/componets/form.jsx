import React, { useState } from 'react';
import Papa from 'papaparse';

const OptionsForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        chartType: 'line', // Tipo de gráfico por defecto
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        labels: '',
        values: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // falta agregarlle la logica bien de los csv para que se adapte
            Papa.parse(file, {
                complete: (result) => {
                    const data = result.data;
                    const labels = data.map(row => row[0]).slice(1);
                    const values = data.map(row => parseFloat(row[1])).slice(1);
                    setFormData(prevData => ({
                        ...prevData,
                        labels: labels.join(','),
                        values: values.join(',')
                    }));
                },
                header: false
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
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
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
            <button type="submit">Generar Gráfico</button>
        </form>
    );
};

export default OptionsForm;
