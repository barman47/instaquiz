import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';

// import { getFreeQuestions } from '../actions/quizActions';

class Home extends Component {

    // componentDidMount () {
    //     this.props.getFreeQuestions();
    // }

    handlePlayButtonClick = () => {
        this.props.history.push('/');
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

// const mapStateToProps = (state) => ({
//     quiz: state.quiz
// });

export default Home;