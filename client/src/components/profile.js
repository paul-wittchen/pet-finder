import React, { Component } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import '../styles/profile.scss';
import { Row, Col } from 'react-bootstrap';

export default class Profile extends Component {
    constructor() {
        super()
        const token = Cookies.get('token');

        this.state = {
            user: {},
            token
        }
    }

    componentDidMount() {
        axios
            .post('http://localhost:8000/profile', { token: this.state.token })
            .then((res) => {
                this.setState({ user: res.data.profile })
            })
            .catch((error) => console.log(error))
    }

    logout = () => {
        Cookies.remove('token')
        window.location('/login')
    }

    render() {
        return(
            <div className='profile__container'>
                <a href="/" onClick={this.logout}>Logout</a>
                <Row className='profile__basic__row'>
                    <Col>
                        <img className='profile__pic' src="https://source.unsplash.com/random" alt="Profilepic"/>
                        <p className='profile__firstname'>{this.state.user.firstname}</p>
                        <p className='profile__lastname'>{this.state.user.lastname}</p>
                    </Col>
                    <Col>
                    
                    </Col>
                </Row>
            </div>
            
        )
    }
}