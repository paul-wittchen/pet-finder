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
            password: '',
            isChecked: false
        }
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    termsCheckChange = () => {
        this.setState(prevState => {
            return {
                isChecked: !prevState.isChecked
            }
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

        if (this.state.isChecked) {
            axios
            .post('http://localhost:8000/signup', user)
            .then((res) => window.location = res.data.url)
        } else {
            alert('Please agree to our terms')
        }
    }

    render() {
        return(
            <div>
                <Row className='main__container__signup justify-content-center text-center'>
                    <Col className='signup__container__left' lg={4}>
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
                                <Form.Check 
                                    type="checkbox" 
                                    label="I agree to the Terms of Service and Privacy Policy"
                                    checked={this.state.isChecked}
                                    onChange={this.termsCheckChange}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Sign up
                            </Button>
                        </Form>
                    </Col>
                    <Col className='signup__container__right' lg={4}>
                        <img src={dog} alt="signup_picture"/>
                    </Col>
                </Row>
                <svg className='svg__left__signup' viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#E76F51" d="M50.2,-64.1C62.7,-60,68.9,-42.2,68.3,-26.3C67.8,-10.5,60.5,3.4,54.5,16.3C48.4,29.2,43.4,41.1,34.6,47.9C25.7,54.7,12.8,56.4,-2.7,60.1C-18.2,63.7,-36.4,69.4,-45.5,62.7C-54.6,56,-54.6,36.9,-57.2,20.5C-59.8,4.2,-65,-9.3,-63.3,-22.4C-61.6,-35.5,-52.9,-48.2,-41.2,-52.5C-29.5,-56.9,-14.7,-52.9,2.1,-55.8C18.8,-58.6,37.7,-68.2,50.2,-64.1Z" transform="translate(100 100)" />
                </svg>
            </div>
        )
    }
}