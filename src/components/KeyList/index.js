import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import { Search, CaretLeftFill, Plus } from 'react-bootstrap-icons';

import Input from '../Input';
import Key from '../Key';
import KeyForm from '../KeyForm';


function resolveName(name, keyObject) {
    while (typeof(keyObject[name]) === "string") {
        name = keyObject[name];
    }
    return name
}


function resolveValues(name, keyObject) {
    name = resolveName(name, keyObject);
    return keyObject[name];
}


function findAliases(name, keyObject) {
    return Object.entries(keyObject).filter(([k])=>resolveName(k, keyObject) === name);
}


function KeyList ({ keys, encrypt }) {
    const [cKeys, setCKeys] = useState({
            "http://google.com": [{
                username: "tpyle",
                email: "thomas@pyle.tech",
                password: "lolfakepass",
                pin: "01289"
            }, {
                username: "samiam",
                email: "thomas@google.com",
                password: "passwordsaregay"
            }],
            "http://drive.google.com": "http://google.com",
            "http://thomaspyle.com": [{
                username: "admin",
                email: "thomas@pyle.tech",
                password: "supersecretadminpassword"
            }],
            "http://sso.thomaspyle.com": "http://thomaspyle.com"
    });
    const [search, setSearch] = useState("");
    const [current, setCurrent] = useState(null);
    const [update, doUpdate] = useState(new Date());


    function updateKey(identifier, { name, value }) {
        if (identifier) {
            //Updating key
            let nValue = typeof(value) === "string" ? value : cKeys[identifier];
            if (name !== identifier) {
                // We are changing the name as well
                cKeys[name] = nValue;
                findAliases(identifier, cKeys).forEach(([k,_])=>{
                    cKeys[k] = name;
                });
                delete cKeys[identifier];
                setCKeys(cKeys);
                setCurrent(name);
            } else {
                // We are just updating the value
                cKeys[identifier] = nValue;
                setCKeys(cKeys);
            }
        } else {
            if (cKeys[name]) {
                return { err: `'${name}' already exists as an identifier. Please use a different one.` };
            }
            //Creating new key
            cKeys[name] = value;
            setCKeys(cKeys);
            setCurrent(name);
        }
        return true;
    }


    function deleteKey(name) {
        delete cKeys[name];
        findAliases(name, cKeys).forEach(([k,_])=>{
            cKeys[k] = [];
        });

        setCKeys(cKeys);
        
        if (current === name) {
            setCurrent(null);
        }
    }


    return (
        <Row>
            <Col className={current !== null ? "d-none d-lg-block" : ""} xs="12" lg={current === null ? "12" : "4"}>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="search-icon"><Search /></InputGroup.Text>
                    </InputGroup.Prepend>
                    <Input value={search} onChange={setSearch} />
                    <InputGroup.Append>
                        <Button id="display-icon" variant="success" onClick={()=>setCurrent(1)}>
                            <Plus />
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
                <ListGroup variant="flush">
                    {Object.entries(cKeys).filter(([a])=>a.toLowerCase().indexOf(search) > -1).sort().map(([k,v]) => (
                        <ListGroup.Item
                                action
                                active={current === k}
                                key={k} 
                                onClick={()=>setCurrent(k)}>
                            {k}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Col>
            {current !== null ?
                <Col>
                    <Button className="mb-3 d-block d-lg-none" variant="secondary" onClick={()=>setCurrent(null)}>
                        <CaretLeftFill />
                    </Button>
                    { current !== 1 ?
                        <Key
                            key={current + typeof(resolveValues(current, cKeys)) + resolveValues(current, cKeys).length}
                            allKeyNames={Object.keys(cKeys).filter(k=>k !== current && typeof(cKeys[k]) !== "string")}
                            onUpdate={updateKey}
                            onDelete={deleteKey}
                            name={current}
                            values={resolveValues(current, cKeys)} 
                            aliasValue={typeof(cKeys[current]) === 'string' ? cKeys[current] : undefined} 
                        />
                    :
                        <KeyForm 
                            allKeyNames={Object.keys(cKeys).filter(k=>typeof(cKeys[k]) !== "string")}
                            updateKey={updateKey} />
                    }
                </Col>
            : null}
        </Row>
    );
}

export default KeyList;