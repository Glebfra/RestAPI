import {Button, FloatingLabel, Form} from "react-bootstrap";
import React, {useState} from "react";

function MenuSearch({searchText: searchText}) {
    const queryParams = new URLSearchParams(window.location.search)

    const [data, setData] = useState(queryParams.get('word'))

    const handleChange = ({currentTarget: input}) => {
        setData(input.value)
    }

    return (
        <div>
            <Form className="d-flex">
                <FloatingLabel label={searchText} className="me-2" controlId="floatingInput">
                    <Form.Control
                        type="search"
                        name="word"
                        placeholder={searchText}
                        value={data}
                        onChange={e => handleChange(e)}
                    />
                </FloatingLabel>
                <Button variant="outline-success" type='submit'>Search</Button>
            </Form>
        </div>
    )
}

export default MenuSearch