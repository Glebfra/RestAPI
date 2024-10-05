import * as React from 'react';
import ReactDOM from 'react-dom/client';
import router from './router';
import {RouterProvider} from "react-router-dom";
import BaseDashboardLayout from "./Layouts/BaseDashboardLayout";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BaseDashboardLayout>
            <RouterProvider router={router}/>
        </BaseDashboardLayout>
    </React.StrictMode>
);
