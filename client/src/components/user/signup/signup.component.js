import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './signup.scss';
import cat from '../../../assets/images/signup.svg';
import backendDomain from '../../../utility'

const Signup = () => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstnameError, setFirstnameError] = useState('');
    const [lastnameError, setLastnameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();

        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

        if (firstname === '') {
            setFirstnameError('Please enter your firstname')
        } else if (lastname === ''){
            setLastnameError('Please enter your lastname')
        } else if (email === '' || !email.match(emailRegex)){
            setEmailError('Please enter a valid email')
        } else if (password === '' || password.length <= 6){
            setPasswordError('Please enter your password')
        } else {
            const user = {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password
            }
            axios
            .post(`${backendDomain}/signup`, user)
            .then((res) => (window.location = res.data.url));
        }
    }

    return(
        <div>
            <Row className='main__container__signup justify-content-center text-center'>
                <Col className='signup__container__left' lg={4}>
                    <p className='signup__header'>Create Account</p>
                    <p className='signup__subheader'>Already have an account? <a className='signup__login__link' href="/login">Sign in</a></p>
                    <Form onSubmit={onSubmit}>
                        <Row>
                            <Col>
                            <Form.Group controlId="firstname">
                            <Form.Label>Firstname *</Form.Label>
                            <Form.Control 
                                type="text"
                                name='firstname'
                                placeholder='Mike'
                                value={firstname}
                                onChange={event => setFirstname(event.target.value)}
                            />
                            <span className='signup__error__msg'>{firstnameError}</span>
                        </Form.Group>
                            </Col>
                            <Col>
                            <Form.Group controlId="lastname">
                            <Form.Label>Lastname *</Form.Label>
                            <Form.Control 
                                type="text" 
                                name='lastname'
                                placeholder='Lawrence'
                                value={lastname}
                                onChange={event => setLastname(event.target.value)}
                            />
                            <span className='signup__error__msg'>{lastnameError}</span>
                        </Form.Group>
                            </Col>
                        </Row>    
                        <Form.Group controlId="email">
                            <Form.Label>Email address *</Form.Label>
                            <Form.Control 
                                type="email"
                                name='email'
                                placeholder='mike.lawrence@mail.com'
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                            />
                            <span className='signup__error__msg'>{emailError}</span>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password *</Form.Label>
                            <Form.Control 
                                type="password"
                                name='password'
                                placeholder='*********'
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                            />
                            <span className='signup__error__msg'>{passwordError}</span>
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

export default Signup;