import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './create.scss';
import BounceLoader from "react-spinners/BounceLoader";
import CreateForm from './createForm.component';
import backendDomain from '../../../utility'

const CreatePet = () => {

    const [petName, setPetName] = useState('');
    const [image, setImage] = useState(null);
    const [petKind, setPetKind] = useState('Something else');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [lat, setLat] = useState(0.0);
    const [lon, setLon] = useState(0.0);
    const [reward, setReward] = useState('');
    const [phone, setPhone] = useState('');
    const [mail, setMail] = useState('');
    const [uploading, setUploading] = useState(false)

    const handleAlgoliaChange = (query) => {
        setLocation(`${query.suggestion.name}, ${query.suggestion.city}`)
        setLat(query.suggestion.latlng.lat)
        setLon(query.suggestion.latlng.lng)
    }

    const onDrop = (event) => {
        setImage(event.target.files[0])
    }

    const removeImage = () => {
        setImage(null)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        setUploading(true)

        const data = new FormData();
        data.append('image', image, image.name)
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
                        petName: petName,
                        image: res.data.imageURL,
                        petKind: petKind,
                        description: description,
                        location: location,
                        lat: lat,
                        lon: lon,
                        date: Date.now(),
                        reward: reward,
                        phone: phone,
                        mail: mail,
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
    if (!uploading) {
        return(
            <div>
                <p className='pet__create__header'>Create your search call</p>
                <CreateForm
                    onSubmit={onSubmit}
                    onDrop={onDrop}
                    petNameChange={event => setPetName(event.target.value)}
                    petKindChange={event => setPetKind(event.target.value)}
                    descriptionChange={event => setDescription(event.target.value)}
                    rewardChange={event => setReward(event.target.value)}
                    phoneChange={event => setPhone(event.target.value)}
                    mailChange={event => setMail(event.target.value)}
                    removeImage={removeImage}
                    image={image}
                    petName={petName}
                    petKind={petKind}
                    description={description}
                    handleAlgoliaChange={handleAlgoliaChange}
                    reward={reward}
                    phone={phone}
                    mail={mail}
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
                    loading={uploading}
                />
            </div>
        )
    }
}

export default CreatePet;