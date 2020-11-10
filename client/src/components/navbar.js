import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Cookies from 'js-cookie';
import '../styles/navbar.scss';

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
    render() {
        if (!this.state.loading) {
            return(
                <div className='navbar__container justify-content-center text-center'>
                    <Navbar className='navbar__main'>
                        <Nav className="mr-auto">
                        <Navbar.Brand href="/">PetFinder</Navbar.Brand>
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/pets-list">All-pets</Nav.Link>
                        {this.state.loggedIn ? (
                            <Nav.Link href="/lost-pet">Lost-a-pet</Nav.Link>
                        ) : (
                            <Nav.Link href="/signup">Lost-a-pet</Nav.Link>
                        )}
                        {this.state.loggedIn ? (
                            <Nav.Link href='/profile'>Profile</Nav.Link>
                        ) : (
                            <>
                            <Nav.Link href="/signup">Signup</Nav.Link>
                            <Nav.Link href="/login">Login</Nav.Link> 
                            </>  
                        )}       
                        </Nav>
                    </Navbar>
                </div>
            )
        } else {
            return <></>
        }
        
    }
}