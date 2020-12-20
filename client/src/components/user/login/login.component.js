import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import './login.scss';
import cat from '../../../assets/images/signup.svg';
import backendDomain from '../../../utility'

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const onSubmit = (event) => {
        event.preventDefault()

        if (email && password) {
            const user = {
                email: email,
                password: password
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
            setErrorMsg('Your e-mail or password is incorrect')
        }
    }

    return(
        <div className='login__container'>
            <Row className='main__container__signup justify-content-center text-center'>
                <Col className='signup__container__left' lg={4} md={12} xs={12}>
                    <p className='login__header'>Login</p>
                    <p className='login__subheader'>Dont have an account yet? <a href="/signup">Sign up</a></p>
                    <Form onSubmit={onSubmit}>
                        <Form.Group controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                                type="email"
                                name='email'
                                placeholder='mike.lawrence@mail.com'
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password"
                                name='password'
                                placeholder='*********'
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                        <br/>
                        <span className='login__errorMsg'>{errorMsg}</span>
                    </Form>
                </Col>
                <Col className='signup__container__right' lg={4}>
                    <img src={cat} alt="signup_picture"/>
                </Col>
            </Row>
        </div>
    )
}

export default Login;