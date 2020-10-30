import React, { Component } from 'react';
import axios from 'axios';

export default class ListPets extends Component {
    constructor() {
        super()

        this.state = {
            pets: []
        }

    }

    componentDidMount() {
        axios
            .post('http://localhost:8000/pets-list')
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
            <div>
                <h1>List all pets</h1>
            </div>
        )
    }
}