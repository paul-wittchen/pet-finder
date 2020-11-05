import React, { Component } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import '../../styles/msgModal.scss'

export default class MessageModal extends Component {

    render() {
        return(
            <Modal show={this.props.open} onHide={this.props.closeModalMsg}>
                <Modal.Body>
                    <Modal.Title>
                        You found {this.props.petName} or got usefull informations?
                    </Modal.Title>
                    <Form className='modal__msg__form'>
                        <Row>
                            <Col>
                                <Form.Group controlId="Name">
                                    <Form.Label>Your Name</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter your Name" 
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="Email">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        placeholder="Enter email" 
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Send a message</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={4}
                                placeholder='Type in a message'
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Send
                        </Button>
                        <Button variant="primary" onClick={this.props.closeModalMsg}>
                            Close
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}
