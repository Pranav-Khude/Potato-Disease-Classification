import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './ImageUploader.css';

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPrediction("");
    setConfidence("");
    setError(null);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8000/predict/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPrediction(data.predicted_class);
      setConfidence(data.confidence);
    } catch (error) {
      console.error("Error uploading file", error);
      setError("An error occurred while processing your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <nav className="navbar">
        <h1>Potato Disease Classifier</h1>
        <Link to="/" className="nav-link">Home</Link>
      </nav>
      <div className="card">
        <h1 className="title">Predict Plant Disease</h1>
        
        <form onSubmit={handleSubmit} className="form">
          <div className="file-input-container">
            <input
              type="file"
              onChange={handleFileChange}
              className="file-input"
              accept="image/*"
            />
            <label className="file-input-label">
              Click or drag file to upload
            </label>
          </div>
          
          {previewUrl && (
            <div className="preview-container">
              <img src={previewUrl} alt="Preview" className="preview-image" />
            </div>
          )}
          
          <button
            type="submit"
            className="submit-button"
            disabled={!selectedFile || loading}
          >
            {loading ? "Analyzing..." : "Analyze Plant"}
          </button>
        </form>
        
        {error && (
          <div className="alert error">
            <p className="alert-title">Error</p>
            <p className="alert-description">{error}</p>
          </div>
        )}
        
        {prediction && (
          <div className="alert success">
            <p className="alert-title">Prediction Result</p>
            <p className="alert-description">
              <strong>{prediction}</strong>
              <br />
              Confidence: {confidence}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;