import React, {useEffect, useState} from "react";
import {Button, Container} from "react-bootstrap";
import Menu from "../Menu/Menu";
import axios from "axios";
import Words from "./Words";

function Dictionary() {
    const wordsStateEnum = {ALL: 'all', ACCOUNT: 'account'}
    const [wordsState, setWordsState] = useState(wordsStateEnum.ALL)

    const [languages, setLanguages] = useState([])
    const [selectedLanguage, setSelectedLanguage] = useState(0)

    useEffect(() => {
        axios.get(
            'dictionary/languages/'
        ).then(response => {
            setLanguages(response.data)
        })
    }, [setLanguages])

    const handleChangeLanguage = ({currentTarget: obj}) => {
        setSelectedLanguage(languages[obj.id]['id'] === selectedLanguage ? 0 : languages[obj.id]['id'])
    }

    const handleAccountWords = () => {
        setWordsState(wordsStateEnum.ACCOUNT)
    }

    const handleAllWords = () => {
        setWordsState(wordsStateEnum.ALL)
    }

    return (
        <Container>
            <header>
                <Menu searchable searchText='Search words'/>
            </header>
            <div className='main-container'>
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
                <Words languages={languages} selectedLanguage={selectedLanguage}/>
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
        </Container>
    )
}

export default Dictionary