import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css';
import classnames from 'classnames';
import { Helmet } from 'react-helmet';

import Loader from '../common/Loader';

import { getFreeQuestions, endFreeQuiz } from '../../actions/quizActions';

import isEmpty from '../../validation/is-empty';

import correctNotification from '../../assets/audio/correct-answer.mp3';
import wrongNotification from '../../assets/audio/wrong-answer.mp3';
import buttonSound from '../../assets/audio/button-sound.mp3';

class Play extends Component {
    constructor (props) {
        super(props);
        this.state = {
            type: '',
            questions: [],
            currentQuestion: {},
            nextQuestion: {},
            previousQuestion: {},
            answer: '',
            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            currentQuestionIndex: 0,
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            hints: 5,
            fiftyFifty: 2,
            usedFiftyFifty: false,
            loading: false,
            previousButtonDisabled: true,
            nextButtonDisabled: false,
            time: {}
        };
        this.interval = null
    }

    componentDidMount () {
        this.props.getFreeQuestions();
        this.setState({
            loading: true
        });
        this.startTimer();
    }
    
    componentWillUnmount () {
        clearInterval(this.interval);
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        if (!isEmpty(nextProps.quiz)) {
            this.setState({
                questions: nextProps.quiz.questions,
                type: nextProps.quiz.type,
                numberOfQuestions: nextProps.quiz.numberOfQuestions,
                loading: false
            }, () => {
                this.displayQuestion(this.state.questions);
                this.handleDisableButton();
            });
        }
    }

    handleDisableButton = () => {
        if (this.state.previousQuestion === undefined || this.state.currentQuestionIndex === 0) {
            this.setState({
                previousButtonDisabled: true
            });
        } else {
            this.setState({
                previousButtonDisabled: false
            });
        }

        if (this.state.nextQuestion === undefined || this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions) {
            this.setState({
                nextButtonDisabled: true
            });
        } else {
            this.setState({
                nextButtonDisabled: false
            });
        }
    }

    displayQuestion (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) {
        let { currentQuestionIndex } = this.state;
        if (!isEmpty(this.state.questions)) {
            questions = this.state.questions;
            currentQuestion = questions[currentQuestionIndex];
            nextQuestion = questions[currentQuestionIndex + 1];
            previousQuestion = questions[currentQuestionIndex - 1];
            const answer =  currentQuestion.answer;
            this.setState({
                currentQuestion,
                nextQuestion,
                previousQuestion,
                answer
            }, () => {
                this.showOptions();
                this.handleDisableButton();
            });
        }
    }

    handleOptionClick = (e) => {
        if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
            document.getElementById('correct-audio').play();
            setTimeout(() => {
                this.correctAnswer();
            }, 500);
        } else {
            document.getElementById('wrong-audio').play();
            setTimeout(() => {
                this.wrongAnswer();
            }, 500);
        }
    
