import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';

import Header from './components/Header';
import Main from './components/Main';


function App() {
    const isLoggedIn = true;

    return (
        <div className="App">
            <Header isLoggedIn={isLoggedIn} />
            <Container fluid className="pt-3">
                {isLoggedIn ? <Main /> : null}
            </Container>
        </div>
    );
}

export default App;
