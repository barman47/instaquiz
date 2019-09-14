import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import M from 'materialize-css';

import { changePassword, logoutUser, updateUserData } from '../../actions/authActions';
import ProfileTextInput from '../input-groups/ProfileTextInput';

class Profile extends Component {
    constructor (props) {
        super(props);
        this.state = {
            user: this.props.auth.user,
            firstName: this.props.auth.user.firstName || '',
            lastName: this.props.auth.user.lastName || '',
            username: this.props.auth.user.username || '',
            email: this.props.auth.user.email || '',
            phone: this.props.auth.user.phone || '',
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            color: this.props.auth.color,
            loading: false,
            errors: {}
        };
    }

    componentDidMount () {
        const sidenavElem = document.querySelectorAll('.sidenav');
        // eslint-disable-next-line
        const sidenavInstance = M.Sidenav.init(sidenavElem, {});
    }

    componentWillUnmount () {
        const sidenavElem = document.querySelectorAll('.sidenav');
        // eslint-disable-next-line
        const sidenavInstance = M.Sidenav.init(sidenavElem, {});
        sidenavInstance[0].close();        
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors,
                loading: false
            });
        }

        if (nextProps.auth.msg) {
            M.toast({
                html: nextProps.auth.msg.success,
                classes: 'toast-valid',
                completeCallback: () => {
                    this.setState({
                        errors: {},
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: '',
                        loading: false
                    }, () => {
                        document.getElementById('change-password-form').reset();
                    });
                }
            });
        }
    }

    greetUser = () => {
        const time = new Date();
        const hour = time.getHours();
        if (hour < 12) {
            return 'Hello, top of the morning to you!';
        } else if (hour >= 12 && hour < 16) {
            return 'Good afternoon, so nice having you back.';
        } else {
            return 'Good evening, hope you had an awesome day?';
        }
    };

    handleLogoutUser = () => {
        this.props.logoutUser();
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { state } = this;
        let data;
        switch (e.target.id) {
            case 'profile-form':
                data = {
                    firstName: state.firstName,
                    lastName: state.lastName,
                    email: state.email,
                    phone: state.phone
                };
                this.setState({
                    loading: true
                });
                this.props.updateUserData(data);
                break;

            case 'change-password-form':
                data = {
                    currentPassword: state.currentPassword,
                    newPassword: state.newPassword,
                    confirmPassword: state.confirmPassword
                };
                this.setState({
                    loading: true
                });
                this.props.changePassword(data);
                break;

            default:
                break;
        }
    }

    render () {
        const { color, user, errors } = this.state;
        const { state } = this;
        return (
            <Fragment>
                <Helmet><title>Dashboard - Instaquiz</title></Helmet>
                <div className="dashboard">
                    <section className="aside">
                        <h5>AppName or Logo</h5>
                        <div className="avatar-section">
                            <p>
                                <span className="mdi mdi-account avatar-icon"></span>
                            </p>
                            <h5 style={{ textTransform: 'capitalize' }}>{user.firstName} {user.lastName}</h5>
                        </div>
                        <ul>
                            <li><Link to="/dashboard"><span className="mdi mdi-view-dashboard-outline link-icon mdi-24px"></span>Dashboard</Link></li>
                            <li><Link to="/myGames"><span className="mdi mdi-cube-outline link-icon mdi-24px"></span>My Games</Link></li>
                            <li className="profile-active"><Link to="/profile"><span className="mdi mdi-settings link-icon mdi-24px"></span>Profile</Link></li>
                            <li><Link to="/funds"><span className="mdi mdi-credit-card link-icon mdi-24px"></span>Funds</Link></li>
                            <li><Link to="/support"><span className="mdi mdi-help-circle-outline link-icon mdi-24px"></span>Support</Link></li>
                        </ul>
                    </section>
                    <section className="main">
                        <div className="main__top">
                            <div className="initials-container">
                                <h4 style={{ color }}>{this.greetUser()}</h4>
                                <h4 className="show-on-small" id="logo"><span data-target="mobile-menu" className="mdi mdi-menu mdi-24px sidenav-trigger left menu-icon"></span>Logo</h4>
                                <ul className="sidenav" id="mobile-menu">
                                    <h5>AppName or Logo</h5>
                                    <div className="avatar-section">
                                        <p>
                                            <span className="mdi mdi-account avatar-icon"></span>
                                        </p>
                                        <h5 style={{ textTransform: 'capitalize' }}>{user.firstName} {user.lastName}</h5>
                                    </div>
                                    <li className="divider"></li>  
                                    <li><Link to="/dashboard"><span className="mdi mdi-view-dashboard-outline link-icon mdi-24px"></span>Dashboard</Link></li>
                                    <li><Link to="/myGames"><span className="mdi mdi-cube-outline link-icon mdi-24px"></span>My Games</Link></li>
                                    <li className="dashboard-active"><Link to="/profile"><span className="mdi mdi-settings link-icon mdi-24px"></span>Profile</Link></li>
                                    <li><Link to="/funds"><span className="mdi mdi-credit-card link-icon mdi-24px"></span>Funds</Link></li>
                                    <li><Link to="/support"><span className="mdi mdi-help-circle-outline link-icon mdi-24px"></span>Support</Link></li>
                                    <li className="divider"></li>
                                    <li onClick={this.handleLogoutUser}><Link to="/#"><span style={{ color: '#ea4335' }} className="mdi mdi-power mdi-24px link-icon logout-icon"></span>Log out</Link></li>
                                </ul>
                                <div>
                                    <button id="logoutButton" onClick={this.handleLogoutUser}>
                                        Logout
                                        <span className="mdi mdi-power mdi-24px logout-icon"></span>
                                    </button>
                                    <p style={{ backgroundColor: color }} className="initials">{user.firstName.charAt(0).toUpperCase()}</p>
                                </div>
                            </div>
                        </div>
                        <div className="main__header">
                            <h1>Profile</h1>
                            <h5>View and Edit User Info</h5>
                        </div>
                        <section className="main-content">
                            <div className="profile-content">
                                <form onSubmit={this.handleSubmit} id="profile-form" className="profile-form">
                                    <h5>Personal Information</h5>
                                    <ProfileTextInput
                                        icon="mdi mdi-account prefix"
                                        id="firstName"
                                        name="firstName"
                                        value={state.firstName}
                                        onChange={this.onChange}
                                        disabled={state.disabled}
                                        placeholder="First Name"
                                        title="First name is required"                                        
                                        errorMessage={errors.firstName}
                                    />
                                    <ProfileTextInput
                                        icon="mdi mdi-account prefix"
                                        id="lastName"
                                        name="lastName"
                                        value={state.lastName}
                                        onChange={this.onChange}
                                        disabled={state.disabled}
                                        placeholder="Last Name"
                                        title="Last name is required"
                                        errorMessage={errors.lastName}
                                    />
                                    {/* <ProfileTextInput
                                        icon="mdi mdi-alphabetical prefix"
                                        id="username"
                                        name="username"
                                        value={state.username}
                                        onChange={this.onChange}
                                        disabled={state.disabled}
                                        placeholder="Username"
                                        info="Test info"
                                        title="username is required"
                                        errorMessage={errors.username}
                                    /> */}
                                    <ProfileTextInput
                                        icon="mdi mdi-email-outline prefix"
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={state.email}
                                        onChange={this.onChange}
                                        disabled={state.disabled}
                                        placeholder="Email Address"
                                        title="email is required"
                                        info="email@example.com"
                                        errorMessage={errors.email}
                                    />
                                    <ProfileTextInput
                                        icon="mdi mdi-cellphone-android prefix"
                                        id="phone"
                                        name="phone"
                                        value={state.phone}
                                        onChange={this.onChange}
                                        disabled={state.disabled}
                                        placeholder={state.phone === '' ? 'Enter Phone Number' : state.phone}
                                        title="Phone number is required"
                                        info="e.g. 08012345678"
                                        errorMessage={errors.phone}
                                    />
                                    <div>
                                        <button type="submit" id="edit-info-button">Edit Personal Information</button>
                                    </div>
                                </form>
                                <form onSubmit={this.handleSubmit} id="change-password-form" className="profile-form">
                                    <h5>Change Password</h5>
                                    <ProfileTextInput
                                        type="password"
                                        icon="mdi mdi-lock-outline prefix"
                                        id="currentPassword"
                                        name="currentPassword"
                                        value={state.currentPassword}
                                        onChange={this.onChange}
                                        disabled={state.disabled}
                                        placeholder="Current Password"
                                        title="Current password is required"                                        
                                        errorMessage={errors.currentPassword}
                                    />
                                    <ProfileTextInput
                                        type="password"
                                        icon="mdi mdi-lock-outline prefix"
                                        id="newPassword"
                                        name="newPassword"
                                        value={state.newPassword}
                                        onChange={this.onChange}
                                        disabled={state.disabled}
                                        placeholder="New Password"
                                        title="New Password is required"                                        
                                        errorMessage={errors.newPassword}
                                    />
                                    <ProfileTextInput
                                        type="password"
                                        icon="mdi mdi-lock-outline prefix"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={state.confirmPassword}
                                        onChange={this.onChange}
                                        disabled={state.disabled}
                                        placeholder="Confirm Password Password"
                                        title="Confirm password is required"                                        
                                        errorMessage={errors.confirmPassword}
                                    />
                                    <div>
                                        <button type="submit" id="change-password-button">Change Password</button>
                                    </div>
                                </form>
                            </div>
                        </section>
                        <div><p>&copy; Copyright Instaquiz 2019</p></div>
                    </section>
                </div>
            </Fragment>
        );
    }
}

Profile.propTypes = {
    changePassword: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    updateUserData: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { changePassword, logoutUser, updateUserData })(Profile);