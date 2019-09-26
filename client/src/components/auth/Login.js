import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import M from 'materialize-css';
import classnames from 'classnames';

import TextInputGroup from '../input-groups/TextInputGroup';
import Spinner from '../common/Spinner';

import { loginUser } from '../../actions/authActions';

import isEmpty from '../../validation/is-empty';

class Login extends Component {
    constructor (props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loading: false,
            errors: {}
        };
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        const username = document.getElementById('username');
        const password = document.getElementById('password');

        if (!isEmpty(nextProps.errors)) {
            const { errors } = nextProps;
            if (errors.message) {
                M.toast({
                    html: errors.message,
                    classes: 'toast-invalid'
                });
                this.setState({
                    loading: false
                });
            } else {
                M.toast({
                    html: 'Invalid username or password!',
                    classes: 'toast-invalid'
                });
                this.setState({
                    loading: false,
                    errors
                });
                
                if (errors.username && errors.username.toLowerCase() === 'User not found!'.toLowerCase()) {
                    username.focus();
                } else if (errors.password && errors.password.toLowerCase() === 'Incorrect password!'.toLowerCase()) {
                    password.focus();
                }
            }
        }

        if (nextProps.auth.authenticated) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillUnmount () {
        this.setState({
            loading: false
        });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password
        };
        this.props.loginUser(user);
        this.setState({
            loading: true
        });
    }

    render () {
        const { errors, loading } = this.state;
    
        return (
            <Fragment>
                <Helmet><title>Login User - Instaquiz</title></Helmet>
                <section className="login-container">
                    <div className="form-container">
                        <form 
                            className={classnames('', { 'disable': loading === true })}
                            onSubmit={this.handleSubmit} noValidate>
                            <h3>Welcome!</h3>
                            <h4>Login to Continue</h4>
                            <p>
                                <span className="mdi mdi-shield-lock-outline login-icon"></span>
                            </p>
                            <TextInputGroup 
                                label="Username"
                                id="username"
                                name="username"
                                value={this.state.username}
                                errorMessage={errors.username}
                                onChange={this.onChange}
                                icon="mdi mdi-account"
                            />
                            <TextInputGroup 
                                type="password"
                                label="Password"
                                id="password"
                                name="password"
                                value={this.state.password}
                                errorMessage={errors.password}
                                onChange={this.onChange}
                                icon="mdi mdi-lock-outline"
                            />
                            <div className="row">
                                <div className="col">
                                    <button
                                        className="loginButton disabled"
                                        type="submit"
                                        value="Login"
                                    >
                                        Login
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
                <Spinner loading={this.state.loading} text="Just a sec . . ." />
            </Fragment>
        );
    }
}

Login.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { loginUser})(Login);