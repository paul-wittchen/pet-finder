import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Moment from 'react-moment';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../../styles/petDetails.scss';

export default class PetDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            petData: {}
        }
    }

    componentDidMount() {
        axios
            .get('http://localhost:8000/pets-list/' + window.location.href.split('/')[4])
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
    }

    render() {
        console.log(this.state.petData.petName);
        return(
            <div className='pet__details__container'>
                <Row className='pet__details__row'>
                    <Col className='pet__details__left'>
                        <img src={this.state.petData.image} alt=""/>
                    </Col>
                    <Col className='pet__details__right'>
                        <p className='pet__details__name'>{this.state.petData.petName}</p>
                        <p className='pet__details__desc'>{this.state.petData.description}</p>
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
                                <p className='pet__details__row__desc'>Where:</p>
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