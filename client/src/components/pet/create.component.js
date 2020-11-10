import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../../styles/createPet.scss';
import BounceLoader from "react-spinners/BounceLoader";
import CreateForm from './createForm.component';

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

        axios.post('http://localhost:8000/upload-pet-image', data, {
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
                    .post('http://localhost:8000/lost-pet', pet)
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
                    <svg className='svg__right' viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#E76F51" d="M46,-24C56,-9.2,58,12.7,49,20.4C40,28,20,21.4,5.8,18.1C-8.4,14.7,-16.8,14.6,-26.1,6.8C-35.4,-1.1,-45.7,-16.7,-41.5,-28.1C-37.3,-39.5,-18.6,-46.6,-0.3,-46.5C18,-46.3,36,-38.7,46,-24Z" transform="translate(100 100)" />
                    </svg>
                </div>
            )
        } else {
            return(
                <div className='pet__create__loader__container'>
                    <p className='pet__create__loader__header'>Uploading . . .</p>
                    <BounceLoader
                        size={240}
                        color={"#E76F51"}
                        loading={this.state.uploading}
                    />
                </div>
            )
        }
    }
}