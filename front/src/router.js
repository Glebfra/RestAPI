import {createBrowserRouter} from "react-router-dom";
import Word from "./components/Dictionary/Word";
import React from "react";

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Hello world</div>
    },
    {
        path: "word/",
        element: <Word/>
    }
]);

export default router;