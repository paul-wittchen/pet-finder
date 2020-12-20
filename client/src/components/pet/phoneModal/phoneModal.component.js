import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './phoneModal.scss';

const PhoneModal = (props) => {

    return(
        <Modal show={props.open} onHide={props.closeModalPhone}>
            <Modal.Body>
                <Modal.Title>
                    You found {props.petName} or got usefull informations?
                </Modal.Title>
                <a href={'tel:' + props.phone}><i className="fas fa-phone-alt"></i> {props.phone}</a>
                <br/>
                <Button variant="primary" onClick={props.closeModalPhone}>
                    Close
                </Button>
            </Modal.Body>
        </Modal>
    )
}

export default PhoneModal;