import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import Moment from 'react-moment';
import './petDetails.scss';
import backendDomain from '../../../utility'
// import initMap from '../../../assets/js/initMap';
import { FacebookShareButton, FacebookIcon, EmailShareButton, EmailIcon } from "react-share";

const PetDetails = () => {

    const [petData, setPetData] = useState({});
    // let mapContainer = useRef(null)

    useEffect(() => {
        axios
            .post(`${backendDomain}/pets-list/${window.location.href.split('/')[4]}`)
            .then((res) => {setPetData(res.data.pet)})

            // initMap(parseFloat(petData.lon), parseFloat(petData.lat), petData.image, mapContainer)
    }, [petData])

    return(
        <div className='pet__details__container'>
            <Row className='pet__details__row'>
                <Col lg={6} className='pet__details__left'>
                    <img src={petData.image} alt=""/>
                </Col>
                <Col lg={6} className='pet__details__right'>
                    <p className='pet__details__name'>{petData.petName}</p>
                    <Row className='pet__details__share justify-content-center'>
                        <Col lg={1} md={2} xs={2}>
                            <FacebookShareButton
                                url={`${backendDomain}/pets-list/${petData.uuid}`}
                                quote={`Please help me, to find my ${petData.petName}`}
                                hashtag={petData.petName}
                            >
                                <FacebookIcon size={40} round={true} />
                            </FacebookShareButton>
                        </Col>
                        <Col lg={1} md={2} xs={2}>
                            <EmailShareButton
                                subject={`Please help me, to find my ${petData.petName}`}
                                body={petData.description}
                            >
                                <EmailIcon size={40} round={true} />
                            </EmailShareButton>
                        </Col>
                    </Row>
                    { petData.description ? (
                        <p className='pet__details__desc'>{petData.description.substr(0,400)}</p>
                    ) : (
                        <></>
                    )}
                    {(petData.phone && petData.mail) != null ? (
                        <Row className='pet__details__buttons text-center'>
                            <Col>
                                <Button className='pet__details__contact__button' href={'tel:' + petData.phone}>
                                    <i className="fas fa-phone-alt"></i> {petData.phone}
                                </Button>      
                            </Col>
                            <Col>
                                <Button className='pet__details__contact__button' href={`mailto:${petData.mail}?subject=Informations%20about%20${petData.petName}`}>
                                    <i className="far fa-envelope"></i> {petData.mail}
                                </Button>      
                            </Col>
                        </Row>
                    ) : (
                        <span>
                            <Button className='pet__details__contact__button' href={'tel:' + petData.phone}><i className="fas fa-phone-alt"></i> {petData.phone}</Button>      
                            <Button className='pet__details__contact__button' href={'mailto:' + petData.mail}><i className="far fa-envelope"></i> {petData.mail}</Button> 
                        </span>
                    )}
                    <Row className='pet__details__info__row'>
                        <Col>
                            <p className='pet__details__row__desc'>Kind:</p>
                            <p className='pet__details__infos'>{petData.petKind}</p>
                        </Col>
                        <Col>
                            <p className='pet__details__row__desc'>Reward:</p>
                            { petData.reward === '' ? (
                                <p className='pet__details__infos'> - </p>
                            ) : (
                                <p className='pet__details__infos'>{petData.reward}</p>
                            )}
                        </Col>
                        <Col>
                            <p className='pet__details__row__desc'>Last seen:</p>
                            <p className='pet__details__infos'>{petData.location}</p>
                        </Col>
                        <Col>
                            <p className='pet__details__row__desc'>Lost:</p>
                            <p className='pet__details__infos'><Moment fromNow>{petData.createdAt}</Moment></p>
                        </Col>
                    </Row>
                </Col>
            </Row>
            {/* { petData && petData.lon && petData.lat ? (
                <div className='map' ref={el => mapContainer = el} />
            ) : (
                null
            )} */}
        </div>
    )
}

export default PetDetails;