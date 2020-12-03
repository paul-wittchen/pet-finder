import React, { Component } from 'react';
import { Card, Spinner, Row, Col, Button } from 'react-bootstrap';
import Moment from 'react-moment';
import './petCard.scss';
import PhoneModal from '../phoneModal/phoneModal.component';
import MessageModal from '../msgModal/msgModal.component';
import { FacebookShareButton, FacebookIcon, EmailShareButton, EmailIcon } from "react-share";
import backendDomain from '../../../utility'

export default class PetCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            isOpenPhone: false,
            isOpenMsg: false
        }
    }

    componentDidMount() {
        this.setState({
            loading: false
        })
    }

    openModalPhone = () => {this.setState({ isOpenPhone: true })}
    closeModalPhone = () => {this.setState({ isOpenPhone: false })}

    openModalMsg = () => {this.setState({ isOpenMsg: true })}
    closeModalMsg = () => {this.setState({ isOpenMsg: false })}

    render() {
        if (!this.state.loading) {
            return(
                <>
                <Card className='pet__card'>
                    <Card.Img variant="top" src={this.props.imageURL} />
                    <Row className='pet__card__share'>
                        <Col lg={1} md={2} xs={2}>
                            <FacebookShareButton
                                url={`${backendDomain}/pets-list/${this.props.uuid}`}
                                quote={`Please help me, to find my ${this.props.petName}`}
                                hashtag={this.props.petName}
                            >
                                <FacebookIcon size={40} round={true} />
                            </FacebookShareButton>
                        </Col>
                        <Col lg={1} md={2} xs={2}>
                            <EmailShareButton
                                subject={`Please help me, to find my ${this.props.petName}`}
                                body={this.props.description}
                            >
                                <EmailIcon size={40} round={true} />
                            </EmailShareButton>
                        </Col>
                    </Row>
                    <Card.Body>
                        <Card.Title>{this.props.petName}</Card.Title>
                        <div className='pet__card__time'>
                            <Moment fromNow>{this.props.createdAt}</Moment>
                        </div>
                        <Card.Text className='pet__card__desc'>
                            {this.props.description.length >= 140 ? (
                                <span>
                                    {this.props.description.substring(0, 140)} ... <br/>
                                    <a className='pet__card__readmore' href={`/pets-list/${this.props.uuid}`}>
                                        Read more
                                    </a>
                                </span>
                            ) : (
                                <span>
                                    {this.props.description}
                                </span>
                            )}
                        </Card.Text>
                        <Card.Text className='pet__card__location text-center'>
                            <i className="fas fa-map-marker-alt"></i> {this.props.location}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button className='pet__card__btn' href={`/pets-list/${this.props.uuid}`}>
                            <i className="fas fa-info-circle"></i> Details
                        </Button>
                        {this.props.phone !== '' ? (
                            <button className='pet__card__btn' onClick={this.openModalPhone}>
                                <i className="fas fa-phone-alt"></i> Phone
                            </button>
                        ) : (
                            <> </>
                        )}
                        {this.props.mail !== '' ? (
                            <button className='pet__card__btn' onClick={this.openModalMsg}>
                                <i className="far fa-envelope"></i> Message
                            </button>
                        ) : (
                            <> </>
                        )}
                    </Card.Footer>
                </Card>
                <PhoneModal
                    petName={this.props.petName}
                    phone={this.props.phone}
                    closeModalPhone={this.closeModalPhone}
                    open={this.state.isOpenPhone}
                />
                <MessageModal
                    petName={this.props.petName}
                    mail={this.props.mail}
                    closeModalMsg={this.closeModalMsg}
                    open={this.state.isOpenMsg}
                />
                </>
            )
        } else {
            return(
                <Spinner animation="border" />
            ) 
        }
    }
}