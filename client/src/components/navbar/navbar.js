import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Cookies from 'js-cookie';
import './navbar.scss';

export default class Navigation extends Component {
    constructor() {
        super()

        this.state = {
            loading: true,
            loggedIn: false
        }
    }

    componentDidMount() {
        this.setState({
            loading: false,
            loggedIn: Cookies.get('token') !== undefined
        })
    }

    logout = () => {
        Cookies.remove('token')
        window.location('/login')
    }

    render() {
        if (!this.state.loading) {
            return(
                <div className='navbar__container justify-content-center text-center'>
                    <Navbar className='navbar__main' expand="lg">
                        <Navbar.Brand href="/">PetFinder</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/pets-list">All-pets</Nav.Link>
                        {this.state.loggedIn ? (
                            <Nav.Link href="/lost-pet">Lost-a-pet</Nav.Link>
                        ) : (
                            <Nav.Link href="/signup">Lost-a-pet</Nav.Link>
                        )}
                        {this.state.loggedIn ? (
                            <>
                                <Nav.Link href='/profile'>Profile</Nav.Link>
                                <Nav.Link href="/" onClick={this.logout}>Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                            <Nav.Link href="/signup">Signup</Nav.Link>
                            <Nav.Link href="/login">Login</Nav.Link> 
                            </>  
                        )}       
                        
                        </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            )
        } else {
            return <></>
        }
        
    }
}