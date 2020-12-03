import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import Moment from 'react-moment';
import './petDetails.scss';
import backendDomain from '../../../utility'
import initMap from '../../../assets/js/initMap';
import { FacebookShareButton, FacebookIcon, EmailShareButton, EmailIcon } from "react-share";

export default class PetDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            petData: {}
        }
    }

    componentDidMount() {
        axios
            .post(`${backendDomain}/pets-list/${window.location.href.split('/')[4]}`)
            .then((res) => {
                this.setState({ petData: res.data.pet })
            })
    }

    componentDidUpdate() {
        initMap(this.state.petData.lon, this.state.petData.lat, this.state.petData.image, this.mapContainer)
    }

    render() {
        return(
            <div className='pet__details__container'>
                <Row className='pet__details__row'>
                    <Col lg={6} className='pet__details__left'>
                        <img src={this.state.petData.image} alt=""/>
                    </Col>
                    <Col lg={6} className='pet__details__right'>
                        <p className='pet__details__name'>{this.state.petData.petName}</p>
                        <Row className='pet__details__share justify-content-center'>
                            <Col lg={1} md={2} xs={2}>
                                <FacebookShareButton
                                    url={`${backendDomain}/pets-list/${this.state.petData.uuid}`}
                                    quote={`Please help me, to find my ${this.state.petData.petName}`}
                                    hashtag={this.state.petData.petName}
                                >
                                    <FacebookIcon size={40} round={true} />
                                </FacebookShareButton>
                            </Col>
                            <Col lg={1} md={2} xs={2}>
                                <EmailShareButton
                                    subject={`Please help me, to find my ${this.state.petData.petName}`}
                                    body={this.state.petData.description}
                                >
                                    <EmailIcon size={40} round={true} />
                                </EmailShareButton>
                            </Col>
                        </Row>
                        { this.state.petData.description ? (
                            <p className='pet__details__desc'>{this.state.petData.description.substr(0,400)}</p>
                        ) : (
                            <></>
                        )}
                        {(this.state.petData.phone && this.state.petData.mail) != null ? (
                            <Row className='pet__details__buttons text-center'>
                                <Col>
                                    <Button className='pet__details__contact__button' href={'tel:' + this.state.petData.phone}>
                                        <i className="fas fa-phone-alt"></i> {this.state.petData.phone}
                                    </Button>      
                                </Col>
                                <Col>
                                    <Button className='pet__details__contact__button' href={`mailto:${this.state.petData.mail}?subject=Informations%20about%20${this.state.petData.petName}`}>
                                        <i className="far fa-envelope"></i> {this.state.petData.mail}
                                    </Button>      
                                </Col>
                            </Row>
                        ) : (
                            <span>
                                <Button className='pet__details__contact__button' href={'tel:' + this.state.petData.phone}><i className="fas fa-phone-alt"></i> {this.state.petData.phone}</Button>      
                                <Button className='pet__details__contact__button' href={'mailto:' + this.state.petData.mail}><i className="far fa-envelope"></i> {this.state.petData.mail}</Button> 
                            </span>
                        )}
                        <Row className='pet__details__info__row'>
                            <Col>
                                <p className='pet__details__row__desc'>Kind:</p>
                                <p className='pet__details__infos'>{this.state.petData.petKind}</p>
                            </Col>
                            <Col>
                                <p className='pet__details__row__desc'>Reward:</p>
                                { this.state.petData.reward === '' ? (
                                    <p className='pet__details__infos'> - </p>
                                ) : (
                                    <p className='pet__details__infos'>{this.state.petData.reward}</p>
                                )}
                            </Col>
                            <Col>
                                <p className='pet__details__row__desc'>Last seen:</p>
                                <p className='pet__details__infos'>{this.state.petData.location}</p>
                            </Col>
                            <Col>
                                <p className='pet__details__row__desc'>Lost:</p>
                                <p className='pet__details__infos'><Moment fromNow>{this.state.petData.createdAt}</Moment></p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <div className='map' ref={el => this.mapContainer = el} />
            </div>
        )
    }
}