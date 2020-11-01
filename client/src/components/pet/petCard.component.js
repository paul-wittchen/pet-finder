import React, { Component } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import Moment from 'react-moment';
import '../../styles/petsCard.scss';

export default class PetCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        this.setState({
            loading: false
        })
    }

    render() {
        if (!this.state.loading) {
            return(
                <Card className='pets__card'>
                    <Card.Img variant="top" src="https://source.unsplash.com/user/adventure_yuki/240x320" />
                    <Card.Body>
                        <Card.Title>{this.props.petName}</Card.Title>
                        <Card.Text>
                            {this.props.description}
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                    <Card.Footer>
                        <Moment fromNow>{this.props.createdAt}</Moment>
                    </Card.Footer>
                </Card>
            )
        } else {
            return(
                <Spinner animation="border" />
            ) 
        }
        
    }
}