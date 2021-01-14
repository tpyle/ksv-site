import React, { useState } from 'react';
import { Eye, EyeSlash, ClipboardPlus, ArrowClockwise } from 'react-bootstrap-icons';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Input from '../../Input';
import { generatePassword, generatePin } from '../../../code';


function KeyObject({ edit, onChange=(()=>{}), value, label, className, isPassword=false, passType=undefined }) {
    const [showPass, setShowPass] = useState(false);

    function swapPassword(newvalue) {
        if (!newvalue) {
            newvalue = passType !== "PIN" ? generatePassword() : generatePin();
        }
        console.log(newvalue);
    }

    return (
        <InputGroup className={className}>
            {label ?
                <InputGroup.Prepend>
                    <InputGroup.Text>
                        {label}
                    </InputGroup.Text>
                </InputGroup.Prepend> 
            : null}
            <Input
                onChange={edit ? onChange : ()=>{}}
                value={edit || !isPassword || showPass ? value : "password"}
                type={edit || !isPassword || showPass ? "text" : "password"} />
            {!edit && isPassword ?
                <InputGroup.Append>
                    <Button id="display-icon" variant="secondary" onClick={()=>setShowPass(!showPass)}>
                        {showPass ? <EyeSlash /> : <Eye />}
                    </Button>
                </InputGroup.Append>
            : null}
            {!edit ? 
                <InputGroup.Append>
                    <CopyToClipboard text={value}>
                        <Button id="clipboard-icon">
                            <ClipboardPlus />
                        </Button>
                    </CopyToClipboard>
                </InputGroup.Append>
            : null}
            {edit && isPassword ?
                <InputGroup.Append>
                    <Button id="regen-icon" variant="warning" onClick={()=>console.log(generatePassword())}>
                        <ArrowClockwise />
                    </Button>
                </InputGroup.Append>
            : null}
        </InputGroup>
    );
};

export default KeyObject;