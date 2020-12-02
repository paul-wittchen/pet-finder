import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './phoneModal.scss';

export default class PhoneModal extends Component {

    render() {
        return(
            <Modal show={this.props.open} onHide={this.props.closeModalPhone}>
                <Modal.Body>
                    <Modal.Title>
                        You found {this.props.petName} or got usefull informations?
                    </Modal.Title>
                    <a href={'tel:' + this.props.phone}><i className="fas fa-phone-alt"></i> {this.props.phone}</a>
                    <br/>
                    <Button variant="primary" onClick={this.props.closeModalPhone}>
                        Close
                    </Button>
                </Modal.Body>
            </Modal>
        )
    }
}