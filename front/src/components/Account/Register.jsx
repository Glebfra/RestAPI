import React, {useState} from "react";
import {Alert, Button, Card, Col, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import Menu from "../Menu/Menu";
import axios from "axios";
import {Navigate} from "react-router-dom";

function Register() {
    const [data, setData] = useState({})
    const [isError, setIsError] = useState(false)
    const [isRegistered, setIsRegistered] = useState(false)

    const handleChange = ({currentTarget: input}) => {
        let newData = {...data}
        newData[input.name] = input.value
        setData(newData)
    }

    const handleRegister = () => {
        axios.post(
            '/auth/register/',
            data
        ).then(() => {
            setIsRegistered(true)
        }).catch(() => {
            setIsError(true)
        })
    }

    if (isRegistered) {
        return <Navigate to={'/login'} replace/>
    }

    return (
        <Container>
            <header>
                <Menu/>
            </header>
            <div className='d-flex justify-content-around text-center'>
                <Card style={{width: '32rem'}} border='secondary' className='mt-5'>
                    <Card.Title className='mt-4'>Register</Card.Title>
                    <Card.Text className='mt-4'>
                        <Form>
                            <FloatingLabel
                                controlId='floatingInput'
                                label='Username'
                                className='mb-3 mx-5'
                            >
                                <Form.Control
                                    type='text'
                                    name='username'
                                    onChange={e => handleChange(e)}
                                    placeholder='Username'
                                />
                            </FloatingLabel>
                            <FloatingLabel
                                controlId='floatingInput'
                                label='Email address'
                                className="mb-3 mx-5"
                            >
                                <Form.Control
                                    type='email'
                                    name='email'
                                    onChange={e => handleChange(e)}
                                    placeholder='name@example.com'
                                />
                            </FloatingLabel>
                            <FloatingLabel
                                controlId='floatingInput'
                                label='Password'
                                className='mb-3 mx-5'
                            >
                                <Form.Control
                                    type='password'
                                    name='password'
                                    onChange={e => handleChange(e)}
                                    placeholder='password'
                                />
                            </FloatingLabel>
                            <Row>
                                <Col>
                                    <FloatingLabel
                                        controlId='floatingInput'
                                        label='First name'
                                        className='mb-3 ms-5'
                                    >
                                        <Form.Control
                                            type='text'
                                            name='first_name'
                                            onChange={e => handleChange(e)}
                                            placeholder='FirstName'
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col>
                                    <FloatingLabel
                                        controlId='floatingInput'
                                        label='Last Name'
                                        className='mb-3 me-5'
                                    >
                                        <Form.Control
                                            type='text'
                                            name='last_name'
                                            onChange={e => handleChange(e)}
                                            placeholder='LastName'
                                        />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <div className='d-flex justify-content-around mb-4'>
                                <Button className='px-4 py-2' variant='primary' onClick={handleRegister}>
                                    <b>Register</b>
                                </Button>
                            </div>
                        </Form>
                    </Card.Text>
                    {isError ? (
                        <Alert variant='danger' dismissible onClose={() => setIsError(false)}>
                            <Alert.Heading>Ошибка регистрации</Alert.Heading>
                            <p>
                                Обратитесь за помощью к администратору сайта
                            </p>
                        </Alert>
                    ) : (<> </>)}
                </Card>
            </div>
        </Container>
    )
}

export default Register