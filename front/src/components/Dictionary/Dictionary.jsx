import React, {useEffect, useState} from "react";
import {Button, Container} from "react-bootstrap";
import Menu from "../Menu/Menu";
import axios from "axios";
import AddWordModal from "./AddWordModal";
import WordModal from "./WordModal";

// TODO Create the dictionary page with possibility to add new word to user account
function Dictionary() {
    const wordsStateEnum = {ALL: 'all', ACCOUNT: 'account'}

    const [data, setData] = useState({
        count: 0,
        next: null,
        previous: null,
        results: []
    })
    const [languages, setLanguages] = useState([])
    const [wordsState, setWordsState] = useState(wordsStateEnum.ALL)
    const [showModal, setShowModal] = useState(false)
    const [showAddWordModal, setShowAddWordModal] = useState(false)
    const [modalData, setModalData] = useState({
        id: 0,
        word: '',
        translations: [],
        translations_details: [],
        language: 1
    })

    const getData = (url = 'dictionary/words/') => {
        axios.get(
            url
        ).then(response => {
            setData(response.data)
        })
    }
    const getLanguages = (url = 'dictionary/languages/') => {
        axios.get(
            url
        ).then(response => {
            const data = []
            response.data.results.map(item => {
                data[item.id] = item.name
            })
            setLanguages(data)
        })
    }

    useEffect(() => getData(), [setData])
    useEffect(() => getLanguages(), [setLanguages])

    const getAccountWordsHandler = () => {
        getData('dictionary/account/words/')
        setWordsState(wordsStateEnum.ACCOUNT)
    }

    const getAllWordsHandler = () => {
        getData('dictionary/words/')
        setWordsState(wordsStateEnum.ALL)
    }

    const handleModalDialog = ({currentTarget: obj = null}) => {
        setShowModal(!showModal)
        setModalData(data.results[obj.id])
    }

    const handleAddWordDialog = () => {
        setShowAddWordModal(!showAddWordModal)
    }

    return (
        <Container>
            <header>
                <Menu/>
            </header>
            <div className='main-container'>
                <WordModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    modalData={modalData}
                    languages={languages}
                />
                <AddWordModal
                    showAddWordModal={showAddWordModal}
                    setShowAddWordModal={setShowAddWordModal}
                    languages={languages}
                />
                <div className='main-container-item menu-list'>
                    <Button
                        className='menu-list-button'
                        variant={wordsState === wordsStateEnum.ALL ? 'success' : 'outline-success'}
                        onClick={getAllWordsHandler}
                    >
                        <font face='Calibri' size={4}>All words</font>
                    </Button>
                    <Button
                        className='menu-list-button'
                        variant={wordsState === wordsStateEnum.ACCOUNT ? 'success' : 'outline-success'}
                        onClick={getAccountWordsHandler}
                        disabled={!localStorage.getItem('access')}
                    >
                        <font face='Calibri' size={4}>Your words</font>
                    </Button>
                </div>
                <div className='main-container-item words-grid-container'>
                    {data.results.map((item, index) => (
                        <div id={index} className='words-grid-item' onClick={handleModalDialog}>
                            <font face='Calibri' size={5}>{item.word}</font>
                        </div>
                    ))}
                    <Button variant='outline-success' className='words-grid-container' onClick={handleAddWordDialog}>
                        <font face='Calibri' size={4}>Add word</font>
                    </Button>
                </div>
            </div>
            <footer>
                <div className='page-selection'>
                    <Button
                        className='page-selection-item'
                        variant='outline-success'
                        disabled={data.previous === null}
                    >Previous</Button>
                    <Button
                        className='page-selection-item'
                        variant='outline-success'
                        disabled={data.next === null}
                    >Next</Button>
                </div>
            </footer>
        </Container>
    )
}

export default Dictionary;