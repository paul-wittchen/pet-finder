import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Cookies from 'js-cookie';
import './navbar.scss';

const Navigation = () => {

    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        setLoading(false);
        setLoggedIn(Cookies.get('token') !== undefined)
    }, [loading, loggedIn]);

    const logout = () => {
        Cookies.remove('token')
        window.location('/login')
    }
        if (!loading) {
            return(
                <div className='navbar__container justify-content-center text-center'>
                    <Navbar className='navbar__main' expand="lg">
                        <Navbar.Brand href="/">PetFinder</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/pets-list">All-pets</Nav.Link>
                            {loggedIn ? (
                                <>
                                    <Nav.Link href="/lost-pet">Lost-a-pet</Nav.Link>
                                    <Nav.Link href='/profile'>Profile</Nav.Link>
                                    <Nav.Link href="/" onClick={logout}>Logout</Nav.Link>
                                </>
                            ) : (
                                <>
                                    <Nav.Link href="/signup">Lost-a-pet</Nav.Link>
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
            return null
        }
}

export default Navigation;