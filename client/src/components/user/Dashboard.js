import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { logoutUser } from '../../actions/authActions';

class Dashboard extends Component {
    constructor (props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            userName: '',
            balance: 0,
            totalEarnings: 0,
            gamesPlayed: 0,
            rank: '',
            wins: 0,
            losses: 0,
            bank: '',
            accountName: '',
            accountNumber: ''
        };
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        if (nextProps.auth.user) {
            console.log('nextprops');
            
        }
    }

    componentDidMount () {
        const sidenavElem = document.querySelectorAll('.sidenav');
        // eslint-disable-next-line
        const sidenavInstance = M.Sidenav.init(sidenavElem, {});
        
        const { user } = this.props.auth;
        this.setState({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            userName: user.username,
            balance: user.balance,
            totalEarnings: user.totalEarnings,
            gamesPlayed: user.gamesPlayed,
            rank: user.rank,
            wins: user.wins,
            losses: user.losses,
            bank: user.bank,
            accountName: user.accountName,
            accountNumber: user.accountNumber
        });
    }

    handleLogoutUser = () => {
        this.props.logoutUser();
    };

    render () {
        return (
            <Fragment>
                <Helmet><title>Dashboard - {this.state.firstName} {this.state.lastName} - Instaquiz</title></Helmet>
                <div className="dashboard">
                    <section className="aside">
                        <h5>AppName or Logo</h5>
                        <div className="avatar-section">
                            <p>
                                <span className="mdi mdi-account avatar-icon"></span>
                            </p>
                            <h5 style={{ textTransform: 'capitalize' }}>{this.state.firstName} {this.state.lastName}</h5>
                        </div>
                        <ul>
                            <li><Link to="/"><span className="mdi mdi-home link-icon mdi-24px"></span>Home</Link></li>
                            <li><Link to="/dashboard"><span className="mdi mdi-view-dashboard-outline link-icon mdi-24px"></span>Dashboard</Link></li>
                            <li><Link to="/"><span className="mdi mdi-cube-outline link-icon mdi-24px"></span>My Games</Link></li>
                            <li><Link to="/"><span className="mdi mdi-settings link-icon mdi-24px"></span>Profile</Link></li>
                            <li><Link to="/"><span className="mdi mdi-help-circle-outline link-icon mdi-24px"></span>Support</Link></li>
                            <li><Link to="/"><span className="mdi mdi-credit-card link-icon mdi-24px"></span>Payment Details</Link></li>
                        </ul>
                    </section>
                    <section className="main">
                        <div className="main__top">
                            <div className="initials-container">
                                <h4>Good to have you back!</h4>
                                <h4 className="show-on-small" id="logo"><span data-target="mobile-menu" className="mdi mdi-menu sidenav-trigger left menu-icon"></span>Logo</h4>
                                <ul className="sidenav" id="mobile-menu">
                                    <h5>AppName or Logo</h5>
                                    <div className="avatar-section">
                                        <p>
                                            <span className="mdi mdi-account avatar-icon"></span>
                                        </p>
                                        <h5 style={{ textTransform: 'capitalize' }}>{this.state.firstName} {this.state.lastName}</h5>
                                    </div>
                                    <li><Link to="/"><span className="mdi mdi-home link-icon mdi-24px"></span>Home</Link></li>  
                                    <li><Link to="/dashboard"><span className="mdi mdi-view-dashboard-outline link-icon mdi-24px"></span>Dashboard</Link></li>
                                    <li><Link to="/"><span className="mdi mdi-cube-outline link-icon mdi-24px"></span>My Games</Link></li>
                                    <li><Link to="/"><span className="mdi mdi-settings link-icon mdi-24px"></span>Profile</Link></li>
                                    <li><Link to="/"><span className="mdi mdi-help-circle-outline link-icon mdi-24px"></span>Support</Link></li>
                                    <li><Link to="/"><span className="mdi mdi-credit-card link-icon mdi-24px"></span>Payment Details</Link></li>
                                </ul>
                                <div>
                                    <button onClick={this.handleLogoutUser}>
                                        Logout
                                        <span className="mdi mdi-power mdi-24px logout-icon"></span>
                                    </button>
                                    <p className="initials">{this.state.firstName.charAt(0).toUpperCase()}</p>
                                </div>
                            </div>
                        </div>
                        <div className="main__header">
                            <h1>Dashboard</h1>
                            <h5>Account Overview</h5>
                        </div>
                        <section className="main-content">
                            <div className="stat-content">
                                <div className="stat">
                                    <h5>
                                        <span className="mdi mdi-currency-ngn mdi-24px stat-icon"></span>{this.state.balance}
                                        <span className="mdi mdi-wallet stat-icon-primary balance"></span>
                                        </h5>
                                    <h4>Balance</h4>
                                </div>
                                <div className="stat">
                                    <h5>
                                        <span className="mdi mdi-currency-ngn mdi-24px stat-icon"></span>{this.state.totalEarnings}
                                        <span className="mdi mdi-cash-100 stat-icon-primary total-earnings"></span>
                                        </h5>
                                    <h4>Total Earnings</h4>
                                </div>
                                <div className="stat">
                                    <h5>
                                        {this.state.gamesPlayed}
                                        <span className="mdi mdi-cube-outline stat-icon-primary games-played"></span>
                                        </h5>
                                    <h4>Games Played</h4>
                                </div>
                                <div className="stat">
                                    <h5>
                                        {this.state.rank}
                                        <span className="mdi mdi-star-circle stat-icon-primary rank"></span>
                                        </h5>
                                    <h4>Rank</h4>
                                </div>
                                <div className="stat">
                                    <h5>
                                        {this.state.wins}
                                        <span className="mdi mdi-coins stat-icon-primary wins"></span>
                                        </h5>
                                    <h4>Wins</h4>
                                </div>
                                <div className="stat">
                                    <h5>
                                        {this.state.losses}
                                        <span className="mdi mdi-close-circle-outline stat-icon-primary losses"></span>
                                        </h5>
                                    <h4>Losses</h4>
                                </div>
                            </div>
                        </section>
                        <div><p>&copy; Copyright Instaquiz 2019</p></div>
                    </section>
                </div>
            </Fragment>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);