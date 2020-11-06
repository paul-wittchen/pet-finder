import React, {Component} from 'react'

class Pet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pet: props.pet
        }
    }

    render() {
        return <div>
            <div>{this.state.pet.petName}</div>
        </div>
    }
}

export default Pet