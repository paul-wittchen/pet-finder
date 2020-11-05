import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../../styles/createPet.scss';
import ImageUploader from 'react-images-upload';
import AlgoliaPlaces from 'algolia-places-react';
import BounceLoader from "react-spinners/BounceLoader";

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
            mail: '',
            uploading: false
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
        this.setState({
            uploading: true
        })

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
        if (!this.state.uploading) {
            return(
                <div>
                    <svg className='svg__left' viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#E76F51" d="M46,-24C56,-9.2,58,12.7,49,20.4C40,28,20,21.4,5.8,18.1C-8.4,14.7,-16.8,14.6,-26.1,6.8C-35.4,-1.1,-45.7,-16.7,-41.5,-28.1C-37.3,-39.5,-18.6,-46.6,-0.3,-46.5C18,-46.3,36,-38.7,46,-24Z" transform="translate(100 100)" />
                    </svg>
                    <Form onSubmit={this.onSubmit}>
                        <ImageUploader
                            withIcon={true}
                            buttonText='Select image'
                            onChange={this.onDrop}
                            imgExtension={['.jpg', '.png', '.gif']}
                            maxFileSize={5242880}
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
                                    <Form.Label>What kind of pet, are you missing? *</Form.Label>
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
                        <Button onClick={this.creatingCard} className='create__pet__submit' type="submit">
                            Submit
                        </Button>
                    </Form>
                    <svg className='svg__right' viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#E76F51" d="M46,-24C56,-9.2,58,12.7,49,20.4C40,28,20,21.4,5.8,18.1C-8.4,14.7,-16.8,14.6,-26.1,6.8C-35.4,-1.1,-45.7,-16.7,-41.5,-28.1C-37.3,-39.5,-18.6,-46.6,-0.3,-46.5C18,-46.3,36,-38.7,46,-24Z" transform="translate(100 100)" />
                    </svg>
                </div>
            )
        } else {
            return(
                <div className='pet__create__loader__container'>
                    <p className='pet__create__loader__header'>Uploading . . .</p>
                    <BounceLoader
                        size={240}
                        color={"#E76F51"}
                        loading={this.state.uploading}
                    />
                </div>
            )
        }
    }
}