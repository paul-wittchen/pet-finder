import React, { Component } from 'react';
import axios from 'axios';
import PetCard from './petCard.component';
import '../../styles/petsList.scss';
import { Row } from 'react-bootstrap';
import backendDomain from '../../utility'

export default class ListPets extends Component {
    constructor() {
        super()

        this.state = {
            pets: []
        }
    }

    componentDidMount() {
        axios
            .get(`${backendDomain}/pets-list`)
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
                <svg className='svg__top' viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#E76F51" d="M66.3,3.6C66.4,25.6,33.2,51.2,8.3,51.2C-16.5,51.2,-33.1,25.6,-30.1,3.6C-33.1,-18.5,-16.5,-36.9,8.3,-36.9C33.2,-36.9,66.3,-18.5,66.3,3.6Z" transform="translate(100 100)" />
                </svg>
                <p className='pets__list__header'>The "runaways"</p>
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
            </div>
        )
    }
}
