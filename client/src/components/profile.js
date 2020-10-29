import React, { Component } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

export default class Profile extends Component {
    constructor() {
        super()
        const token = Cookies.get('token');

        this.state = {
            user: {},
            token
        }
    }

    componentDidMount() {
        axios
            .post('http://localhost:8000/profile', { token: this.state.token })
            .then((res) => {
                this.setState({ user: res.data.profile })
            })
            .catch((error) => console.log(error))
    }

    logout = () => {
        Cookies.remove('token')
        window.location('/login')
    }

    render() {
        return(
            <div>
                <p>{this.state.user.firstname} {this.state.user.lastname}</p>
                <a href="/" onClick={this.logout}>Logout</a>
            </div>
            
        )
    }
}