import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import { clearQuizStats } from '../../actions/quizActions';

import isEmpty from '../../validation/is-empty';

class QuizSummary extends Component {
    constructor (props) {
        super(props);
        this.state = {
            score: 0,
            type: '',
            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            usedHints: 0,
            usedfiftyFifty: 0
        };
    }

    componentDidMount () {
        const { quizStats } = this.props.quiz;
        this.setState({
            score: (quizStats.score / quizStats.numberOfQuestions) * 100,
            type: quizStats.type,
            numberOfQuestions: quizStats.numberOfQuestions,
            numberOfAnsweredQuestions: quizStats.numberOfAnsweredQuestions,
            correctAnswers: quizStats.correctAnswers,
            wrongAnswers: quizStats.wrongAnswers,
            usedHints: quizStats.usedHints,
            usedfiftyFifty: quizStats.usedfiftyFifty
        });
    }

    componentWillUnmount () {
        this.props.clearQuizStats();
    }
    
    render () {
        const score = this.props.quiz.quizStats;
        const userScore = this.state.score;
        let remark;
        if (userScore <= 30) {
            remark = 'You need more practice';
        } else if (userScore > 30 && userScore <= 50) {
            remark = 'Better luck next time';
        } else if (userScore <= 70 && userScore > 50) {
            remark = 'You can do better';
        } else if (userScore >= 71 && userScore <= 84) {
            remark = 'You did great!'
        } else {
            remark = 'You\'re an absolute genius!'
        }
        
        let stats;

        if (!isEmpty(score)) {
            stats = (
                <Fragment>
                    <Helmet><title>Quiz Summary - Instaquiz</title></Helmet>
                    <div style={{ textAlign: 'center' }}>
                        <span className="mdi mdi-check-circle-outline success-icon"></span>
                    </div>
                    <h1>Congratulations you made it!</h1>
                    <div className="container stats">
                        <h4>{remark}</h4>
                        <h2 className={classnames('perfect-score', {
                            'perfect-score': this.state.score > 85
                        })}>Your Score: {this.state.score.toFixed(0)}&#37;</h2>
                        <span className="stat left">Total Number of Questions: </span><span className="right">{this.state.numberOfQuestions}</span><br />
                        <span className="stat left">Number of attempted questions: </span><span className="right">{this.state.numberOfAnsweredQuestions}</span><br />
                        <span className="stat left">Number of Correct Answers: </span><span className="right">{this.state.correctAnswers}</span><br />
                        <span className="stat left">Number of Wrong Answers: </span><span className="right">{this.state.wrongAnswers}</span><br />
                        <span className="stat left">Hints used: </span><span className="right">{this.state.usedHints} out of 5</span><br />
                        <span className="stat left">50-50 used: </span><span className="right">{this.state.usedfiftyFifty} out of 2</span><br />
                    </div>
                    <section>
                        <ul>
                            <li><Link to="/play">Play Again</Link></li>
                            <li><Link to="/">Back to Home</Link></li>
                        </ul>
                        <p>Want to earn really cool cash while playing games? <Link to="/register">Create an account now!</Link></p>
                    </section>
                </Fragment>
            );
        } else {
            stats = <section>
                    <h1 className="no-stats">No Statistics Available</h1>
                    <ul>
                        <li><Link to="/play">Play</Link></li>
                        <li><Link to="/">Back to Home</Link></li>
                    </ul>
                </section>
        }
        return (
            <div className="quiz-summary">
                {stats}
            </div>
        );
    }
}

QuizSummary.propTypes = {
    clearQuizStats: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    quiz: state.quiz
});

export default connect(mapStateToProps, { clearQuizStats })(QuizSummary);