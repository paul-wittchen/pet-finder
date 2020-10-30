import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import '../../styles/signup.scss';
import dog from '../../images/signup.png';

export default class Signup extends Component {
    constructor() {
        super()

        this.state = {
            firstname: '',
            lastname: '',
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
        event.preventDefault();

        const user = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password
        }

        axios
            .post('http://localhost:8000/signup', user)
            .then((res) => window.location = res.data.url)
    }

    render() {
        return(
            <Row className='main__container__signup text-center'>
                <Col className='signup__container__left'>
                    <p className='signup__header'>Create Account</p>
                    <p className='signup__subheader'>Already have an account? <a href="/login">Sign in</a></p>
                    <Form onSubmit={this.onSubmit}>
                        <Row>
                            <Col>
                            <Form.Group controlId="firstname">
                            <Form.Label>Firstname</Form.Label>
                            <Form.Control 
                                type="text"
                                name='firstname'
                                value={this.state.firstname}
                                onChange={this.onChange}
                            />
                        </Form.Group>
                            </Col>
                            <Col>
                            <Form.Group controlId="lastname">
                            <Form.Label>Lastname</Form.Label>
                            <Form.Control 
                                type="text" 
                                name='lastname'
                                value={this.state.lastname}
                                onChange={this.onChange}
                            />
                        </Form.Group>
                            </Col>
                        </Row>    
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
                            <Form.Check type="checkbox" label="I agree to the Terms of Service and Privacy Policy" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Sign up
                        </Button>
                    </Form>
                </Col>
                <Col className='signup__container__right'>
                    <img src={dog} alt="signup_picture"/>
                </Col>
            </Row>
        )
    }
}