import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Home extends Component {

    componentDidMount () {
        if (this.props.auth.authenticated) {
            this.props.history.push('/dashboard');
        }
    }

    render () {
        return (
            <Fragment>
                <Helmet><title>Instaquiz - Home</title></Helmet>
                <div id="home">
                    <section>
                        <div style={{ textAlign: 'center' }}>
                            <span className="mdi mdi-cube-outline cube"></span>
                        </div>
                        <h1>InstaQuiz</h1>
                        <div className="playButtonContainer">
                            <ul>
                                <li>
                                    <Link className="playButton" to="/play/instructions">Play</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="authContainer">
                            <Link to="/login" className="authButtons" id="loginButton">Login</Link>
                            <Link to="/register" className="authButtons" id="signupButton">Signup</Link>
                        </div>
                    </section>
                </div>
            </Fragment>
        );
    }
}

Home.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Home);