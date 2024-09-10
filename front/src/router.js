import {createBrowserRouter} from "react-router-dom"
import React from "react"
import Main from "./components/Index";
import Words from "./components/Dictionary/Words";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>
    },
    {
        path: "/dictionary",
        element: <Words/>
    }
])

export default router