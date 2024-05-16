import {Button, FloatingLabel, Form} from "react-bootstrap";
import React, {useState} from "react";
import {Navigate} from "react-router-dom";

function MenuSearch() {
    const queryParams = new URLSearchParams(window.location.search)

    const [data, setData] = useState(queryParams.get('word'))
    const [search, setSearch] = useState(false)

    const handleSearch = () => {
        setSearch(true)
    }

    const handleChange = ({currentTarget: input}) => {
        setData(input.value)
    }

    return (
        <div>
            {search ? <Navigate to={`?word=${data}`} replace/> : <></>}
            <Form className="d-flex">
                <FloatingLabel label="Search words" className="me-2" controlId="floatingInput">
                    <Form.Control
                        type="search"
                        name="search"
                        placeholder="Search words"
                        value={data}
                        onChange={e => handleChange(e)}
                    />
                </FloatingLabel>
                <Button variant="outline-success" onClick={handleSearch}>Search</Button>
            </Form>
        </div>
    )
}

export default MenuSearch