import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

export default class Signup extends Component {
    constructor() {
        super()

        this.state = {
            loading: true,
            user: {}
        }
    }

    componentDidMount() {
        this.setState({

        })
    }

    render() {
        return(
            <div className='container text-center'>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Firstname</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter Firstname"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Lastname</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter Lastname"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter Email"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Enter Password"
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Signup
                    </Button>
                </Form>
                <p>Already a member?</p><a href="/login">Go to login</a>
            </div>
        )
    }
}