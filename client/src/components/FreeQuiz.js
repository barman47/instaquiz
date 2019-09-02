import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css';

import { getFreeQuestions } from '../actions/quizActions';

import isEmpty from '../validation/is-empty';

class FreeQuiz extends Component {
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
            loading: false
        };
    }

    UNSAFE_componentWillMount () {
        this.props.getFreeQuestions();
        this.setState({
            loading: true
        });
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        if (!isEmpty(nextProps.quiz)) {
            this.setState({
                questions: nextProps.quiz.questions,
                type: nextProps.quiz.type,
                loading: false
            }, () => {
                this.displayQuestion(this.state.questions);
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
            });
        }
    }

    handleOptionClick = (e) => {
        if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
            this.correctAnswer();
        } else {
            this.wrongAnswer();
        }
    
        if (this.state.numberOfQuestions === 0) {
            const questionsArray = Object.keys(this.state.questions).map(i => this.state.questions[i]);
            this.setState({
                numberOfQuestions: questionsArray.length
            });
        }
    }
    
    handleNextButtonClick = (e) => {
        this.setState((prevState) => ({
            currentQuestionIndex: prevState.currentQuestionIndex + 1
        }), () => {
            this.displayQuestion(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
        });
    };

    handlePreviousButtonClick = (e) => {
        this.setState((prevState) => ({
            currentQuestionIndex: prevState.currentQuestionIndex - 1
        }), () => {
            this.displayQuestion(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
        });
    }

    correctAnswer = () => {
        M.toast({
            html: 'Correct Answer!',
            classes: 'toast-valid',
            displayLength: 2000
        });
        this.setState((prevState) => ({
            score: prevState.score + 1,
            correctAnswers: prevState.correctAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
        }), () => {
            if (this.state.nextQuestion === undefined) {
                alert(`Quiz has ended!, you scored ${this.state.score} out of ${this.state.numberOfQuestions}`);
                return false;
            } else {
                console.log('Quiz is still on!');
                this.displayQuestion(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
            }
        });
    }

    wrongAnswer = () => {
        navigator.vibrate(1000);
        M.toast({
            html: 'Wrong Answer!',
            classes: 'toast-invalid',
            displayLength: 2000
        });
        this.setState((prevState) => ({
            wrongAnswers: prevState.wrongAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
        }), () => {
            if (this.state.nextQuestion === undefined) {
                alert(`Quiz has ended!, you scored ${this.state.score} out of ${this.state.numberOfQuestions}`);
                return false;
            } else {
                console.log('Quiz is still on!');
                this.displayQuestion(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
            }
        });
    }

    render () {
        const { currentQuestion } = this.state;
        
        return (
            <div id="quiz">
                <h3>Free Quiz Mode</h3>
                
                {/* {this.state.type ? <h3>{this.state.type}</h3> : <span>No Type found</span>} */}
                {currentQuestion ? (
                    <div className="question">
                        <h6>{this.state.currentQuestionIndex + 1} of {this.state.numberOfQuestions }</h6>
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
                ) : null}
                <div className="buttonContainer">
                    <button onClick={this.handlePreviousButtonClick}><span style={{ marginRight: '5px' }} className="mdi mdi-chevron-double-left left"></span>Previous</button>
                    <button onClick={this.handleNextButtonClick}><span style={{ marginLeft: '5px' }} className="mdi mdi-chevron-double-right right"></span>Next</button>
                    <button><span style={{ marginLeft: '5px' }} className="mdi mdi-close right"></span>Quit</button>
                </div>
            </div>
        );
    }
}

FreeQuiz.propTypes = {
    getFreeQuestions: PropTypes.func.isRequired,
    quiz: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    quiz: state.quiz
});

export default connect(mapStateToProps, { getFreeQuestions })(FreeQuiz);