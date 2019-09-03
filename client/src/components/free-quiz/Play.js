import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

class Play extends Component {
    render () {
        return (
            <Fragment>
                <Helmet><title>Instaquiz - Play for Free</title></Helmet>
                <h1>Play Component</h1>
                <h3><Link to="/play/freeQuiz">Start Quiz</Link></h3>
            </Fragment>
        );
    }
}

export default Play;