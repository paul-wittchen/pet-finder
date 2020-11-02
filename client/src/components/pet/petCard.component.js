import React, { Component } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import Moment from 'react-moment';
import '../../styles/petsCard.scss';
import PhoneModal from './phoneModal.component';

export default class PetCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            isOpen: false
        }
    }

    componentDidMount() {
        this.setState({
            loading: false
        })
    }

    openModal = () => {this.setState({ isOpen: true })}
    closeModal = () => {this.setState({ isOpen: false })}

    render() {
        if (!this.state.loading) {
            return(
                <>
                <Card className='pet__card'>
                    <Card.Img variant="top" src="https://source.unsplash.com/user/adventure_yuki/240x240" />
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
                        <Button className='pet__card__btn'><i className="fas fa-info-circle"></i> Details</Button>
                        {this.props.contact.includes('@') ? (
                            <Button className='pet__card__btn'><i className="far fa-envelope"></i> Message</Button>
                        ) : (
                            <Button className='pet__card__btn' onClick={this.openModal}><i className="fas fa-phone-alt"></i> Call</Button>
                        )}
                    </Card.Footer>
                </Card>
                <PhoneModal
                    petName={this.props.petName}
                    phone={this.props.contact}
                    closeModal={this.closeModal}
                    open={this.state.isOpen}
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