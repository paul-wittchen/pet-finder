import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import AlgoliaPlaces from 'algolia-places-react';

export default class FormCreate extends Component {

    render() {
        return(
            <Form className='create__pet__form' onSubmit={this.props.onSubmit}>
                { this.props.image === null ? (
                    <div className='pet__create__image__wrapper'>
                        <div className="pet__create__image__upload__wrapper">
                            <div className="pet__create__image__upload">
                                <input
                                    type="file" 
                                    onChange={this.props.onDrop}
                                    required>  
                                </input>
                                <i className="fas fa-file-upload"></i>
                            </div>
                        </div>
                        <p>Choose a nice picture of your pet</p>
                    </div>
                ) : (
                    <div className='pet__create__image__chosen'>
                        <p className='pet__create__image__name'>
                            <i className="far fa-image fa-lg"></i> {this.props.image.name}
                        </p>
                        <p className='pet__create__image__remove' onClick={this.props.removeImage}>
                            Remove picture
                        </p>
                    </div>
                )}
                <Row>
                    <Col>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Whats the name of your pet?*</Form.Label>
                            <Form.Control 
                                type="text" 
                                name='petName'
                                value={this.props.petName}
                                onChange={this.props.onChange}
                                placeholder='e.g. Fluffy'
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>What kind of pet, are you missing?*</Form.Label>
                            <Form.Control 
                                as="select"
                                defaultValue="Choose..."
                                name='petKind'
                                onChange={this.props.onChange}
                                required
                                >
                                <option value='Something else'>Choose...</option>
                                <option value='Dog'>Dog</option>
                                <option value='Cat'>Cat</option>
                                <option value='Rabbit'>Rabbit</option>
                                <option value='Something else'>Something else</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Describe your pet!*</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        name='description'
                        rows={4} 
                        placeholder='How does your pet look like? Is it shy? Is it aggressive? etc.'
                        value={this.props.description}
                        onChange={this.props.onChange}
                        required
                        maxLength='600'
                    />
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Where have you seen your pet the last time?*</Form.Label>
                            <AlgoliaPlaces
                                placeholder='location'
                                onChange={this.props.handleAlgoliaChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Is there a reward for the founder?</Form.Label>
                            <Form.Control
                                type='text'
                                name='reward'
                                value={this.props.reward}
                                onChange={this.props.onChange}
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
                                value={this.props.phone}
                                onChange={this.props.onChange}
                                placeholder='012 3456789'
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Please enter your mail address!</Form.Label>
                            <Form.Control
                                type='email'
                                name='mail'
                                value={this.props.mail}
                                onChange={this.props.onChange}
                                placeholder='example@mail.com'
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Button className='create__pet__submit' type="submit">
                    Submit
                </Button>
            </Form>
        )
    }
}