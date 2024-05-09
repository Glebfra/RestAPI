import {Modal, ModalBody, ModalHeader} from "react-bootstrap";
import React from "react";

function WordModal({showModal, setShowModal, modalData, languages}) {
    const handleCloseModalDialog = () => {
        setShowModal(false)
    }

    return (
        <Modal show={showModal} onHide={handleCloseModalDialog}>
            <ModalHeader closeButton>{modalData.word}</ModalHeader>
            <ModalBody>
                {modalData.translations_details.map(item => (
                    <p>{languages[item.language]}: {item.word}</p>
                ))}
            </ModalBody>
        </Modal>
    )
}

export default WordModal