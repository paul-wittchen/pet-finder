import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PetCard from '../petCard/petCard.component';
import './list.scss';
import { Row, Col } from 'react-bootstrap';
import backendDomain from '../../../utility'

const ListPets = () => {

    const [pets, setPets] = useState([]);
    
    useEffect(() => {
        axios
        .post(`${backendDomain}/pets-list`)
        .then((res) => { setPets(res.data.pets) })
        .catch((error) => console.log(error))
    })
    
    return(
        <div className='pets__list__container'>
            <p className='pets__list__header'>The "runaways"</p>
            { pets && pets.length < 1 ? (
                <p className='pets__list__empty'>There are no open search calls</p>
                ) : (
                    <Row className='justify-content-center'>
                    {pets.map(pet => 
                        <Col lg={4} md={6} xs={12} key={pet.uuid}>
                            <PetCard
                                uuid={pet.uuid}
                                imageURL={pet.image}
                                petName={pet.petName}
                                petKind={pet.petKind}
                                description={pet.description}
                                location={pet.location}
                                reward={pet.reward}
                                createdAt={pet.createdAt}
                                phone={pet.phone}
                                mail={pet.mail}
                            />
                        </Col>
                    )}
                </Row>
            )}
        </div>
    )
}

export default ListPets;
