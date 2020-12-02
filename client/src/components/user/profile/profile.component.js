import React, { Component } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import './profile.scss';
import { Row, Col } from 'react-bootstrap';
import UsersPets from '../../pet/usersPets/usersPets.component';
import backendDomain from '../../../utility';

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
            .post(`${backendDomain}/profile`, { token: this.state.token })
            .then((res) => {
                this.setState({ user: res.data.data })
            })
            .catch((error) => console.log(error))
    }

    deletePet = (uuid) => {
        axios
            .delete(`${backendDomain}/profile/${uuid}`, { data: { token: this.state.token } })
            .then(res => console.log(res.data));
    }

    render() {
        if(this.state.user === null) {
            return <div>Loading...</div>
        } else {
            return(
                <div className='profile__container'>
                    <Row className='profile__basic__row justify-content-center'>
                        <Col lg={4} className='container__left'>
                            <p className='profile__welcome__text'>
                                Hey {this.state.user.firstname}, here you can see all your search calls or create a new one!
                            </p>
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
