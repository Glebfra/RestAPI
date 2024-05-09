import {Button, FloatingLabel, Form, Modal, ModalBody, ModalHeader} from "react-bootstrap";
import React from "react";

function AddWordModal({showAddWordModal, setShowAddWordModal, languages}) {
    const handleCloseAddWordDialog = () => {
        setShowAddWordModal(false)
    }

    return (
        <Modal show={showAddWordModal} onHide={handleCloseAddWordDialog}>
            <ModalHeader closeButton>Add Word</ModalHeader>
            <ModalBody>
                <Form>
                    <FloatingLabel controlId='floatingInput' label='Word'>
                        <Form.Control type='textarea' name='Word' placeholder='Word'/>
                    </FloatingLabel>
                    <Form.Select aria-label='Choose language' className='my-3'>
                        <option>Select language</option>
                        {languages.map((item, index) => (
                            <option id={index}>{item}</option>
                        ))}
                    </Form.Select>
                    <div className='d-flex flex-row-reverse'>
                        <Button variant='success'>
                            <font class='p-2' face='Calibri' size={4}>Add word</font>
                        </Button>
                    </div>
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default AddWordModal