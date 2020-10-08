import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';

import Input from '../Input';


export default ({ allKeyNames, currentKey, currentValue, updateKey, onCancel }) => {
    const [cKeyName, setCKeyName] = useState(currentKey || "");
    const [isAlias, setIsAlias] = useState(typeof(currentValue) === "string");
    const dAliasValue = isAlias ? currentValue : allKeyNames && allKeyNames.length ? allKeyNames[0] : "";
    const [aliasValue, setAliasValue] = useState(dAliasValue);
    const [validated, setValidated] = useState(false);
    const [errMessage, setErr] = useState(null);


    function submit(event) {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() !== false) {
            let result = updateKey(currentKey, { name: cKeyName, value: isAlias ? aliasValue : [] });
            if (result.err) {
                setErr(result.err);
            }
        } else {
            setValidated(true);
        }
    }


    return (
        <Form noValidate validated={validated} onSubmit={submit}>
            <Form.Group controlId="key-name">
                <Form.Label>Key Identifier</Form.Label>
                <Input required value={cKeyName} onChange={setCKeyName} />
                <Form.Control.Feedback type="invalid">
                    Please provide an identifier
                </Form.Control.Feedback>
            </Form.Group>
            {allKeyNames && allKeyNames.length ?
                <Form.Group controlId="key-is-alias">
                    <Form.Check
                        checked={isAlias}
                        onChange={()=>setIsAlias(!isAlias)}
                        type="checkbox"
                        label="Is this key an alias?"
                    />
                </Form.Group>
            : null }
            { isAlias ?
                <Form.Group controlId="key-alias-select">
                    <Form.Label>Please Select what this is an alias for:</Form.Label>
                    <Input required as="select" value={aliasValue} onChange={setAliasValue}>
                        {allKeyNames.map(k=>
                            <option key={k}>{k}</option>
                        )}
                    </Input>
                </Form.Group>
            : null}
            <ButtonGroup>
                <Button type="submit">
                    {currentKey ? "Update" : "Create"}
                </Button>
                {onCancel ?
                    <Button onClick={onCancel} variant="danger">
                        Cancel
                    </Button>
                : null}
            </ButtonGroup>
            {errMessage ?
                <Alert className="mt-2" variant="danger">
                    {errMessage}
                </Alert>
            : null}
        </Form>
    );
};
