import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';

export default class Login extends Component {
    constructor() {
        super()

        this.state = {
            email: '',
            password: ''
        }
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault()

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        axios
            .post('http://localhost:8000/login', user)
            .then((res) => {
                if (res.data.status) {
                    Cookies.set('token', res.data.token)
                }
                window.location = '/profile'
            })
    }

    render() {
        return(
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email"
                        name='email'
                        value={this.state.email}
                        onChange={this.onChange}
                    />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password"
                        name='password'
                        value={this.state.password}
                        onChange={this.onChange}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        )
    }
}