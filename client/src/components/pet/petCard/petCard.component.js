import React, { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import Moment from 'react-moment';
import './petCard.scss';
import PhoneModal from '../phoneModal/phoneModal.component';
import MessageModal from '../msgModal/msgModal.component';
import { FacebookShareButton, FacebookIcon, EmailShareButton, EmailIcon } from "react-share";
import backendDomain from '../../../utility'

const PetCard = (props) => {

    const [isOpenPhone, setIsOpenPhone] = useState(false);
    const [isOpenMsg, setIsOpenMsg] = useState(false)

    const openModalPhone = () => {setIsOpenPhone(true)}
    const closeModalPhone = () => {setIsOpenPhone(false)}

    const openModalMsg = () => {setIsOpenMsg(true)}
    const closeModalMsg = () => {setIsOpenMsg(false)}

    return(
        <>
            <Card className='pet__card'>
                <Card.Img variant="top" src={props.imageURL} />
                <Row className='pet__card__share'>
                    <Col lg={1} md={2} xs={2}>
                        <FacebookShareButton
                            url={`${backendDomain}/pets-list/${props.uuid}`}
                            quote={`Please help me, to find my ${props.petName}`}
                            hashtag={props.petName}
                        >
                            <FacebookIcon size={40} round={true} />
                        </FacebookShareButton>
                    </Col>
                    <Col lg={1} md={2} xs={2}>
                        <EmailShareButton
                            subject={`Please help me, to find my ${props.petName}`}
                            body={props.description}
                        >
                            <EmailIcon size={40} round={true} />
                        </EmailShareButton>
                    </Col>
                </Row>
                <Card.Body>
                    <Card.Title>{props.petName}</Card.Title>
                    <div className='pet__card__time'>
                        <Moment fromNow>{props.createdAt}</Moment>
                    </div>
                    <Card.Text className='pet__card__desc'>
                        {props.description.length >= 140 ? (
                            <span>
                                {props.description.substring(0, 140)} ... <br/>
                                <a className='pet__card__readmore' href={`/pets-list/${props.uuid}`}>
                                    Read more
                                </a>
                            </span>
                        ) : (
                            <span>
                                {props.description}
                            </span>
                        )}
                    </Card.Text>
                    <Card.Text className='pet__card__location text-center'>
                        <i className="fas fa-map-marker-alt"></i> {props.location}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Button className='pet__card__btn' href={`/pets-list/${props.uuid}`}>
                        <i className="fas fa-info-circle"></i> Details
                    </Button>
                    {props.phone !== '' ? (
                        <Button className='pet__card__btn' onClick={openModalPhone}>
                            <i className="fas fa-phone-alt"/> Phone
                        </Button>
                    ) : (
                        null
                    )}
                    {props.mail !== '' ? (
                        <Button className='pet__card__btn' onClick={openModalMsg}>
                            <i className="far fa-envelope"/> Message
                        </Button>
                    ) : (
                        null
                    )}
                </Card.Footer>
            </Card>
            <PhoneModal
                petName={props.petName}
                phone={props.phone}
                closeModalPhone={closeModalPhone}
                open={isOpenPhone}
            />
            <MessageModal
                petName={props.petName}
                mail={props.mail}
                closeModalMsg={closeModalMsg}
                open={isOpenMsg}
            />
        </>
    )
}

export default PetCard;