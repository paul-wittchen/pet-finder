import React, {Component} from 'react'
import Pet from './pet/pet'

class PetList extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return this.props.pets.map(pet => <Pet pet={pet} key={pet.uuid}/>)
    }
}

export default PetList