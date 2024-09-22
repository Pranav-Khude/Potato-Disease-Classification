import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <nav className="navbar">
        <h1>Potato Disease Classifier</h1>
        <Link to="/predict" className="nav-link">Predict</Link>
      </nav>
      <div className="content">
        <h2>Common Potato Diseases and Preventive Measures</h2>
        <div className="disease-info">
          <h3>Early Blight</h3>
          <p>Early blight is caused by the fungus Alternaria solani and can affect leaves, stems, and tubers.</p>
          <h4>Preventive Measures:</h4>
          <ul>
            <li>Use disease-free seed potatoes</li>
            <li>Practice crop rotation</li>
            <li>Maintain proper plant spacing for good air circulation</li>
            <li>Apply fungicides as a preventive measure</li>
          </ul>
        </div>
        <div className="disease-info">
          <h3>Late Blight</h3>
          <p>Late blight is caused by the oomycete Phytophthora infestans and can rapidly destroy entire fields.</p>
          <h4>Preventive Measures:</h4>
          <ul>
            <li>Plant resistant varieties when available</li>
            <li>Destroy all cull piles and volunteer potato plants</li>
            <li>Apply fungicides before disease symptoms appear</li>
            <li>Monitor fields regularly for signs of infection</li>
          </ul>
        </div>
        <div className="disease-info">
          <h3>Maintaining Healthy Potatoes</h3>
          <p>Keeping your potato plants healthy is key to preventing diseases.</p>
          <h4>Best Practices:</h4>
          <ul>
            <li>Ensure proper soil drainage</li>
            <li>Maintain balanced soil fertility</li>
            <li>Water plants at the base to keep foliage dry</li>
            <li>Practice good sanitation in the field</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;