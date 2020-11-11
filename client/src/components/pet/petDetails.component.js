import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Moment from 'react-moment';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../../styles/petDetails.scss';
import backendDomain from '../../utility'

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
        mapboxgl.accessToken = 'pk.eyJ1IjoicGF1bDA3MTEiLCJhIjoiY2toMmxybmV6MGRwbzJwcGM4am55dDhjNyJ9.RDH0hBD2iTORkidOf0FNFg';
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.petData.lon, this.state.petData.lat],
            zoom: 14
            });
        new mapboxgl.Marker()
            .setLngLat([this.state.petData.lon, this.state.petData.lat])
            .addTo(map);
        const nav = new mapboxgl.NavigationControl();
            map.addControl(nav);
            map.addControl(new mapboxgl.GeolocateControl({
                positionOptions: {
                enableHighAccuracy: true
                },
                trackUserLocation: true
                }));
    }

    render() {
        console.log(this.state.petData.description);
        return(
            <div className='pet__details__container'>
                <svg className='svg__top' viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#E76F51" d="M66.3,3.6C66.4,25.6,33.2,51.2,8.3,51.2C-16.5,51.2,-33.1,25.6,-30.1,3.6C-33.1,-18.5,-16.5,-36.9,8.3,-36.9C33.2,-36.9,66.3,-18.5,66.3,3.6Z" transform="translate(100 100)" />
                </svg>
                <Row className='pet__details__row'>
                    <Col lg={6} className='pet__details__left'>
                        <img src={this.state.petData.image} alt=""/>
                    </Col>
                    <Col lg={6} className='pet__details__right'>
                        <p className='pet__details__name'>{this.state.petData.petName}</p>
                        <p className='pet__details__desc'>{this.state.petData.description}</p>
                        {(this.state.petData.phone && this.state.petData.mail) != null ? (
                            <Row className='text-center'>
                                <Col>
                                    <a className='pet__details__contact__details' href={'tel:' + this.state.petData.phone}><i className="fas fa-phone-alt"></i> {this.state.petData.phone}</a>      
                                </Col>
                                <Col>
                                    <a className='pet__details__contact__details' href={'mailto:' + this.state.petData.mail}><i className="far fa-envelope"></i> {this.state.petData.mail}</a>      
                                </Col>
                            </Row>
                        ) : (
                            <span>
                                <a className='pet__details__contact__details' href={'tel:' + this.state.petData.phone}><i className="fas fa-phone-alt"></i> {this.state.petData.phone}</a>      
                                <a className='pet__details__contact__details' href={'mailto:' + this.state.petData.mail}><i className="far fa-envelope"></i> {this.state.petData.mail}</a> 
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