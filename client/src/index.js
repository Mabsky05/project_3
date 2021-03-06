import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.css';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
