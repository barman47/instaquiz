import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchQuiz } from '../actions/quizActions';

class Home extends Component {
    constructor (props) {
        super(props);
        this.state = {
            questions: [],
            errors: {}
        };
    }

    UNSAFE_componentWillMount () {
        this.props.fetchQuiz();
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        if (nextProps.quiz) {
            this.setState({
                questions: nextProps.quiz.questions
            });
        }
    }

    renderQuestions = (questions) => {
        questions.forEach((question, index) => (
            <Fragment>
                <h5>Question {index + 1}</h5>
                <p>
                    {question.question}
                </p>
                <ul>
                    <li>A. question.optionA.text</li>
                    <li>B. question.optionB.text</li>
                    <li>C. question.optionC.text</li>
                    <li>D. question.optionC.text</li>
                </ul>
            </Fragment>
        ));
    };

    render () {
        return (
            <div>
                <h4>Home Page</h4>
                <h3>Biology Question</h3>
                {/* {this.state.questions &&(<p>{
                    this.state.questions[0].question
                }</p>)} */}
                <ul>
                    <li>A. Option a</li>
                    <li>B. Option b</li>
                    <li>C. Option c</li>
                    <li>D. Option d</li>
                </ul>
            </div>
        );
    }
}

Home.propTypes = {
    fetchQuiz: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    quiz: state.quiz,
    errors: state.errors
});

export default connect(mapStateToProps, { fetchQuiz })(Home);