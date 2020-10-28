import React, { Component } from 'react';
import Cookies from 'js-cookie';

export default class Profile extends Component {
    constructor() {
        super()

        const token = Cookies.get('auth-token')

        this.state = {
            token
        }
    }

    logout = () => {
        Cookies.remove('auth-token')
        window.location = '/login';
    }

    render() {
        return(
            <div>
                <a href='/' onClick={this.logout}>Logout</a>
            </div>
        )
    }
}