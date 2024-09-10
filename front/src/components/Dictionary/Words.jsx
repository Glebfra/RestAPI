import React, {useEffect, useState} from "react";
import axios from "axios";
import {Container} from "react-bootstrap";
import Menu from "../Menu/Menu";
import WordsMenu from "./WordsMenu";

function Words() {
    const [data, setData] = useState({results: []});
    const [languages, setLanguages] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState(1);

    useEffect(() => {
        axios.get(`/dictionary/words/?language=${selectedLanguage}`)
            .then(response => {
                setData(response.data);
            })
    }, [setData, selectedLanguage]);

    useEffect(() => {
        axios.get(`/dictionary/languages/`)
            .then(response => {
                setLanguages(response.data);
            })
    }, [setLanguages]);

    return (
        <Container>
            <header>
                <Menu searchable searchText='Word'/>
            </header>
            <div>
                <WordsMenu
                    languages={languages}
                    selectedLanguage={selectedLanguage}
                    setSelectedLanguage={setSelectedLanguage}
                />
            </div>
        </Container>
    )
}

export default Words