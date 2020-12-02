import React, { Component } from 'react';
import { Jumbotron, Row, Col, Card, Button } from 'react-bootstrap';
import './home.scss';
import cat from '../../assets/images/cat.png';
import dog from '../../assets/images/dog.png';
import rabbit from '../../assets/images/rabbit.png';
import story1 from '../../assets/images/chewy-grzczyieFUw-unsplash.jpg';
import story2 from '../../assets/images/chewy-hUvNi1HaZg0-unsplash.jpg';
import story3 from '../../assets/images/__-drz-__-N_INAlQoO6Y-unsplash.jpg';
import story4 from '../../assets/images/story4.jpg';
import ReactCardCarousel from "react-card-carousel";

export default class Home extends Component {

    render() {
        return(
            <div>
                <Jumbotron>
                    <p className='home__header'>Your pet ran away?</p>
                    <p className='home__subheader'>We help you to get her/him back!</p>
                    <div className='home__cta__container'>
                        <Button className='home__cta__btn' href="/pets-list">Browse pets</Button>
                        <Button className='home__cta__btn' href="/lost-pet">Lost a pet</Button>
                    </div>
                    <Row className='home__row__img justify-content-center'>
                        <Col xs lg="2">
                            <img className='home__pet__icon' src={cat} alt=""/>
                        </Col>
                        <Col xs lg="2">
                            <img className='home__pet__icon' src={dog} alt=""/>
                        </Col>
                        <Col xs lg="2">
                            <img className='home__pet__icon' src={rabbit} alt=""/>
                        </Col>
                    </Row>
                </Jumbotron>
                <Row className='home__stories__row justify-content-center'>
                    <Col xs lg="5">
                        <ReactCardCarousel autoplay={true} autoplay_speed={4000}>
                            <Card>
                                <Card.Img variant="top" src={story1} />
                                <Card.Body>
                                    <Card.Title>
                                        Petra &amp; Luca <i className="fas fa-dog"></i>
                                    </Card.Title>
                                    <Card.Text>
                                        " Thanks to <b>PetFinder</b>, I got Luca 🐕 back in less then one day! 
                                        Thanks to the whole community who helped me finding him!!! "
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Img variant="top" src={story3} />
                                <Card.Body>
                                    <Card.Title>
                                        Marie &amp; Bonny <i className="fas fa-dog"></i>
                                    </Card.Title>
                                    <Card.Text>
                                        " Our daughter Marie was heartbroken, when Bonny ran away...
                                        But we got her back in one day!"
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Img variant="top" src={story2} />
                                <Card.Body>
                                    <Card.Title>
                                        Gabriel &amp; Nala <i className="fas fa-cat"></i>
                                    </Card.Title>
                                    <Card.Text>
                                        " <b>PetFinder</b> is a must for every pet owner! 🐈 🐕 🐇 🐍 "
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Img variant="top" src={story4} />
                                <Card.Body>
                                    <Card.Title>
                                        Leo &amp; Tyson <i className="fas fa-cat"></i>
                                    </Card.Title>
                                    <Card.Text>
                                        " Without my Tyson, I m not complete! Thanks to <b>Petfinder</b> for bringing my dog back!!! "
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </ReactCardCarousel>
                    </Col>
                </Row>
            </div>
        )
    }
}