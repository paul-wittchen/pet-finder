import React, { Component } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import Moment from 'react-moment';
import '../../styles/petsCard.scss';
import PhoneModal from './phoneModal.component';
import MessageModal from './msgModal.component';
import { Link } from 'react-router-dom';

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
                    <Card.Img variant="top" src="https://source.unsplash.com/user/adventure_yuki/400x240" />
                    <div className='pet__card__tag'>{this.props.petKind}</div>
                    <Card.Body>
                        <Card.Title>{this.props.petName}</Card.Title>
                        <div className='pet__card__time'>
                            <Moment fromNow>{this.props.createdAt}</Moment>
                        </div>
                        <Card.Text className='pet__card__desc'>
                            {this.props.description}
                        </Card.Text>
                        <Card.Text className='pet__card__location text-center'>
                            <i className="fas fa-map-marker-alt"></i> {this.props.location}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <a href={`/pets-list/${this.props.uuid}`}><i className="fas fa-info-circle"></i> Details</a>

                        {this.props.contact.includes('@') ? (
                            <Button className='pet__card__btn' onClick={this.openModalMsg}><i className="far fa-envelope"></i> Message</Button>
                        ) : (
                            <Button className='pet__card__btn' onClick={this.openModalPhone}><i className="fas fa-phone-alt"></i> Call</Button>
                        )}
                    </Card.Footer>
                </Card>
                <PhoneModal
                    petName={this.props.petName}
                    phone={this.props.contact}
                    closeModalPhone={this.closeModalPhone}
                    open={this.state.isOpenPhone}
                />
                <MessageModal
                    petName={this.props.petName}
                    mail={this.props.contact}
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