        if (this.state.numberOfQuestions === 0) {
            const questionsArray = Object.keys(this.state.questions).map(i => this.state.questions[i]);
            this.setState({
                numberOfQuestions: questionsArray.length
            });
        }
    }
    
    handleNextButtonClick = (e) => {
        if (!this.state.nextButtonDisabled) {
            this.playButtonSound();
            if (this.state.nextQuestion !== undefined) {
                this.setState((prevState) => ({
                    currentQuestionIndex: prevState.currentQuestionIndex + 1
                }), () => {
                    this.displayQuestion(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
                });
            }
        }
    };

    handlePreviousButtonClick = (e) => {
        if (!this.state.previousButtonDisabled) {
            this.playButtonSound();
            if (this.state.previousQuestion !== undefined) {
                this.setState((prevState) => ({
                    currentQuestionIndex: prevState.currentQuestionIndex - 1
                }), () => {
                    this.displayQuestion(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
                });
            }
        }
    }

    hadleQuitButtonClick = (e) => {
        this.playButtonSound();
        if (window.confirm ('Are yoiu sure you want to quit?')) {
            this.props.history.push('/');
        }
    }

    handleLifeline = (e) => {
        switch (e.target.id) {
            case 'fiftyfifty':
                if (this.state.fiftyFifty > 0 && this.state.usedFiftyFifty === false) {
                    this.handleFiftyFifty();
                    this.setState((prevState) => ({
                        fiftyFifty: prevState.fiftyFifty - 1
                    }));
                }
                break;

            case 'hints':
                if (this.state.hints > 0) {
                    this.handleHints();
                    this.setState((prevState) => ({
                        hints: prevState.hints - 1
                    }));
                }
                break;

            default:
                break;
        }
    }

    handleFiftyFifty = () => {
        const options = document.querySelectorAll('.option');
        const randomNumbers = [];
        let indexOfAnswer;

        options.forEach((option, index) => {
            if (option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
                indexOfAnswer = index;
            }
        });

        let count = 0;
        do {
            const randomNumber = Math.floor(Math.random() * 4);
            if (randomNumber !== indexOfAnswer) {
                if (randomNumbers.length < 2) {
                    if (!randomNumbers.includes(randomNumber) && !randomNumbers.includes(indexOfAnswer)) {
                        randomNumbers.push(randomNumber);
                        count ++;
                    } else {
                        while (true) {
                            const newRandomNumber = Math.floor(Math.random() * 4);
                            if (!randomNumbers.includes(newRandomNumber) && newRandomNumber !== indexOfAnswer) {
                                randomNumbers.push(newRandomNumber);
                                count ++;
                                break;
                            }
                        }
                    }
                }
            } 
        } while (count < 2);
            options.forEach((option, index) => {
            if (randomNumbers.includes(index)) {
                option.style.visibility = 'hidden';
            }
        });
        this.setState({
            usedFiftyFifty: true
        });
    } 

    handleHints = () => {
        const options = document.querySelectorAll('.option');
        let indexOfAnswer;

        options.forEach((option, index) => {
            if (option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
                indexOfAnswer = index;
            }
        });

        while (true) {
            const randomNumber = Math.floor(Math.random() * 4);
            if (randomNumber !== indexOfAnswer) {
                options.forEach((option, index) => {
                    if (index === randomNumber) {
                        option.style.visibility = 'hidden';
                    }
                });
                break;
            } else {
                const newRandomNumber = Math.floor(Math.random() * 4);
                if (newRandomNumber !== indexOfAnswer) {
                    options.forEach((option, index) => {
                        if (index === newRandomNumber) {
                            option.style.visibility = 'hidden';
                        }
                    });
                    break;
                }
            }
        }
    }

    showOptions = () => {
        const options = document.querySelectorAll('.option');
        options.forEach(option => {
            option.style.visibility = 'visible';
        });
        this.setState({
            usedFiftyFifty: false
        });
    };

    correctAnswer = () => {
        M.toast({
            html: 'Correct Answer!',
            classes: 'toast-valid',
            displayLength: 1500
        });
        this.setState((prevState) => ({
            score: prevState.score + 1,
            correctAnswers: prevState.correctAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
        }), () => {
            if (this.state.nextQuestion === undefined) {
                this.endGame();
            } else {
                this.displayQuestion(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
            }
        });
    }

    wrongAnswer = () => {
        navigator.vibrate(1000);
        M.toast({
            html: 'Wrong Answer!',
            classes: 'toast-invalid',
            displayLength: 1500
        });
        this.setState((prevState) => ({
            wrongAnswers: prevState.wrongAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
        }), () => {
            if (this.state.nextQuestion === undefined) {
                this.endGame();
            } else {
                this.displayQuestion(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
            }
        });
    }

    endGame = () => {
        alert('Quiz has ended!');
        const quizData = {
            score: this.state.score,
            type: this.state.type,
            numberOfQuestions: this.state.numberOfQuestions,
            numberOfAnsweredQuestions: this.state.numberOfAnsweredQuestions,
            correctAnswers: this.state.correctAnswers,
            wrongAnswers: this.state.wrongAnswers,
            usedHints: 5 - this.state.hints,
            usedfiftyFifty: 2 - this.state.fiftyFifty,
        };

        this.props.endFreeQuiz(quizData, this.props.history)
    }

    startTimer = () => {
        // const countDownTime = Date.now() + 900000;
        const countDownTime = Date.now() + 180000;        
        this.interval = setInterval(() => {
            const now = new Date();
            const distance = countDownTime - now;

            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                clearInterval(this.interval);
                this.setState({
                    ...this.state,
                    time: {
                        minutes: 0,
                        seconds: 0
                    }
                }, () => {
                    this.endGame();
                });
            } else {
                this.setState({
                    ...this.state,
                    time: {
                        seconds,
                        minutes,
                        distance
                    }
                });
            }
        }, 1000);
    }

    playButtonSound = () => {
        document.getElementById('button-sound').play();
    }

    render () {
        const { currentQuestion, questions, loading, time } = this.state;

        let quizContent;

        if (isEmpty(questions) || loading === true) {
            quizContent = <Loader />;
        } else {
            quizContent =  (
                <Fragment>
                    <Helmet><title>Free Quiz - Instaquiz</title></Helmet>
                    <Fragment>
                        <audio id="correct-audio" src={correctNotification}></audio>
                        <audio id="wrong-audio" src={wrongNotification}></audio>
                        <audio id="button-sound" src={buttonSound}></audio>
                    </Fragment>
                    <div className="question">
                        <div className="lifeline-container">
                            <p>
                                <span
                                    onClick={this.handleLifeline}
                                    id="fiftyfifty"
                                    className={classnames('mdi mdi-set-center mdi-24px lifeline-icon', {
                                        'lifeline-icon-empty': this.state.fiftyFifty === 0
                                    })}>
                                        <span className="lifeline">{this.state.fiftyFifty}</span>
                                </span>
                            </p>
                            <p>
                                {this.state.hints > 0 
                                    ?
                                     <span 
                                        onClick={this.handleLifeline}
                                        id="hints" 
                                        className={classnames('mdi mdi-lightbulb-on mdi-24px lifeline-icon', {
                                            'lifeline-icon-empty': this.state.hints === 0
                                        })}>
                                            <span className="lifeline">{this.state.hints}</span>
                                    </span> 
                                    : 
                                    <span 
                                        onClick={this.handleLifeline}
                                        id="hints" 
                                        className={classnames('mdi mdi-lightbulb-on-outline mdi-24px lifeline-icon', {
                                            'lifeline-icon-empty': this.state.hints === 0
                                        })}>
                                            <span className="lifeline">{this.state.hints}</span>
                                    </span> 
                                }
                            </p>
                        </div>
                        <p>
                            <span>{this.state.currentQuestionIndex + 1} of {this.state.numberOfQuestions }</span>
                            <span className={classnames('right valid', {
                                'warning' : time.distance <= 120000,
                                'invalid' : time.distance < 30000
                            })}>
                                <span className="mdi mdi-clock-outline mdi-24px" style={{ position: 'relative', top: '2px' }}></span>
                                {time.minutes}:{time.seconds}
                            </span>
                        </p>
                        <h5>{currentQuestion.question}</h5>
                        <div className="option-container">
                            <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionA}</p>
                            <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionB}</p>
                        </div>
                        <div className="option-container">
                            <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionC}</p>
                            <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionD}</p>
                        </div>
                    </div>
                    
                    <div className="buttonContainer">
                        <button
                            className={classnames('', { 'disable': this.state.previousButtonDisabled })}
                            onClick={this.handlePreviousButtonClick}>
                                <span 
                                    style={{ marginRight: '5px' }} 
                                    className="mdi mdi-chevron-double-left left">
                                </span>
                            Previous
                        </button>
                        <button 
                            className={classnames('', { 'disable': this.state.nextButtonDisabled })}
                            onClick={this.handleNextButtonClick}>
                                <span 
                                    style={{ marginLeft: '5px' }} 
                                    className="mdi mdi-chevron-double-right right">
                                </span>
                                Next
                            </button>
                        <button 
                            onClick={this.hadleQuitButtonClick}>
                                <span 
                                    style={{ marginLeft: '5px' }} 
                                    className="mdi mdi-close right">
                                </span>
                            Quit
                        </button>
                    </div>
                </Fragment>
            );
        }
        
        return (
            <div id="quiz">
                <h3>Free Quiz Mode</h3>
                {/* {this.state.type ? <h3>{this.state.type}</h3> : <span>No Type found</span>} */}
                {quizContent}
            </div>
        );
    }
}

Play.propTypes = {
    endFreeQuiz: PropTypes.func.isRequired,
    getFreeQuestions: PropTypes.func.isRequired,
    quiz: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    quiz: state.quiz
});

export default connect(mapStateToProps, { endFreeQuiz, getFreeQuestions })(withRouter(Play));