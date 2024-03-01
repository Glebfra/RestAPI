import React from "react";
import {Container} from "react-bootstrap";
import Menu from "./Menu/Menu";

function Main() {
    return (
        <Container>
            <header>
                <Menu/>
            </header>
        </Container>
    )
}

export default Main