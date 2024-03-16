import React from "react";
import {Card, Container, Table} from "react-bootstrap";
import Menu from "../Menu/Menu";

// TODO Create the dictionary page with possibility to add new word to user account
function Dictionary() {
    const words = ['a', 'i', 'u', 'e', 'o']
    const wordsBody = [
        ['あ', 'い', 'う', 'え', 'お'],
        ['か', 'き', 'く', 'け', 'こ'],
        ['さ', 'し', 'す', 'せ', 'そ'],
        ['た', 'ち', 'つ', 'て', 'と'],
        ['な', 'に', 'ぬ', 'ね', 'の'],
        ['は', 'ひ', 'ふ', 'へ', 'ほ'],
        ['ま', 'み', 'む', 'め', 'も'],
        ['や', '', 'ゆ', '', 'よ'],
    ]

    return (
        <Container>
            <header>
                <Menu/>
            </header>
            <Card>
                <Card.Body>
                    <Card.Header as='h4'>Hiragana</Card.Header>
                    <Card.Text className='mt-4'>
                        <Table striped bordered hover size="sm">
                            <thead>
                            <tr>
                                {words.map(item => (
                                    <th>
                                        <td><font face="Arial" size={4}>{item}</font></td>
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {wordsBody.map(item => (
                                <tr>
                                    {item.map(word => (
                                        <td><font face='Hina Mincho'　size={5}>{word}</font></td>
                                    ))}
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Dictionary;