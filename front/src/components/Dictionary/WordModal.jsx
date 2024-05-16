import {Button, Col, Form, Modal, ModalBody, ModalHeader, Row} from "react-bootstrap";
import React, {useState} from "react";
import axios from "axios";
import add_icon from "../../assets/add_icon.svg"

function WordModal({showModal, setShowModal, modalData, setModalData, languages}) {
    const [isEditing, setIsEditing] = useState(false)

    const handleCloseModalDialog = () => {
        setShowModal(false)
        setIsEditing(false)
    }

    const handleIsEditing = () => {
        setIsEditing(!isEditing)
    }

    const handleChangeTranslations = ({currentTarget: obj}) => {
        modalData.translations_details[obj.id][obj.name] = obj.value
        setModalData(modalData => ({
            ...modalData,
            translations_details: [...modalData.translations_details]
        }))
    }

    const handleAddRow = () => {
        setModalData(modalData => ({
            ...modalData,
            translations_details: [...modalData.translations_details, {word: '', language: 0}]
        }))
    }

    const handleEdit = () => {
        const translations = modalData.translations_details.map(item => ({word: item.word, language: item.language}))
        axios.patch(
            `dictionary/account/words/${modalData.id}/`,
            {
                translations: translations
            }
        )
    }

    const handleDelete = () => {
        axios.delete(
            `dictionary/account/words/${modalData.id}/`
        ).finally(() => {
            handleCloseModalDialog()
        })
    }

    return (
        <Modal show={showModal} onHide={handleCloseModalDialog}>
            <ModalHeader closeButton>{modalData.word}</ModalHeader>
            <ModalBody>
                <Form>
                    {modalData.translations_details.map((item, index) => (
                        <Form.Group as={Row} className='my-3'>
                            <Col>
                                <Form.Select
                                    id={index.toString()} key={index}
                                    name='language'
                                    disabled={!isEditing}
                                    defaultValue={item.language}
                                    onChange={e => handleChangeTranslations(e)}
                                >
                                    <option value={0} disabled>Choose language</option>
                                    {languages.map(item => (
                                        <option value={item.id}>{item.name}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col sm={8}>
                                <Form.Control
                                    id={index.toString()} key={index}
                                    type='text' name='word'
                                    defaultValue={item.word}
                                    disabled={!isEditing}
                                    onChange={e => handleChangeTranslations(e)}
                                />
                            </Col>
                        </Form.Group>
                    ))}
                </Form>
                {isEditing ? (
                    <div className='d-flex flex-column'>
                        <div>
                            <img src={add_icon} height={32} width={32} className='mx-3 mb-3' onClick={handleAddRow}/>
                        </div>
                        <div className='flex-row'>
                            <Button variant='success' onClick={handleEdit}>Save</Button>
                            <Button variant='outline-success' className='mx-2' onClick={handleIsEditing}>Cancel</Button>
                        </div>
                    </div>

                ) : (
                    <div className='d-flex flex-row'>
                        <Button variant='success' onClick={handleIsEditing}>Edit</Button>
                        <Button variant='danger' className='mx-2' onClick={handleDelete}>Delete</Button>
                    </div>
                )}
            </ModalBody>
        </Modal>
    )
}

export default WordModal