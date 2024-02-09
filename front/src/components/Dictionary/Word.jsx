import React, {useEffect, useState} from "react";
import axios from "axios";
import {Container, Table} from "react-bootstrap";

function Word() {
    const [resp, setResp] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/dictionary/words/?format=json")
            .then(response => {
                setResp(response.data);
            })
    }, [setResp]);

    const tableHead = (
        <tr>
            <th>#</th>
            <th>Russian</th>
            <th>Japanese</th>
        </tr>
    );

    const tableBody = (item) => (
        <tr>
            <td>{item.id}</td>
            <td>{item.russian}</td>
            <td><font face="Hina Mincho">{item.japanese}</font></td>
        </tr>
    );

    return (
        <Container>
            <Table striped bordered hover size="sm">
                <thead>
                {tableHead}
                </thead>
                <tbody>
                {resp.map(item => tableBody(item))}
                </tbody>
            </Table>
        </Container>
    );
}

export default Word;