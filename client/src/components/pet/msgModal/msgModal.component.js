import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './msgModal.scss'

const MessageModal = (props) => {

    return(
        <Modal show={props.open} onHide={props.closeModalMsg}>
            <Modal.Body>
                <Modal.Title>
                    You found {props.petName} or got usefull informations?
                </Modal.Title>
                <a href={`mailto:${props.mail}?subject=Informations%20about%20${props.petName}`}><i className="fas fa-envelope"></i> {props.mail}</a>
                <br/>
                <Button variant="primary" onClick={props.closeModalMsg}>
                    Close
                </Button>
            </Modal.Body>
        </Modal>
    )
}

export default MessageModal;
