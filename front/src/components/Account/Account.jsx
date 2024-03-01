import React, {useEffect, useState} from "react";
import axios from "axios";
import {Container} from "react-bootstrap";
import Menu from "../Menu/Menu";
import {Navigate} from "react-router-dom";

function Account() {
    const [account, setAccount] = useState({})
    const [isLogged, setIsLogged] = useState(true)

    useEffect(() => {
        axios.get('http://api.localhost/auth/account')
            .then(response => {
                setAccount(response.data[0])
            }).catch(error => {
                if (error.response.status === 401) {
                    setIsLogged(false)
                }
            })
    }, [setAccount, setIsLogged])

    if (!isLogged) {
        return <Navigate to={'/login'} replace />
    }

    return (
        <Container>
            <header>
                <Menu/>
            </header>
        </Container>
    )
}

export default Account