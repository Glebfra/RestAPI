import React from "react";
import {Navigate} from "react-router-dom";

function SearchWords() {
    return (
        <Navigate to={`dictionary/?word=${word}`} replace/>
    )
}

export default SearchWords