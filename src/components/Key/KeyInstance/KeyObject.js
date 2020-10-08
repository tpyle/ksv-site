import React, {useState} from 'react';
import { Eye, EyeSlash, ClipboardPlus } from 'react-bootstrap-icons';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Input from '../../Input';


export default ({ edit, onChange=(()=>{}), value, label, className, isPassword=false }) => {
    const [showPass, setShowPass] = useState(false);

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
                value={!isPassword || showPass ? value : "password"}
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
        </InputGroup>
    );
};
