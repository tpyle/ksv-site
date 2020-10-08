import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Pencil, Plus, Trash } from 'react-bootstrap-icons';

import KeyInstance from './KeyInstance';
import KeyInstanceForm from './KeyInstanceForm';
import KeyForm from '../KeyForm';
import ConfirmModal from '../ConfirmModal';


export default ({ name, aliasValue, values, allKeyNames, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);

    function updateKey() {
        let res = onUpdate.apply(null, arguments);
        if (!res || !res.err) {
            setIsEditing(false);
        }
        return res;
    }

    if (isEditing) {
        return (
            <KeyForm
                currentKey={name}
                currentValue={aliasValue || values}
                allKeyNames={allKeyNames}
                updateKey={updateKey}
                onCancel={()=>setIsEditing(false)}
            />
        );
    }

    return (
        <div>
            <Row>
                <Col>
                    <h3 className="text-truncate">{ name }</h3>
                </Col>
                <Col xs="auto">
                    <ButtonGroup>
                        <Button variant="success" onClick={()=>setIsAdding(true)}>
                            <Plus />
                        </Button>
                        <Button variant="primary" onClick={()=>setIsEditing(true)}>
                            <Pencil />
                        </Button>
                        <Button variant="danger" onClick={()=>setShowDeleteConfirmModal(true)}>
                            <Trash />
                        </Button>
                    </ButtonGroup>
                </Col>
            </Row>
            <ConfirmModal
                isShown={showDeleteConfirmModal}
                onCancel={()=>{setShowDeleteConfirmModal(false)}}
                onConfirm={()=>onDelete && onDelete(name)}
                message={`Are you sure you want to delete the key ${name}?`}
            />
            { aliasValue !== undefined ?
                <Form.Text muted>
                    This is an alias for {aliasValue}
                </Form.Text>
            : null }
            <ListGroup variant="flush">
                {values.map(v=>(
                    <ListGroup.Item
                            key={v.username || v.email}>
                        <KeyInstance {...v} onUpdate={console.log} />
                    </ListGroup.Item>
                ))}
                {isAdding ?
                    <ListGroup.Item>
                        <KeyInstance onUpdate={console.log} />
                    </ListGroup.Item>
                : null}
            </ListGroup>
        </div>
    );
}
