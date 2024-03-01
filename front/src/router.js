import {createBrowserRouter} from "react-router-dom"
import Words from "./components/Dictionary/Words"
import React from "react"
import Dictionary from "./components/Dictionary/Dictionary"
import Science from "./components/Science/Science"
import Main from "./components/Index";
import Account from "./components/Account/Account";
import Login from "./components/Account/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>
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
    {
        path: "account/",
        element: <Account/>
    },
    {
        path: "login/",
        element: <Login/>
    },
])

export default router