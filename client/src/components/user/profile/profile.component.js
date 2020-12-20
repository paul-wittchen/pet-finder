import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import './profile.scss';
import { Row, Col } from 'react-bootstrap';
import UsersPets from '../../pet/usersPets/usersPets.component';
import backendDomain from '../../../utility';

const Profile = () => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        axios
            .post(`${backendDomain}/profile`, { token: Cookies.get('token') })
            .then((res) => {setUser(res.data.data)})
            .catch((error) => console.log(error))
    })

    const deletePet = (uuid) => {
        axios
            .delete(`${backendDomain}/profile/${uuid}`, { data: { token: Cookies.get('token') } })
            .then(res => console.log(res.data));
    }

    if(user === null) {
        return <div>Loading...</div>
    } else {
        return(
            <div className='profile__container'>
                <Row className='profile__basic__row justify-content-center'>
                    <Col lg={4} className='container__left'>
                        <p className='profile__welcome__text'>
                            Hey {user.firstname}, here you can see all your search calls or create a new one!
                        </p>
                    </Col>
                    <Col lg={6} className='container__right'>
                        <UsersPets pets={user.pet} deletePet={deletePet}/>
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

export default Profile;
