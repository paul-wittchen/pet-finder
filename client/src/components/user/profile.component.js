import React, { Component } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

export default class Profile extends Component {
    constructor() {
        super()
        const token = Cookies.get('auth-token')
        this.state = {
            user: {},
            token
        }
    }

    componentDidMount() {
        axios.post('/profile', { token: this.state.token })
            .then((res) => this.setState({ user: res.data.user }))
            .catch((err) => console.log(err))
            console.log(this.state.user);
    }

    logout = () => {
        Cookies.remove('auth-token')
        window.location = '/login';
    }

    render() {
        return(
            <div>
                <h1>{this.state.user.firstname}</h1>
                <a href='/' onClick={this.logout}>Logout</a>
            </div>
        )
    }
}