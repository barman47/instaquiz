import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import M from 'materialize-css';

import { changePassword, logoutUser, updateUserData } from '../../actions/authActions';

import ProfileTextInput from '../input-groups/ProfileTextInput';
import Spinner from '../common/Spinner';

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
            password: '',
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            disabled: true,
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

        if (this.props.auth.user !== nextProps.auth.user) {
            const { user } = nextProps.auth;
            M.toast({
                html: user.success,
                classes: 'toast-valid'
            });
            this.setState({
                user,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                errors: {},
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
                password: '',
                disabled: true,
                loading: false
            }, () => {
                document.querySelectorAll('.profile-field').forEach(item => {
                    item.classList.remove('invalid');
                    item.classList.remove('valid');
                });
                document.getElementById('change-password-form').reset();
            });
        }
    }

    greetUser = () => {
        const time = new Date();
        const hour = time.getHours();
        if (hour < 12) {
            return `Hello ${this.state.username}, top of the morning to you!`;
        } else if (hour >= 12 && hour < 16) {
            return `Good afternoon ${this.state.username}, so nice having you back.`;
        } else {
            return  `Good evening ${this.state.username}, hope you had an awesome day?`;
        }
    }

    handleLogoutUser = () => {
        this.props.logoutUser();
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            loading: true
        });
        const { state } = this;
        let data;
        switch (e.target.id) {
            case 'profile-form':
                data = {
                    firstName: state.firstName,
                    lastName: state.lastName,
                    email: state.email,
                    phone: state.phone,
                    password: state.password
                };
                this.props.updateUserData(data);
                break;

            case 'change-password-form':
                data = {
                    currentPassword: state.currentPassword,
                    newPassword: state.newPassword,
                    confirmPassword: state.confirmPassword
                };
                this.props.changePassword(data);
                break;

            default:
                break;
        }
    }

    handleEdit = () => {
        this.setState({
            disabled: false
        });
        M.toast({ html: 'Textfields are currently editable' });
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
                                    <p 
                                        id="edit-profile" 
                                        onClick={this.handleEdit}
                                        title="Click to enable text fields and update your information."
                                    >
                                        Click to edit profile info
                                    </p>
                                    <ProfileTextInput
                                        icon="mdi mdi-account prefix"
                                        id="firstName"
                                        className="profile-field"
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
                                        className="profile-field"
                                        name="lastName"
                                        value={state.lastName}
                                        onChange={this.onChange}
                                        disabled={state.disabled}
                                        placeholder="Last Name"
                                        title="Last name is required"
                                        errorMessage={errors.lastName}
                                    />
                                    <ProfileTextInput
                                        icon="mdi mdi-alphabetical prefix"
                                        id="username"
                                        name="username"
                                        value={state.username}
                                        onChange={this.onChange}
                                        disabled={true}
                                        placeholder="Username"
                                        info="Username cannot be changed"
                                        errorMessage={errors.username}
                                    />
                                    <ProfileTextInput
                                        icon="mdi mdi-email-outline prefix"
                                        type="email"
                                        id="email"
                                        className="profile-field"
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
                                        className="profile-field"
                                        name="phone"
                                        value={state.phone}
                                        onChange={this.onChange}
                                        disabled={state.disabled}
                                        placeholder={state.phone === '' ? 'Enter Phone Number' : state.phone}
                                        title="Phone number is required"
                                        info="e.g. 08012345678"
                                        errorMessage={errors.phone}
                                    />
                                    <ProfileTextInput
                                        type="password"
                                        icon="mdi mdi-lock-outline prefix"
                                        id="password"
                                        className="profile-field"
                                        name="password"
                                        value={state.password}
                                        onChange={this.onChange}
                                        disabled={state.disabled}
                                        placeholder="Enter Password"
                                        title="Password is required"
                                        info="Password is needed to confirm information change."
                                        errorMessage={errors.password}
                                    />
                                    <div>
                                        <button 
                                            className="profile-field" 
                                            type="submit" 
                                            id="edit-info-button"
                                            disabled={state.disabled}
                                        >
                                            Edit Personal Information
                                        </button>
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
                <Spinner loading={state.loading} text="One Moment . . ." />
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