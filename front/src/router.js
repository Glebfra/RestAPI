import {createBrowserRouter} from "react-router-dom";
import Words from "./components/Dictionary/Words";
import React from "react";
import Menu from "./components/Menu/Menu";

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Hello world</div>
    },
    {
        path: "words/",
        element: <Words/>
    },
]);

export default router;