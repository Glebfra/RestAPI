import React, {useEffect, useState} from "react";
import {Button, Container} from "react-bootstrap";
import Menu from "../Menu/Menu";
import axios from "axios";
import AddWordModal from "./AddWordModal";
import WordModal from "./WordModal";

function Dictionary() {
    const queryParams = new URLSearchParams(window.location.search)

    const pageButtonsEnum = {NEXT: 'next', PREVIOUS: 'previous'}

    const [seed, setSeed] = useState(Math.random())

    const wordsStateEnum = {ALL: 'all', ACCOUNT: 'account'}
    const [wordsState, setWordsState] = useState(wordsStateEnum.ALL)

    const [languages, setLanguages] = useState([])
    const [selectedLanguage, setSelectedLanguage] = useState(0)

    const [showModal, setShowModal] = useState(false)
    const [showAddWordModal, setShowAddWordModal] = useState(false)

    const [limit, setLimit] = useState(30)
    const [offset, setOffset] = useState(0)

    const [data, setData] = useState({
        count: 0,
        next: null,
        previous: null,
        results: []
    })
    const [modalData, setModalData] = useState({
        id: 0,
        word: '',
        translations: [],
        translations_details: [],
        language: 1
    })

    useEffect(() => {
        axios.get(
            'dictionary/languages/'
        ).then(response => {
            setLanguages(response.data.results)
        })
    }, [setLanguages])

    useEffect(() => {
        const dataUrl = new URL('dictionary/words/', axios.defaults.baseURL)
        queryParams.forEach((item, index) => {
            dataUrl.searchParams.set(index, item)
        })
        if (wordsState === wordsStateEnum.ACCOUNT) {
            dataUrl.pathname = 'dictionary/account/words/'
        } else {
            dataUrl.pathname = 'dictionary/words/'
        }
        if (selectedLanguage === 0) {
            dataUrl.searchParams.delete('language')
        } else {
            dataUrl.searchParams.set('language', selectedLanguage.toString())
        }
        dataUrl.searchParams.set('offset', offset.toString())
        dataUrl.searchParams.set('limit', limit.toString())

        axios.get(
            dataUrl
        ).then(response => {
            setData(response.data)
        })
    }, [selectedLanguage, wordsState, offset, limit, setData, seed]);

    const updatePage = () => {
        setSeed(Math.random())
    }

    const handleChangeLanguage = ({currentTarget: obj}) => {
        setSelectedLanguage(languages[obj.id]['id'] === selectedLanguage ? 0 : languages[obj.id]['id'])
    }

    const handleAccountWords = () => {
        setWordsState(wordsStateEnum.ACCOUNT)
    }

    const handleAllWords = () => {
        setWordsState(wordsStateEnum.ALL)
    }

    const handleModalDialog = ({currentTarget: obj = null}) => {
        setShowModal(!showModal)
        setModalData(data.results[obj.id])
    }

    const handleAddWordDialog = () => {
        setShowAddWordModal(!showAddWordModal)
    }

    const handlePage = (type) => {
        setOffset(new URL(data[type]).searchParams.get('offset') ?? 0)
    }

    return (
        <Container>
            <header>
                <Menu searchable searchText='Search words'/>
            </header>
            <div className='main-container'>
                <WordModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    modalData={modalData}
                    setModalData={setModalData}
                    languages={languages}
                    updatePage={updatePage}
                />
                <AddWordModal
                    showAddWordModal={showAddWordModal}
                    setShowAddWordModal={setShowAddWordModal}
                    languages={languages}
                    updatePage={updatePage}
                />
                <div className='main-container-item menu-list'>
                    <Button
                        className='menu-list-button'
                        variant={wordsState === wordsStateEnum.ALL ? 'success' : 'outline-success'}
                        onClick={handleAllWords}
                    ><font face='Calibri' size={4}>All words</font></Button>
                    <Button
                        className='menu-list-button'
                        variant={wordsState === wordsStateEnum.ACCOUNT ? 'success' : 'outline-success'}
                        onClick={handleAccountWords}
                        disabled={localStorage.getItem('access') === null}
                    ><font face='Calibri' size={4}>Your words</font></Button>
                </div>
                <div className='main-container-item words-grid-container'>
                    {data.results.map((item, index) => (
                        <div
                            id={index.toString()}
                            key={index}
                            className='words-grid-item'
                            onClick={handleModalDialog}
                        >
                            <font face='Calibri' size={5}>{item.word}</font>
                        </div>
                    ))}
                    <Button
                        variant='outline-success'
                        className='words-grid-container words-grid-item'
                        onClick={handleAddWordDialog}
                        disabled={localStorage.getItem('access') === null}
                    ><font face='Calibri' size={4}>Add word</font></Button>
                </div>
                <div className='main-container-item menu-list ms-5'>
                    {languages.map((item, index) => (
                        <Button
                            id={index}
                            key={index}
                            className='menu-list-button'
                            variant={item.id === selectedLanguage ? 'success' : 'outline-success'}
                            onClick={e => handleChangeLanguage(e)}
                        ><font face='Calibri' size={4}>{item.name}</font></Button>
                    ))}
                </div>
            </div>
            <footer>
                <div className='page-selection'>
                    <Button
                        className='page-selection-item'
                        variant='outline-success'
                        onClick={() => handlePage(pageButtonsEnum.PREVIOUS)}
                        disabled={data.previous === null}
                    >Previous</Button>
                    <Button
                        className='page-selection-item'
                        variant='outline-success'
                        onClick={() => handlePage(pageButtonsEnum.NEXT)}
                        disabled={data.next === null}
                    >Next</Button>
                </div>
            </footer>
        </Container>
    )
}

export default Dictionary