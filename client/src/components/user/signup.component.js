import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default class Signup extends Component {
    constructor() {
        super()

        this.state = {
            loading: true,
            firstname: '',
            lastname: '',
            email: '',
            password: ''
        }
    }

    onChangeValue = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();

        const user = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password
        }

        axios
            .post('/signup', user)
            .then((res) => (window.location = '/profile'))
            .catch((err) => console.error(err))
    }

    render() {
        return(
            <div className='container text-center'>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Firstname</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter Firstname"
                            name="firstname"
                            value={this.state.firstname}
                            onChange={this.onChangeValue}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Lastname</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter Lastname"
                            name="lastname"
                            value={this.state.lastname}
                            onChange={this.onChangeValue}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter Email"
                            name="email"
                            value={this.state.email}
                            onChange={this.onChangeValue}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Enter Password"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChangeValue}
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