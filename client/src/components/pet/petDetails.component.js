import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Moment from 'react-moment';
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
            </div>
        )
    }
}