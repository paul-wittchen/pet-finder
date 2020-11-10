import React, { Component } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import '../../styles/profile.scss';
import { Row, Col } from 'react-bootstrap';
import UsersPets from '../pet/usersPets'

export default class Profile extends Component {
    constructor() {
        super()
        const token = Cookies.get('token');

        this.state = {
            user: null,
            token
        }
    }

    componentDidMount() {
        axios
            .post('http://localhost:8000/profile', { token: this.state.token })
            .then((res) => {
                this.setState({ user: res.data.data })
            })
            .catch((error) => console.log(error))
    }

    deletePet = (uuid) => {
        axios
            .delete('http://localhost:8000/profile/' + uuid, { data: { token: this.state.token } })
            .then(res => console.log(res.data));
    }

    logout = () => {
        Cookies.remove('token')
        window.location('/login')
    }

    render() {
        if(this.state.user === null) {
            return <div>Loading...</div>
        } else {
            return(
                <div className='profile__container'>
                    <svg className='profile__svg__right' viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#E76F51" d="M42.9,-23.6C51.3,-10.4,50.6,9.2,41.9,21.5C33.3,33.7,16.6,38.6,-4.3,41.1C-25.3,43.6,-50.5,43.7,-60,31C-69.5,18.3,-63.1,-7.2,-50.5,-22.9C-37.8,-38.6,-18.9,-44.4,-0.8,-43.9C17.3,-43.5,34.6,-36.7,42.9,-23.6Z" transform="translate(100 100)" />
                    </svg>
                    <Row className='profile__basic__row justify-content-center'>
                        <Col lg={4} className='container__left'>
                            <p className='profile__firstname'>{this.state.user.firstname}</p>
                            <p className='profile__lastname'>{this.state.user.lastname}</p>
                            <a href="/" onClick={this.logout}>Logout</a>
                        </Col>
                        <Col lg={6} className='container__right'>
                            <UsersPets pets={this.state.user.pet} deletePet={this.deletePet}/>
                            <div className='profile__add__pet'>
                                <a href='/lost-pet'>Create a search call</a> <br/>
                                <i className="fas fa-search fa-2x"></i>
                            </div>
                        </Col>
                    </Row>
                </div>
            )
        }
    }
}
