import React, { Component } from 'react';
import axios from 'axios';
import PetCard from '../petCard/petCard.component';
import './list.scss';
import { Row, Col } from 'react-bootstrap';
import backendDomain from '../../../utility'

export default class ListPets extends Component {
    constructor() {
        super()

        this.state = {
            pets: []
        }
    }

    componentDidMount() {
        axios
            .post(`${backendDomain}/pets-list`)
            .then((res) => {
                this.setState({
                    pets: res.data.pets
                })
            })
            .catch((error) => console.log(error))
    }

    render() {
        console.log(this.state);
        return(
            <div className='pets__list__container'>
                <p className='pets__list__header'>The "runaways"</p>
                <Row className='justify-content-center'>
                    {this.state.pets.map(pet => 
                        <Col lg={4} md={6} xs={12}>
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
                                key={pet.createdAt}
                            />
                        </Col>
                    )}
                </Row>
            </div>
        )
    }
}
