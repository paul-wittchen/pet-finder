import React, { Component } from 'react';
import axios from 'axios';
import PetCard from './petCard.component';
import '../../styles/petsList.scss';
import { Row } from 'react-bootstrap';

export default class ListPets extends Component {
    constructor() {
        super()

        this.state = {
            pets: []
        }

    }

    componentDidMount() {
        axios
            .get('http://localhost:8000/pets-list')
            .then((res) => {
                this.setState({
                    pets: res.data.pets
                })
            })
            .catch((error) => console.log(error))
    }

    render() {
        return(
            <div className='pets__list__container'>
                <p className='pets__list__header'>List all pets</p>
                <Row lg={4} md={2} sm={1} className='justify-content-center'>
                        {this.state.pets.map(pet => 
                            <PetCard
                                petName={pet.petName}
                                petKind={pet.petKind}
                                description={pet.description}
                                location={pet.location}
                                time={pet.time}
                                date={pet.date}
                                reward={pet.reward}
                                createdAt={pet.createdAt}
                                key={pet.createdAt}
                            />
                        )}
                </Row>
            </div>
        )
    }
}