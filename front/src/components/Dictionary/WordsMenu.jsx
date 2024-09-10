import React from "react";
import {Button, Dropdown} from "react-bootstrap";

function WordsMenu({languages, selectedLanguage, setSelectedLanguage}) {
    return (
        <div className='d-flex flex-column'>
            <Dropdown drop='end' autoClose='outside'>
                <Dropdown.Toggle className='p-3' variant='success'
                                 id='dropdown-autoclose-outside'>Language</Dropdown.Toggle>
                <Dropdown.Menu className='mx-2'>
                    {languages.map(item => (
                        <Dropdown.Item
                            onClick={event => {
                                setSelectedLanguage(event.target.id)
                            }}
                        >
                            {item.name}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default WordsMenu