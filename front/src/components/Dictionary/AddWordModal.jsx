import {Button, FloatingLabel, Form, Modal, ModalBody, ModalHeader} from "react-bootstrap";
import React, {useState} from "react";
import axios from "axios";

function AddWordModal({showAddWordModal, setShowAddWordModal, languages}) {
    const [data, setData] = useState({})

    const handleChange = ({currentTarget: input}) => {
        let newData = {...data}
        newData[input.name] = input.value
        setData(newData)
    }

    const handleCloseDialog = () => {
        setShowAddWordModal(false)
    }

    const uploadData = () => {
        axios.post(
            'dictionary/account/words/',
            data
        ).catch(error => {
            console.log(error)
        }).finally(() => {
            handleCloseDialog()
        })
    }

    return (
        <Modal show={showAddWordModal} onHide={handleCloseDialog}>
            <ModalHeader closeButton>Add Word</ModalHeader>
            <ModalBody>
                <Form>
                    <FloatingLabel controlId='floatingInput' label='Word'>
                        <Form.Control type='textarea' name='word' placeholder='Word' onChange={e => handleChange(e)}/>
                    </FloatingLabel>
                    <Form.Select name='language' aria-label='Choose language' className='my-3'
                                 onChange={e => handleChange(e)}>
                        <option value='0' disabled>Select language</option>
                        {languages.map((item, index) => (
                            <option id={index.toString()} key={index} value={item.id}>{item.name}</option>
                        ))}
                    </Form.Select>
                    <div className='d-flex flex-row-reverse'>
                        <Button variant='success' onClick={uploadData}>
                            <font class='p-2' face='Calibri' size={4}>Add word</font>
                        </Button>
                    </div>
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default AddWordModal