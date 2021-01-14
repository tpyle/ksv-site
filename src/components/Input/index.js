import React, { useRef } from 'react';
import Form from 'react-bootstrap/Form';

 
function Input({ onChange, ...props }) {
    const inputRef = useRef(null);


    return (
        <Form.Control 
            ref={inputRef}
            onChange={()=>onChange(inputRef.current.value)}
            {...props}
        />
    )
};   

export default Input;