import React, { useContext, useState } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { User } from '../../App';
import { motion } from "framer-motion"

// ::::::: NAVBAR ::::::::://
const NavbarComponent = () => {
    // Get user-Info
    const userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn'))
    const [user, setUser] = useContext(User)

    const navigate = useNavigate()
    // Search-bar Handler
    const searchBarHandle = (e) => {
        console.log(e.target.value);
    }

    // LogOut Handler 
    const logOutHandler = () => {
        // Remove user
        localStorage.removeItem('userLoggedIn')
        const userInfo = {
            username: '',
            email: '',
            error: ''
        }
        setUser(userInfo)
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="" variant="light" fixed='top' className='tw-bg-black/25 tw-backdrop-blur-md py-1'>
                <Container className='xl:tw-space-x-10 lg:tw-space-x-5 md:tw-text-center'>

                    {/* Brand logo */}
                    <Navbar.Brand href='/destinations'>
                        <img src='/logo192.png' className='tw-max-h-12 tw-brightness-200 tw-invert tw-contrast-200' alt="Logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle className='text-light' aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className='xl:tw-space-x-14 lg:tw-space-x-10'>

                            {/* Searchbar */}
                            <Nav.Link className='xl:tw-w-96 lg:tw-w-90 '>
                                <input onChange={searchBarHandle}
                                    className='form-control'
                                    type="search"
                                    placeholder="Find destination"
                                    aria-label="Search"
                                    list='search-suggestions' />
                            </Nav.Link>
                            <datalist id="search-suggestions">
                                <option value="Sreemongle" />
                                <option value="Shundorbon" />
                                <option value="Sajek" />
                            </datalist>

                            {/* Links */}
                            <Nav.Link href='/destinations'
                                className=' text-light  tw-text-base my-auto fw-semibold active:tw-bg-black/50 rounded-3'>Destinations</Nav.Link>
                            <Nav.Link disabled className='tw-text-base text-light my-auto fw-semibold active:tw-bg-black/50 rounded-3'>Blog</Nav.Link>
                            <Nav.Link disabled className='tw-text-base text-light  my-auto fw-semibold  active:tw-bg-black/50 rounded-3'>Contact</Nav.Link>

                            <Nav.Link >
                                { /* Log out Button*/}
                                {userLoggedIn ? <motion.div>
                                    <Button
                                        onClick={logOutHandler}
                                        className='fw-semibold text-nowrap' variant="warning">Log out</Button>
                                </motion.div>

                                    /* Log in Button*/
                                    : <Button onClick={() => { navigate('/logIn') }}
                                        className='fw-semibold' variant="warning">Log in</Button>
                                }

                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default NavbarComponent;