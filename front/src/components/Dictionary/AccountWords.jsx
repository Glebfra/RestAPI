import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Card, Container} from "react-bootstrap";
import Menu from "../Menu/Menu";

function AccountWords() {
    const [languages, setLanguages] = useState([])
    const [data, setData] = useState({
        count: 0,
        results: []
    })
    const [page, setPage] = useState(1)

    const getData = (url = 'dictionary/account/words/') => {
        axios.get(
            url
        ).then(response => {
            setData(response.data)
        })
    }

    const nextPageHandler = () => {
        getData(data.next)
        setPage(page + 1)
    }

    const previousPageHandler = () => {
        getData(data.previous)
        setPage(page - 1)
    }

    useEffect(() => getData(), [setData])
    useEffect(() => {
        axios.get(
            'dictionary/languages/'
        ).then(response => {
            setLanguages(response.data.results)
        })
    }, [setLanguages])

    return (
        <Container>
            <header>
                <Menu/>
            </header>
            <div className='words-flex-container'>
                <div className='words-flex-element words-menu'>
                    {languages.map(item => (
                        <div className='words-menu-item'>{item.name}</div>
                    ))}
                </div>
                <div className='words-flex-element words-main'>
                    {data.results.map(item => (
                        <Card className='words-main-item'>
                            <Card.Title>{item.word}</Card.Title>
                        </Card>
                    ))}
                </div>
            </div>
            <footer className='pages-container'>
                <div className='pages-container-item'>
                    <Button disabled={data.next === null} onClick={nextPageHandler}>&gt;</Button>
                </div>
                <div className='pages-container-item'>
                    <b>{page}</b>
                </div>
                <div className='pages-container-item'>
                    <Button disabled={data.previous === null} onClick={previousPageHandler}>&lt;</Button>
                </div>
            </footer>
        </Container>
    )
}

export default AccountWords