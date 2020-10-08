import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

export default ({ isLoggedIn })=>{
    const variant = isLoggedIn ? "success" : "warning";
    return (
        <Navbar sticky="top" bg={variant} variant="dark">
            <Navbar.Brand className="mx-auto" href="#">Password Manager</Navbar.Brand>
        </Navbar>
    );
}
