import React, { useRef } from 'react';
import { Button, Container, Form, Image, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const nav = useNavigate()
    const queryRef = useRef();

    const handleSearch = (e) => {
        e.preventDefault();
        const query = queryRef.current.value;
        nav(`/movieList/?search=${query}`)
    }
    return (
        <Navbar
            bg='dark'
            data-bs-theme='dark'
            className='px-5 bg-body-tertiary'
            expand='lg'
        >
            <Container fluid>
                <Navbar.Brand href='/'>
                    <Image
                        src='./logo_transparent.png'
                        fluid
                        style={{ maxHeight: '50px', width: '180px' }}
                        className='p-1'
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='navbarScroll' />
                <Navbar.Collapse id='navbar'>
                    <Nav
                        className='me-auto my-2 my-lg-0'
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Link to='/' className='link-item'>Home</Link>
                        <Link to='/' className='link-item'>Movies</Link>
                    </Nav>
                    <Form className='d-flex' onSubmit={handleSearch}>
                        <Form.Control
                            type='search'
                            placeholder='Search'
                            className='me-2'
                            data-bs-theme='light'
                            aria-label='Search'
                            ref={queryRef}
                            required
                        />
                        <Button variant='outline-danger' type='submit'>Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
