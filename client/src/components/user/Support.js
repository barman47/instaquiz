import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { logoutUser } from '../../actions/authActions';

class Support extends Component {
    constructor (props) {
        super(props);
        this.state = {
            user: this.props.auth.user,
            color: this.props.auth.color
        };
    }

    componentDidMount () {
        const sidenavElem = document.querySelectorAll('.sidenav');
        // eslint-disable-next-line
        const sidenavInstance = M.Sidenav.init(sidenavElem, {});

        const { user } = this.props.auth;

        this.setState({
            username: user.username
        });
    }

    componentWillUnmount () {
        const sidenavElem = document.querySelectorAll('.sidenav');
        // eslint-disable-next-line
        const sidenavInstance = M.Sidenav.init(sidenavElem, {});
        sidenavInstance[0].close();        
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

    render () {
        const { user } = this.state;
        const { color } = this.state;
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
                            <li><Link to="/profile"><span className="mdi mdi-settings link-icon mdi-24px"></span>Profile</Link></li>
                            <li><Link to="/funds"><span className="mdi mdi-credit-card link-icon mdi-24px"></span>Funds</Link></li>
                            <li className="support-active"><Link to="/support"><span className="mdi mdi-help-circle-outline link-icon mdi-24px"></span>Support</Link></li>
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
                                    <li><Link to="/profile"><span className="mdi mdi-settings link-icon mdi-24px"></span>Profile</Link></li>
                                    <li><Link to="/funds"><span className="mdi mdi-credit-card link-icon mdi-24px"></span>Funds</Link></li>
                                    <li className="support-active"><Link to="/support"><span className="mdi mdi-help-circle-outline link-icon mdi-24px"></span>Support</Link></li>
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
                            <h1>Support</h1>
                            <h5>Contact Support for inquiries or complaints</h5>
                        </div>
                        <section className="main-content">
                            <div className="funds-content">
                                <h1>Funds Content</h1>
                            </div>
                        </section>
                        <div><p>&copy; Copyright Instaquiz 2019</p></div>
                    </section>
                </div>
            </Fragment>
        );
    }
}

Support.propTypes = {
    logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Support);