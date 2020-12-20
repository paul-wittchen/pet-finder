import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import './usersPets.scss';

const UsersPets = (props) => {

    const [pets, setPets] = useState(props.pets)

    const remove = (uuid) => {
        setPets(...pets, pets.filter(pet => pet.uuid !== uuid))
        props.deletePet(uuid)
    }
    
    return (
        <div className='users__pets__container'>
            {pets.map(pet => 
                <Card className='users__pets__card' key={pet.uuid}>
                    <Link to={`/pets-list/${pet.uuid}`}>
                    <Card.Img className='users__pets__image' variant="top" src={pet.image}/>
                    <Card.Body>
                        <Card.Title className='users__pets__name'>{pet.petName}</Card.Title>
                        <div className='users__pets__time'>
                            <Moment fromNow>{pet.createdAt}</Moment>
                        </div>
                        <Card.Text  className='users__pets__desc'>
                            {pet.description}
                        </Card.Text>
                        <Card.Text className='users__pets__location text-center'>
                            <i className="fas fa-map-marker-alt"></i> {pet.location}
                        </Card.Text>
                    </Card.Body>
                    </Link>
                    <Card.Footer className="text-muted justify-content-center">
                        <p className='users__pets__btn' onClick={() => {remove(pet.uuid)}}>
                            <i className="fas fa-smile-beam"></i> I found my pet
                        </p>
                    </Card.Footer>
                </Card>
            )}
        </div>
    )
}

export default UsersPets;
