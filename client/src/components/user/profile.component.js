import React, { Component } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import '../../styles/profile.scss';
import { Row, Col } from 'react-bootstrap';
import PetList from './petList/petList'

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
                console.log(res.data.data);
                this.setState({ user: res.data.data })
            })
            .catch((error) => console.log(error))
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
                <Row className='profile__basic__row'>
                    <Col className='container__left'>
                        <img className='profile__pic' src="https://source.unsplash.com/random" alt="Profilepic"/>
                        <p className='profile__firstname'>{this.state.user.firstname}</p>
                        <p className='profile__lastname'>{this.state.user.lastname}</p>
                        <a href="/" onClick={this.logout}>Logout</a>
                    </Col>
                    <Col className='container__right'>
                        <PetList pets={this.state.user.pet}/>
                    </Col>
                </Row>
            </div>
        )
       }
    }
}
