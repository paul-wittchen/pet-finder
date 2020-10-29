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
            .post('/profile', { token: this.state.token })
            .then((res) => {
                this.setState({
                    user: res.data.user
                })
            })
            .catch((error) => console.log(error))
    }

    logout = () => {
        Cookies.remove('token')
        window.location('/login')
    }

    render() {
        return(
            <a href="/" onClick={this.logout}>Logout</a>
        )
    }
}