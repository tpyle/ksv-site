import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { CopyToClipboard } from 'react-copy-to-clipboard';


export default ({ isLoggedIn })=>{
    const variant = isLoggedIn ? "success" : "warning";
    return (
        <Navbar sticky="top" bg={variant} variant="dark">
            <Navbar.Brand className="mx-auto" href="#">Password Manager</Navbar.Brand>
            <CopyToClipboard text={" "}>
                <Button variant="outline-light">
                    Clear Clipboard
                </Button>
            </CopyToClipboard>
        </Navbar>
    );
}
