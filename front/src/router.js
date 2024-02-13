import {createBrowserRouter} from "react-router-dom";
import Words from "./components/Dictionary/Words";
import React from "react";
import Dictionary from "./components/Dictionary/Dictionary";

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Hello world</div>
    },
    {
        path: "dictionary/words/",
        element: <Words/>
    },
    {
        path: "dictionary/",
        element: <Dictionary/>
    },
]);

export default router;