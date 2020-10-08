import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

import KeyObject from './KeyObject';


export default ({ username, email, password, pin, onUpdate, ...props }) => {
    const hasValue = [username, email, password, pin].filter(k=>k !== undefined).length > 0;
    const [isEditting, setIsEditting] = useState(!hasValue);

    const [cUsername, setCUsername] = useState(username || "");
    const [cEmail, setCEmail] = useState(email || "");
    const [cPassword, setCPassword] = useState(password || "");
    const [cPIN, setCPIN] = useState(pin || "");

    return (
        <>
            {isEditting || cUsername ?
                <KeyObject onChange={setCUsername} edit={isEditting} label="Username" value={cUsername} /> 
            : null}
            {isEditting || cEmail ? 
                <KeyObject onChange={setCEmail} edit={isEditting} className={isEditting || cUsername ? "mt-3" : ""} label="Email" value={cEmail} />
            : null}
            {isEditting || cPassword ? 
                <KeyObject onChange={setCPassword} edit={isEditting} className={isEditting || cUsername || cEmail ? "mt-3" : ""} label="Password" value={cPassword} isPassword={true} />
            : null}
            {isEditting || cPIN ?
                <KeyObject onChange={setCPIN} edit={isEditting} className={isEditting || cUsername || cEmail || cPassword ? "mt-3" : ""} label="PIN" value={cPIN} isPassword={true} />
            : null}
            <Button className="mt-3" variant={isEditting ? "success" : "secondary"} onClick={()=>setIsEditting(!isEditting)}>
                {isEditting ? "Commit Change" : "Edit"}
            </Button>
        </>
    )
};
