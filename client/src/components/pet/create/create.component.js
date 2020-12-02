import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './create.scss';
import BounceLoader from "react-spinners/BounceLoader";
import CreateForm from './createForm.component';
import backendDomain from '../../../utility'

export default class CreatePet extends Component {
    constructor() {
        super()

        this.state = {
            petName: '',
            image: null,
            petKind: 'Something else',
            description: '',
            location: '',
            lat: 0.0,
            lon: 0.0,
            reward: '',
            phone: '',
            mail: '',
            uploading: false
        }
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleAlgoliaChange = (query) => {
        this.setState({
            location: `${query.suggestion.name}, ${query.suggestion.city}`,
            lat: query.suggestion.latlng.lat,
            lon: query.suggestion.latlng.lng
        })
    }

    onDrop = (event) => {
        this.setState({
            image: event.target.files[0]
        });
    }

    removeImage = () => {
        this.setState({
            image: null
        })
    }

    onSubmit = (event) => {
        event.preventDefault();

        this.setState({
            uploading: true
        })

        const data = new FormData();
        data.append('image', this.state.image, this.state.image.name)
        data.append('token', Cookies.get('token'))

        axios
            .post(`${backendDomain}/upload-pet-image`, data, {
                headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data`
                }
            })
            .then(res => {
                if(res.data.status) {                
                    const pet = {
                        petName: this.state.petName,
                        image: res.data.imageURL,
                        petKind: this.state.petKind,
                        description: this.state.description,
                        location: this.state.location,
                        lat: this.state.lat,
                        lon: this.state.lon,
                        date: this.state.date,
                        reward: this.state.reward,
                        phone: this.state.phone,
                        mail: this.state.mail,
                        token: Cookies.get('token')
                    }
            
                    axios
                        .post(`${backendDomain}/lost-pet`, pet)
                        .then((res) => window.location = res.data.url)
                } else {
                    console.log('request failed');
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        if (!this.state.uploading) {
            return(
                <div>
                    <p className='pet__create__header'>Create your search call</p>
                    <CreateForm
                        onSubmit={this.onSubmit}
                        onDrop={this.onDrop}
                        onChange={this.onChange}
                        removeImage={this.removeImage}
                        onImageSelect={this.onImageSelect}
                        image={this.state.image}
                        petName={this.state.petName}
                        petKind={this.state.petKind}
                        description={this.state.description}
                        handleAlgoliaChange={this.handleAlgoliaChange}
                        reward={this.state.reward}
                        phone={this.state.phone}
                        mail={this.state.mail}
                    />
                </div>
            )
        } else {
            return(
                <div className='pet__create__loader__container'>
                    <p className='pet__create__loader__header'>Uploading . . .</p>
                    <BounceLoader
                        size={240}
                        color={"#264653"}
                        loading={this.state.uploading}
                    />
                </div>
            )
        }
    }
}