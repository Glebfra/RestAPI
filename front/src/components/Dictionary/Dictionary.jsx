import React, {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import Menu from "../Menu/Menu";
import WordCard from "./WordCard";
import axios from "axios";

function Dictionary() {
    const [cardsData, setCardsData] = useState([]);

    useEffect(() => {
        axios.get(
            'http://localhost:8000/dictionary/words?language=3'
        ).then(response => {
            setCardsData(response.data.results);
        })
    }, [setCardsData]);

    return (
        <Container>
            <header>
                <Menu searchable searchText='Word'/>
            </header>
            <div
                className='d-grid'
                style={{gridTemplateColumns: 'repeat(4, 1fr)', justifyItems: 'center'}}
            >
                {cardsData.map(item => (
                    <WordCard data={item}/>
                ))}
            </div>
        </Container>
    )
}

export default Dictionary;
