import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import Input from "../../Input";


export default ({ username="", email="", password="", pin=""}={}) => {
    const [cUsername, setCUsername] = useState(username);
    const [cEmail, setCEmail] = useState(email);
    const [cPassword, setCPassword] = useState(password);
    const [cPin, setCPin] = useState(pin);
    
    return (
        <Form>
            <Input value={cUsername} onChange={setCUsername} />
            <Input value={cEmail} onChange={setCEmail} />
            <Input value={cPassword} onChange={setCPassword} />
            <Input value={cPin} onChange={setCPin} />
        </Form>
    )
};
