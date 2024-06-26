import React, {useState} from "react";
import {Alert, Button, Card, Container, FloatingLabel, Form} from "react-bootstrap";
import Menu from "../Menu/Menu";
import axios from "axios";
import {Navigate} from "react-router-dom";


function Login() {
    const [data, setData] = useState({})
    const [isError, setIsError] = useState(false)

    const handleChange = ({currentTarget: input}) => {
        let newData = {...data}
        newData[input.name] = input.value
        setData(newData)
    }

    const login = (props) => {
        console.log(props)
        axios.post(
            '/auth/token/',
            data
        ).then(response => {
            localStorage.setItem('access', response.data.access)
            localStorage.setItem('refresh', response.data.refresh)
        }).catch(error => {
            setIsError(true)
        }).finally(() => (
            <Navigate to={'/account'} replace/>
        ))
    }

    return (
        <Container>
            <header>
                <Menu/>
            </header>
            <div className="justify-content-center text-center d-flex">
                <Card style={{width: "32rem"}} border="secondary" className="mt-5">
                    <Card.Title className="mt-4">Login</Card.Title>
                    <Card.Text className="mt-4">
                        <Form>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email address"
                                className="mb-3 mx-5"
                            >
                                <Form.Control
                                    type="email"
                                    onChange={e => handleChange(e)}
                                    name='email'
                                    placeholder="name@example.com"
                                />
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="floatingPassword"
                                label="Password"
                                className="mb-3 mx-5"
                            >
                                <Form.Control
                                    type="password"
                                    onChange={e => handleChange(e)}
                                    name='password'
                                    placeholder="Password"
                                />
                            </FloatingLabel>
                            <Button className="pb-2 mb-4" variant="outline-primary" onClick={login}>Log in</Button>
                        </Form>
                    </Card.Text>
                    {isError ? (
                        <Alert variant='danger' dismissible onClose={() => setIsError(false)}>
                            <Alert.Heading>Ошибка входа</Alert.Heading>
                            <p>
                                Похоже email или пароль неверны
                            </p>
                        </Alert>
                    ) : (<> </>)}
                </Card>
            </div>
        </Container>
    )
}

export default Login