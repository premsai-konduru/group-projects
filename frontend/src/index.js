import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Root element with id 'root' not found in the document.");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <App />
);

// reportWebVitals(console.log);
reportWebVitals();