import React, { Component } from 'react';
import axios from 'axios';

export default class PetDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            petData: {}
        }
    }

    componentDidMount() {
        axios
            .get('http://localhost:8000/pets-list/' + window.location.href.split('/')[4])
            .then((res) => {
                this.setState({ petData: res.data.pet })
            })
    }
    render() {
        console.log(this.state.petData.petName);
        return(
            <div>
                <h1>{this.state.petData.petName}</h1>
            </div>
        )
    }
}