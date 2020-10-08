import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Cryptr from 'cryptr';

import KeyList from '../KeyList';
import Input from '../Input';

import { putKeys, getKeys } from '../../api';


export default () => {
    const [enc, setEnc] = useState(null);
    const [dec, setDec] = useState(null);
    const [key, setKey] = useState("");
    const [err, setErr] = useState(null);
    const [decErr, setDecErr] = useState(false);


    useEffect(()=>{
        getKeys()
            .then(setEnc)
            .catch(setErr);
    }, [])


    function tryDecrypt(event) {
        event.preventDefault();
        event.stopPropagation();

        if (enc === "") {
            return setDec({});
        }

        const cryptr = new Cryptr(key);
        try {
            let dec = cryptr.decrypt(enc);
            setDec(JSON.parse(dec));
        } catch (error) {
            setDecErr(true);
        }
    }


    function encrypt(keys) {
        const cryptr = new Cryptr(key);
        let enc = cryptr.encrypt(JSON.stringify(keys));
        console.log(enc);
        putKeys(enc);
    }

    
    if (err) {
        return "Something went wrong!";
    }

    if (enc === null) {
        return (
            <div className="d-flex justify-content-center">
                <Spinner className="mx-auto text-center" animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        );
    }
    
    if (dec === null) {
        return (
            <Form autoComplete="off" onSubmit={tryDecrypt}>
                <Form.Label htmlFor="ksv-dec">Please enter your decryption key below:</Form.Label>
                <Input id="ksv-dec" aria-describedby="ksv-dec-desc" value={key} onChange={setKey} />
                { enc === "" ? 
                    <Form.Text id="ksv-dec-desc" muted>
                        Looks like you haven't used this before. Please make sure your decryption password is easy to remember, as it <em><strong>cannot</strong></em> be recovered. Additionally, please make sure that your password is suitably complex, and hard to guess.
                    </Form.Text> : null }
                <Button className="my-2" type="submit" variant="success">Decrypt</Button>
                {decErr ?
                    <Alert variant="danger">
                        Something went wrong while decrypting. Did you type your key in wrong?
                    </Alert>
                : null }
            </Form>
        );
    }

    return (
        <KeyList keys={dec} encrypt={encrypt} />
    );
};
