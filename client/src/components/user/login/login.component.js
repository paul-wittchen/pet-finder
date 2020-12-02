import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import './login.scss';
import cat from '../../../assets/images/signup.svg';
import backendDomain from '../../../utility'

export default class Login extends Component {
    constructor() {
        super()

        this.state = {
            email: '',
            password: '',
            errorMsg: ''
        }
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault()

        if (this.state.email && this.state.password) {
            const user = {
                email: this.state.email,
                password: this.state.password
            }
    
            axios
                .post(`${backendDomain}/login`, user)
                .then((res) => {
                    if (res.data.status) {
                        Cookies.set('token', res.data.token)
                    }
                    window.location = '/profile'
                })
        } else {
            this.setState({ errorMsg: 'Your e-mail or password is incorrect'})
        }
    }

    render() {
        return(
            <div className='login__container'>
                <Row className='main__container__signup justify-content-center text-center'>
                    <Col className='signup__container__left' lg={4} md={12} xs={12}>
                        <p className='login__header'>Login</p>
                        <p className='login__subheader'>Dont have an account yet? <a href="/signup">Sign up</a></p>
                        <Form onSubmit={this.onSubmit}>
                            <Form.Group controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                    type="email"
                                    name='email'
                                    placeholder='mike.lawrence@mail.com'
                                    value={this.state.email}
                                    onChange={this.onChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="password"
                                    name='password'
                                    placeholder='*********'
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                            <br/>
                            <span className='login__errorMsg'>{this.state.errorMsg}</span>
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