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
            petKind: 'Something else',
            description: '',
            location: '',
            lat: 0.0,
            lon: 0.0,
            reward: '',
            phone: '',
            mail: ''
        }
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleAlgoliaChange = (query) => {
        this.setState({
            location: `${query.suggestion.name}, ${query.suggestion.city}`,
            lat: query.suggestion.latlng.lat,
            lon: query.suggestion.latlng.lng
        })
    }

    onDrop = (picture) => {
        this.setState({
            image: this.state.image.concat(picture),
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        
        const data = new FormData();
        data.append('image', this.state.image[0], this.state.image[0].name)
        data.append('token', Cookies.get('token'))

        axios.post('http://localhost:8000/upload-pet-image', data, {
            headers: {
              'accept': 'application/json',
              'Accept-Language': 'en-US,en;q=0.8',
              'Content-Type': `multipart/form-data`
            }
          })
          .then(res => {
            if(res.data.status) {                
                const pet = {
                    petName: this.state.petName,
                    image: res.data.imageURL,
                    petKind: this.state.petKind,
                    description: this.state.description,
                    location: this.state.location,
                    lat: this.state.lat,
                    lon: this.state.lon,
                    date: this.state.date,
                    reward: this.state.reward,
                    phone: this.state.phone,
                    mail: this.state.mail,
                    token: Cookies.get('token')
                }
        
                axios
                    .post('http://localhost:8000/lost-pet', pet)
                    .then((res) => window.location = res.data.url)
            } else {
                console.log('request failed');
            }
          })
          .catch(error => {
              console.log(error);
          })
    }

    render() {
        console.log(this.state.location);
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
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>What kind of pet, have you lost? *</Form.Label>
                            <Form.Control 
                                as="select"
                                defaultValue="Choose..."
                                name='petKind'
                                value={this.state.petKind}
                                onChange={this.onChange}
                                required>
                                <option value='Something else'>Choose...</option>
                                <option  value='Dog'>Dog</option>
                                <option  value='Cat'>Cat</option>
                                <option  value='Rabbit'>Rabbit</option>
                                <option  value='Something else'>Something else</option>
                            </Form.Control>
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
                                placeholder='location'
                                onChange={this.handleAlgoliaChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Is there a reward for the founder?</Form.Label>
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
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Please enter your phone number!</Form.Label>
                            <Form.Control
                                type='text'
                                name='phone'
                                value={this.state.phone}
                                onChange={this.onChange}
                                placeholder='012 3456789'
                            />
                            <Form.Text className="text-muted create__pet__contact__warning">
                                !! Without providing your contact details, nobody can inform you, if your pet is found !!
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Please enter your mail address!</Form.Label>
                            <Form.Control
                                type='email'
                                name='mail'
                                value={this.state.mail}
                                onChange={this.onChange}
                                placeholder='example@mail.com'
                            />
                            <Form.Text className="text-muted create__pet__contact__warning">
                                !! Without providing your contact details, nobody can inform you, if your pet is found !!
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Button className='create__pet__submit' variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        )
    }
}