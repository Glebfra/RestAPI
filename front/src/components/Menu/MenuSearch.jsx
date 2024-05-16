import {Button, FloatingLabel, Form} from "react-bootstrap";
import React, {useState} from "react";
import axios from "axios";

function MenuSearch() {
    const [data, setData] = useState(null)

    const handleSearch = () => {
        axios.get(
            `dictionary/words/?word=${data}`
        ).then(response => {
            console.log(response)
        })
    }

    const handleChange = ({currentTarget: input}) => {
        setData(input.value)
    }

    return (
        <Form className="d-flex">
            <FloatingLabel label="Search words" className="me-2" controlId="floatingInput">
                <Form.Control
                    type="search"
                    name="search"
                    placeholder="Search words"
                    onChange={e => handleChange(e)}
                />
            </FloatingLabel>
            <Button variant="outline-success" onClick={handleSearch}>Search</Button>
        </Form>
    )
}

export default MenuSearch