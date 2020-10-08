import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default ({ isShown, onCancel, onConfirm, message="Are you sure you want to do that?" }) => {
    
    return (
        <Modal show={isShown} onHide={onCancel}>
            <Modal.Header closeButton>
                <Modal.Title>Please Confirm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={onConfirm}>
                    Proceed
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
