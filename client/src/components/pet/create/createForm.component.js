import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import AlgoliaPlaces from 'algolia-places-react';
import './createForm.scss';

const FormCreate = (props) => {

    return(
        <Form className='create__pet__form' onSubmit={props.onSubmit}>
            { props.image === null ? (
                <div className='pet__create__image__wrapper'>
                    <div className="pet__create__image__upload__wrapper">
                        <div className="pet__create__image__upload">
                            <input
                                type="file" 
                                onChange={props.onDrop}
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
                        <i className="far fa-image fa-lg"></i> {props.image.name}
                    </p>
                    <p className='pet__create__image__remove' onClick={props.removeImage}>
                        Remove picture
                    </p>
                </div>
            )}
            <Row>
                <Col lg={6} md={6} xs={12}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Whats the name of your pet?*</Form.Label>
                        <Form.Control 
                            type="text" 
                            name='petName'
                            value={props.petName}
                            onChange={props.petNameChange}
                            placeholder='e.g. Fluffy'
                            required
                        />
                    </Form.Group>
                </Col>
                <Col lg={6} md={6} xs={12}>
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>What kind of pet, are you missing?*</Form.Label>
                        <Form.Control 
                            as="select"
                            defaultValue="Choose..."
                            name='petKind'
                            onChange={props.petKindChange}
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
                    value={props.description}
                    onChange={props.descriptionChange}
                    required
                    maxLength='600'
                />
            </Form.Group>
            <Row>
                <Col lg={6} md={6} xs={12}>
                    <Form.Group>
                        <Form.Label>Where have you seen your pet the last time?*</Form.Label>
                        <AlgoliaPlaces
                            placeholder='location'
                            onChange={props.handleAlgoliaChange}
                            required
                        />
                    </Form.Group>
                </Col>
                <Col lg={6} md={6} xs={12}>
                    <Form.Group>
                        <Form.Label>Is there a reward for the founder?</Form.Label>
                        <Form.Control
                            type='text'
                            name='reward'
                            value={props.reward}
                            onChange={props.rewardChange}
                            placeholder='e.g. 100$'
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col lg={6} md={6} xs={12}>
                    <Form.Group>
                        <Form.Label>Please enter your phone number!</Form.Label>
                        <Form.Control
                            type='text'
                            name='phone'
                            value={props.phone}
                            onChange={props.phoneChange}
                            placeholder='012 3456789'
                        />
                    </Form.Group>
                </Col>
                <Col lg={6} md={6} xs={12}>
                    <Form.Group>
                        <Form.Label>Please enter your mail address!</Form.Label>
                        <Form.Control
                            type='email'
                            name='mail'
                            value={props.mail}
                            onChange={props.mailChange}
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

export default FormCreate;