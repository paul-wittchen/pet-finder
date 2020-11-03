import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../../styles/createPet.scss';
import ImageUploader from 'react-images-upload';
import AlgoliaPlaces from 'algolia-places-react';

export default class CreatePet extends Component {
    constructor() {
        super()

        this.state = {
            petName: '',
            image: [],
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

    onDrop = (picture) => {
        this.setState({
            image: this.state.image.concat(picture),
        });
    }

    onSubmit = (event) => {
        console.log(this.state.image);
        event.preventDefault();

        const data = new FormData();
        data.append('image', this.state.image[0], this.state.image[0].name)
        data.append('token', Cookies.get('token'))

        axios.post('http://localhost:8000/upload-pet-image', data, {
            headers: {
              'accept': 'application/json',
              'Accept-Language': 'en-US,en;q=0.8',
              'Content-Type': `multipart/form-data`,
            }
          })
          .then(res => {
            if(res.data.status) {
                const image = res.data.imageURL

                const pet = {
                    petName: this.state.petName,
                    image,
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
            } else {
                console.log('request failed');
            }
          })
          .catch(err => {
              console.log(err);
          })


    }

    render() {
        return(
            <Form onSubmit={this.onSubmit}>
                <ImageUploader
                    withIcon={true}
                    buttonText='Select image'
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.png', '.gif']}
                    maxFileSize={5242880}
                    withPreview={true}
                    singleImage={true}
                />
                <Row>
                    <Col>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Whats the name of your pet? *</Form.Label>
                            <Form.Control 
                                type="text" 
                                name='petName'
                                value={this.state.petName}
                                onChange={this.onChange}
                                required
                                placeholder='e.g. Fluffy'
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>What kind of pet, have you lost? *</Form.Label>
                            <Form.Control
                                type='text'
                                name='petKind'
                                value={this.state.petKind}
                                onChange={this.onChange}
                                required
                                placeholder='e.g. Dog'
                            />
                        </Form.Group>
                    </Col>
                </Row>
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
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Where have you seen your pet the last time? *</Form.Label>
                            <AlgoliaPlaces
                                placeholder='Write an address here'
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Is there a reward for the founder? (optional)</Form.Label>
                            <Form.Control
                                type='text'
                                name='reward'
                                value={this.state.reward}
                                onChange={this.onChange}
                                placeholder='e.g. 100$'
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group>
                    <Form.Label>How should people contact you?</Form.Label>
                    <Form.Control
                        type='text'
                        name='contact'
                        value={this.state.contact}
                        onChange={this.onChange}
                        placeholder='Tel / Email'
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