import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Timer({ show, handleClose, handleDuration }) {
    const [minutes, setMinutes] = useState(30); // Default to 30 minutes

    const handleSave = () => {
        handleDuration(minutes);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Set Session Duration</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Select Duration (minutes):</Form.Label>
                        <Form.Control
                            as="select"
                            value={minutes}
                            onChange={(e) => setMinutes(Number(e.target.value))}
                        >
                            <option value={1}>1</option>
                            <option value={15}>15</option>
                            <option value={30}>30</option>
                            <option value={60}>60</option>
                            <option value={120}>120</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Timer;
