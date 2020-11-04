import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import '../styles/home.scss';

export default class Home extends Component {

    render() {
        return(
            <div>
                <Jumbotron>
                    <p className='home__header'>Your pet ran away?</p>
                    <p className='home__subheader'>We help you to get her/him back!</p>
                </Jumbotron>
            </div>
        )
    }
}