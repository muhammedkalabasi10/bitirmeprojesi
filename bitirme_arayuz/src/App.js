import React, { useState } from 'react';
import axios from 'axios';
import FileBase64 from 'react-file-base64';
import './App.css'; // Stil dosyası için

const App = () => {
    const [file, setFile] = useState(null);
    const [prediction, setPrediction] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (base64) => {
        setFile(base64);
        setPrediction(''); // Yeni görsel yüklendiğinde önceki tahmini temizle
    };

    const handleSubmit = async () => {
        if (!file) {
            alert("Please upload an image first.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('https://6994-34-173-73-198.ngrok-free.app/predict', {
                image: file
            });
            setPrediction(response.data.predict);
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="upload-box">
                <h1>Image Upload</h1>
                <FileBase64 multiple={false} onDone={({ base64 }) => handleFileChange(base64)} />
                {file && <img src={file} alt="Uploaded" className="uploaded-image" />}
                <button onClick={handleSubmit}>Submit</button>
                {loading && <div className="spinner"></div>}
                {prediction && <p>Prediction: {prediction}</p>}
            </div>
        </div>
    );
};

export default App;
