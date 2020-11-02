import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';

export default class CreatePet extends Component {
    constructor() {
        super()

        this.state = {
            petName: '',
            petKind: '',
            description: '',
            location: '',
            reward: '',
            contact: ''
        }
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();

        const pet = {
            petName: this.state.petName,
            petKind: this.state.petKind,
            description: this.state.description,
            location: this.state.location,
            date: this.state.date,
            reward: this.state.reward,
            contact: this.state.contact,
            token: Cookies.get('token')
        }

        axios
            .post('http://localhost:8000/lost-pet', pet)
            .then((res) => window.location = res.data.url)
    }

    render() {
        return(
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Whats the name of your pet? *</Form.Label>
                    <Form.Control 
                        type="text" 
                        name='petName'
                        value={this.state.petName}
                        onChange={this.onChange}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>What kind of pet, have you lost? *</Form.Label>
                    <Form.Control
                        type='text'
                        name='petKind'
                        value={this.state.petKind}
                        onChange={this.onChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Describe your pet! *</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        name='description'
                        rows={4} 
                        placeholder='How does your pet look like? Is it shy? Is it aggressive? etc.'
                        value={this.state.description}
                        onChange={this.onChange}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Where have you seen your pet the last time? *</Form.Label>
                    <Form.Control
                        type='text'
                        name='location'
                        value={this.state.location}
                        onChange={this.onChange}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Is there a reward for the founder? (optional)</Form.Label>
                    <Form.Control
                        type='text'
                        name='reward'
                        value={this.state.reward}
                        onChange={this.onChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>How should people contact you?</Form.Label>
                    <Form.Control
                        type='text'
                        name='contact'
                        value={this.state.contact}
                        onChange={this.onChange}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        )
    }
}