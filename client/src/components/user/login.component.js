import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../../styles/login.scss';
import dog from '../../images/signup.png';

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
            <div className='login__container justify-content-center text-center'>
                <Row className='main__container__signup justify-content-center text-center'>
                    <Col className='signup__container__left' lg={4}>
                        <p className='login__header'>Login</p>
                        <p className='login__subheader'>Good to see you again</p>
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
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                        </Form>
                    </Col>
                    <Col className='signup__container__right' lg={4}>
                        <img src={dog} alt="signup_picture"/>
                    </Col>
                </Row>
                <svg className='svg__left' viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#E76F51" d="M50.2,-64.1C62.7,-60,68.9,-42.2,68.3,-26.3C67.8,-10.5,60.5,3.4,54.5,16.3C48.4,29.2,43.4,41.1,34.6,47.9C25.7,54.7,12.8,56.4,-2.7,60.1C-18.2,63.7,-36.4,69.4,-45.5,62.7C-54.6,56,-54.6,36.9,-57.2,20.5C-59.8,4.2,-65,-9.3,-63.3,-22.4C-61.6,-35.5,-52.9,-48.2,-41.2,-52.5C-29.5,-56.9,-14.7,-52.9,2.1,-55.8C18.8,-58.6,37.7,-68.2,50.2,-64.1Z" transform="translate(100 100)" />
                </svg>
            </div>
        )
    }
}