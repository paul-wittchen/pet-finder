import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './signup.scss';
import cat from '../../../assets/images/signup.svg';
import backendDomain from '../../../utility'

export default class Signup extends Component {
    constructor() {
        super()

        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            firstnameError: '',
            lastnameError: '',
            emailError: '',
            passwordError: ''
        }
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();

        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

        if (this.state.firstname === '') {
            this.setState({ firstnameError: 'Please enter your firstname'})
        } else if (this.state.lastname === ''){
            this.setState({ lastnameError: 'Please enter your lastname'})
        } else if (this.state.email === '' || !this.state.email.match(emailRegex)){
            this.setState({ emailError: 'Please enter a valid email'})
        } else if (this.state.password === '' || this.state.password.length <= 6){
            this.setState({ passwordError: 'Please enter your password'})
        } else {
            const user = {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
                password: this.state.password
            }
            axios
            .post(`${backendDomain}/signup`, user)
            .then((res) => (window.location = res.data.url));
        }
    }

    render() {
        return(
            <div>
                <Row className='main__container__signup justify-content-center text-center'>
                    <Col className='signup__container__left' lg={4}>
                        <p className='signup__header'>Create Account</p>
                        <p className='signup__subheader'>Already have an account? <a className='signup__login__link' href="/login">Sign in</a></p>
                        <Form onSubmit={this.onSubmit}>
                            <Row>
                                <Col>
                                <Form.Group controlId="firstname">
                                <Form.Label>Firstname *</Form.Label>
                                <Form.Control 
                                    type="text"
                                    name='firstname'
                                    placeholder='Mike'
                                    value={this.state.firstname}
                                    onChange={this.onChange}
                                />
                                <span className='signup__error__msg'>{this.state.firstnameError}</span>
                            </Form.Group>
                                </Col>
                                <Col>
                                <Form.Group controlId="lastname">
                                <Form.Label>Lastname *</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name='lastname'
                                    placeholder='Lawrence'
                                    value={this.state.lastname}
                                    onChange={this.onChange}
                                />
                                <span className='signup__error__msg'>{this.state.lastnameError}</span>
                            </Form.Group>
                                </Col>
                            </Row>    
                            <Form.Group controlId="email">
                                <Form.Label>Email address *</Form.Label>
                                <Form.Control 
                                    type="email"
                                    name='email'
                                    placeholder='mike.lawrence@mail.com'
                                    value={this.state.email}
                                    onChange={this.onChange}
                                />
                                <span className='signup__error__msg'>{this.state.emailError}</span>
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password *</Form.Label>
                                <Form.Control 
                                    type="password"
                                    name='password'
                                    placeholder='*********'
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />
                                <span className='signup__error__msg'>{this.state.passwordError}</span>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Sign up
                            </Button>
                        </Form>
                    </Col>
                    <Col className='signup__container__right' lg={4}>
                        <img src={cat} alt="signup_picture"/>
                    </Col>
                </Row>
            </div>
        )
    }
}