import React, { Component } from 'react';
import { Jumbotron, Row, Col, Card } from 'react-bootstrap';
import '../styles/home.scss';
import cat from '../images/cat.png';
import dog from '../images/dog.png';
import rabbit from '../images/rabbit.png';
import story1 from '../images/chewy-grzczyieFUw-unsplash.jpg';
import story2 from '../images/chewy-hUvNi1HaZg0-unsplash.jpg';
import story3 from '../images/__-drz-__-N_INAlQoO6Y-unsplash.jpg';

export default class Home extends Component {

    render() {
        return(
            <div>
                <Jumbotron>
                    <p className='home__header'>Your pet ran away?</p>
                    <p className='home__subheader'>We help you to get her/him back!</p>
                    <div className='home__cta__container'>
                        <a className='home__cta__btn' href="/pets-list">Browse pets</a>
                        <a className='home__cta__btn' href="lost-pet">Lost a pet</a>
                    </div>
                    <Row className='home__row__img justify-content-center'>
                        <Col xs lg="2">
                            <img src={cat} alt=""/>
                        </Col>
                        <Col xs lg="2">
                            <img src={dog} alt=""/>
                        </Col>
                        <Col xs lg="2">
                            <img src={rabbit} alt=""/>
                        </Col>
                    </Row>
                </Jumbotron>
                <Row className='home__stories__row justify-content-center'>
                    <Col xs lg="3">
                        <Card style={{ width: '24rem' }}>
                            <Card.Img variant="top" src={story1} />
                            <Card.Body>
                                <Card.Title>
                                    Petra &amp; Luca <i class="fas fa-dog"></i>
                                </Card.Title>
                                <Card.Text>
                                    " Thanks to <b>PetFinder</b>, I got Luca 🐕 back in less then one day! 
                                    Thanks to the whole community who helped me finding him!!! "
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs lg="3">
                        <Card style={{ width: '24rem' }}>
                            <Card.Img variant="top" src={story3} />
                            <Card.Body>
                                <Card.Title>
                                    Marie &amp; Bonny <i class="fas fa-dog"></i>
                                </Card.Title>
                                <Card.Text>
                                    " Our daughter Marie was heartbroken, when Bonny ran away...
                                    Without the help of <b>PetFinders</b> community, 
                                    and the help of all the volunteer seekers, we wouldn´t have her back now! "
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs lg="3">
                        <Card style={{ width: '24rem' }}>
                            <Card.Img variant="top" src={story2} />
                            <Card.Body>
                                <Card.Title>
                                    Gabriel &amp; Nala <i class="fas fa-cat"></i>
                                </Card.Title>
                                <Card.Text>
                                    " <b>PetFinder</b> is a must for every pet owner! 🐈 🐕 🐇 🐍 "
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}