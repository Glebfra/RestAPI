import {createBrowserRouter} from "react-router-dom"
import React from "react"
import Main from "./components/Index";
import Dictionary from "./components/Dictionary/Dictionary";
import SignIn from "./components/Auth/SignIn";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>
    },
    {
        path: "/dictionary",
        element: <Dictionary/>
    },
    {
        path: "/sign-in",
        element: <SignIn/>
    }
])

export default router