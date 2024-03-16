import React from "react"
import {Button, FloatingLabel, Form, Nav, Navbar} from "react-bootstrap"
import account_avatar from "../../assets/account_avatar.svg"
import book_icon from "../../assets/book_icon.svg"
import science_icon from "../../assets/science_icon.svg"


const MenuSearch = (
    <Form className="d-flex">
        <FloatingLabel label="Search words" className="me-2" controlId="floatingInput">
            <Form.Control
                type="search"
                name="search"
                placeholder="Search words"
            />
        </FloatingLabel>
        <Button variant="outline-success">Search</Button>
    </Form>
)


function Menu() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary py-3" sticky="top">
            <Navbar.Brand href="/">Rest API</Navbar.Brand>
            <div className='vr'/>
            <Navbar.Collapse>
                <Nav className="me-auto align-items-center">
                    <img alt="book_icon" src={book_icon} height={24} width={24} className="ms-4"/>
                    <Nav.Link href="/dictionary">Dictionary</Nav.Link>
                    <img alt="book_icon" src={science_icon} height={24} width={24} className="ms-2"/>
                    <Nav.Link href="/science">Science</Nav.Link>
                    <img alt="account_icon" src={account_avatar} height={24} width={24} className="ms-2"/>
                    <Nav.Link href="/account">Account</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
                {MenuSearch}
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Menu