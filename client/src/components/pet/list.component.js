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
        console.log(this.state.pets);
        return(
            <div className='pets__list__container'>
                <svg className='svg__top' viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#E76F51" d="M66.3,3.6C66.4,25.6,33.2,51.2,8.3,51.2C-16.5,51.2,-33.1,25.6,-30.1,3.6C-33.1,-18.5,-16.5,-36.9,8.3,-36.9C33.2,-36.9,66.3,-18.5,66.3,3.6Z" transform="translate(100 100)" />
                </svg>
                <p className='pets__list__header'>List all pets</p>
                <Row lg={4} md={2} sm={1} className='justify-content-center'>
                        {this.state.pets.map(pet => 
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
                        )}
                </Row>
                <svg className='svg__bottom' viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#E76F51" d="M52.7,-12.2C52.7,6.5,26.4,13,-2,13C-30.4,13,-60.7,6.5,-60.7,-12.2C-60.7,-31,-30.4,-62,-2,-62C26.4,-62,52.7,-31,52.7,-12.2Z" transform="translate(100 100)" />
                </svg>
            </div>
        )
    }
}