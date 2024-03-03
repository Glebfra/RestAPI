import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import Menu from "../Menu/Menu";
import {Navigate} from "react-router-dom";
import account_avatar from "../../assets/account_avatar.svg"

function Account() {
    const [account, setAccount] = useState({})
    const [isLogged, setIsLogged] = useState(true)
    const [username, setUsername] = useState(account.username)
    const [email, setEmail] = useState(account.email)
    const [firstName, setFirstName] = useState(account.first_name)
    const [lastName, setLastName] = useState(account.last_name)

    const onSaveAccount = () => {
        axios.patch(
            `/auth/account/`,
            {
                username: username,
                email: email,
                first_name: firstName,
                last_name: lastName
            }
        ).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        axios.get('/auth/account/')
            .then(response => {
                setAccount(response.data)
            }).catch(error => {
            if (error.response.status === 401) {
                setIsLogged(false)
            }
        })
    }, [setAccount, setIsLogged])

    if (!isLogged) {
        return <Navigate to={'/login'} replace/>
    }

    return (
        <Container>
            <header>
                <Menu/>
            </header>
            <div className='d-flex justify-content-around'>
                <Card style={{width: "50rem", borderRadius: "2rem"}}>
                    <Card.Title className='d-flex mx-4 mt-3'><h4><b>Account</b></h4></Card.Title>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Image className='mx-2' roundedCircle src={axios.defaults.baseURL + account.avatar} alt='Account' height={96}
                                       width={96}/>
                                <Button variant='outline-primary' className='me-3'>Change</Button>
                                <Button variant='outline-secondary' className='me-3'>Remove</Button>
                            </Col>
                        </Row>
                        <hr className='mx-2 my-4'/>
                        <Row>
                            <Col>
                                <Form.Group className='mx-2'>
                                    <Form.Label><b>Username</b></Form.Label>
                                    <Form.Control type='text' defaultValue={account.username}
                                                  onChange={e => setUsername(e.target.value)}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className='mx-2'>
                                    <Form.Label><b>Email</b></Form.Label>
                                    <Form.Control type='email' defaultValue={account.email}
                                                  onChange={e => setEmail(e.target.value)}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <hr className='mx-2 my-4'/>
                        <Row>
                            <Col>
                                <Form.Group className='mx-2'>
                                    <Form.Label><b>First Name</b></Form.Label>
                                    <Form.Control type='text' defaultValue={account.first_name}
                                                  onChange={e => setFirstName(e.target.value)}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className='mx-2'>
                                    <Form.Label><b>Last Name</b></Form.Label>
                                    <Form.Control type='text' defaultValue={account.last_name}
                                                  onChange={e => setLastName(e.target.value)}/>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Card.Body>
                    <hr className='mx-4 mb-4'/>
                    <div className='d-flex flex-row-reverse mb-4'>
                        <Button className='me-5 px-4 py-2' variant='primary' onClick={onSaveAccount}><b>Save changes</b></Button>
                    </div>
                </Card>
            </div>
        </Container>
    )
}

export default Account