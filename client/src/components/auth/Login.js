import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import M from 'materialize-css';

import TextInputGroup from '../input-groups/TextInputGroup';

import { loginUser } from '../../actions/authActions';

class Login extends Component {
    constructor (props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: {}
        };
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        const username = document.getElementById('username');
        const password = document.getElementById('password');

        if (nextProps.errors) {
            const { errors } = nextProps;
            M.toast({
                html: 'Invalid username or password!',
                classes: 'toast-invalid'
            });
            this.setState({
                errors: errors
            });
            
            if (errors.username && errors.username.toLowerCase() === 'User not found!'.toLowerCase()) {
                username.focus();
            } else if (errors.password && errors.password.toLowerCase() === 'Incorrect password!'.toLowerCase()) {
                password.focus();
            }
        }
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
    }

    render () {
        const { errors } = this.state;
        return (
            <Fragment>
                <Helmet><title>Instaquiz - Login</title></Helmet>
                <section className="login-container">
                    <div className="form-container">
                        <form onSubmit={this.handleSubmit}>
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
                                    <input 
                                        className="loginButton"
                                        type="submit"
                                        value="Login"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </Fragment>
        );
    }
}

Login.propTypes = {
    errors: PropTypes.object
};

const mapStateToProps = (state) => ({
    errors: state.errors
});

export default connect(mapStateToProps, { loginUser})(Login);