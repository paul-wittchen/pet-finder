import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

export default class Navigation extends Component {
    constructor() {
        super()

        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        this.setState({
            loading: false
        })
    }
    render() {
        if (!this.state.loading) {
            return(
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">Navbar</Navbar.Brand>
                    <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="#features">All-pets</Nav.Link>
                    <Nav.Link href="#features">Lost-a-pet</Nav.Link>
                    <Nav.Link href="#features">Found-a-pet</Nav.Link>
                    <Nav.Link href="/profile">Profile</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/signup">Signup</Nav.Link>
                    </Nav>
                </Navbar>
            )
        } else {
            return <></>
        }
        
    }
}