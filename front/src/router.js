import {createBrowserRouter} from "react-router-dom"
import Words from "./components/Dictionary/Words"
import React from "react"
import Dictionary from "./components/Dictionary/Dictionary"
import Science from "./components/Science/Science"

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
    {
        path: "science/",
        element: <Science/>
    },
])

export default router