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
                <Navbar className='navbar__main' bg="dark" variant="dark">
                    <Navbar.Brand href="/">Navbar</Navbar.Brand>
                    <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/pets-list">All-pets</Nav.Link>
                    <Nav.Link href="/lost-pet">Lost-a-pet</Nav.Link>
                    <Nav.Link href="/found-pet">Found-a-pet</Nav.Link>
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
            )
        } else {
            return <></>
        }
        
    }
}