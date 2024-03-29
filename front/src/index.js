import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {RouterProvider} from "react-router-dom";
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

axios.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('access')}`
axios.defaults.baseURL = 'http://api.localhost'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);
