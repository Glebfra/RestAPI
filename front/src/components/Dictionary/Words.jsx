import React, {useEffect, useState} from "react";
import axios from "axios";
import {Container, Table} from "react-bootstrap";
import Menu from "../Menu/Menu";

function Words() {
    const [words, setWords] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/dictionary/words/?format=json")
            .then(response => {
                setWords(response.data);
            })
    }, [setWords]);

    const tableBody = (item, index) => {
        const color = item.count < 5 ? "#b72000" : "#007b28";

        return (
            <tr>
                <td><font face="Arial" color={color} size={5}>{index + 1}</font></td>
                <td><font face="Arial" color={color} size={5}>{item.russian}</font></td>
                <td><font face="Hina Mincho" color={color} size={5}>{item.japanese}</font></td>
            </tr>
        );
    };

    return (
        <Container>
            <header>
                <Menu/>
            </header>
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>
                        <td><font face="Arial" size={5}>#</font></td>
                    </th>
                    <th>
                        <td><font face="Arial" size={5}>Russian</font></td>
                    </th>
                    <th>
                        <td><font face="Arial" size={5}>Japanese</font></td>
                    </th>
                </tr>
                </thead>
                <tbody>
                {words.map((item, index) => tableBody(item, index))}
                </tbody>
            </Table>
        </Container>
    );
}

export default Words;