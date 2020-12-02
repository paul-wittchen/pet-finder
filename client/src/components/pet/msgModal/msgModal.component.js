import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './msgModal.scss'

export default class MessageModal extends Component {

    render() {
        return(
            <Modal show={this.props.open} onHide={this.props.closeModalMsg}>
                <Modal.Body>
                    <Modal.Title>
                        You found {this.props.petName} or got usefull informations?
                    </Modal.Title>
                    <a href={'mailto:' + this.props.mail}><i className="fas fa-envelope"></i> {this.props.mail}</a>
                    <br/>
                    <Button variant="primary" onClick={this.props.closeModalMsg}>
                        Close
                    </Button>
                </Modal.Body>
            </Modal>
        )
    }
}
