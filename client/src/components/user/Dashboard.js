import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import M from 'materialize-css';

import { logoutUser, setUserColor } from '../../actions/authActions';

class Dashboard extends Component {
    constructor (props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            balance: 0,
            totalEarnings: 0,
            gamesPlayed: 0,
            rank: '',
            wins: 0,
            losses: 0,
            bank: '',
            accountName: '',
            accountNumber: '',
            colors: [
                '#c2185b',
                '#0097a8',
                '#028879',
                '#f06d03',
                '#bd350a',
                '#781fa1',
                '#64a138',
                '#5e4236',
                '#77919d',
                '#ac47bb'
            ],
            color: '',
            rankColor: [
                '#d2d2d2',
                '57b846',
                '#debb00'
            ]
        };
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
            username: user.username,
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

        let color = Math.floor(Math.random() * 10);
        color = this.state.colors[color];
        this.setState({ color });
        this.props.setUserColor(color);
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        if (nextProps.auth.color) {
            this.setState({ color: nextProps.auth.color });
        }
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
        const { color } = this.state;
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
                            <li className="dashboard-active"><Link to="/dashboard"><span className="mdi mdi-view-dashboard-outline link-icon mdi-24px"></span>Dashboard</Link></li>
                            <li><Link to="/myGames"><span className="mdi mdi-cube-outline link-icon mdi-24px"></span>My Games</Link></li>
                            <li><Link to="/profile"><span className="mdi mdi-settings link-icon mdi-24px"></span>Profile</Link></li>
                            <li><Link to="/funds"><span className="mdi mdi-credit-card link-icon mdi-24px"></span>Funds</Link></li>
                            <li><Link to="/support"><span className="mdi mdi-help-circle-outline link-icon mdi-24px"></span>Support</Link></li>
                        </ul>
                    </section>
                    <section className="main">
                        <div className="main__top">
                            <div className="initials-container">
                                <h4 style={{ color }}>{this.greetUser()}</h4>
                                <h4 className="show-on-small" id="logo">
                                    <span data-target="mobile-menu" style={{ fontSize: '36px', marginLeft: '10px' }} className="mdi mdi-menu sidenav-trigger left menu-icon">
                                    </span>
                                    Logo
                                </h4>
                                <ul className="sidenav" id="mobile-menu">
                                    <h5>AppName or Logo</h5>
                                    <div className="avatar-section">
                                        <p>
                                            <span className="mdi mdi-account avatar-icon"></span>
                                        </p>
                                        <h5 style={{ textTransform: 'capitalize' }}>{this.state.firstName} {this.state.lastName}</h5>
                                    </div>
                                    <li className="divider"></li>  
                                    <li className="dashboard-active"><Link to="/dashboard"><span className="mdi mdi-view-dashboard-outline link-icon mdi-24px"></span>Dashboard</Link></li>
                                    <li><Link to="/myGames"><span className="mdi mdi-cube-outline link-icon mdi-24px"></span>My Games</Link></li>
                                    <li><Link to="/profile"><span className="mdi mdi-settings link-icon mdi-24px"></span>Profile</Link></li>
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
                                    <p style={{ backgroundColor: color }} className="initials">{this.state.firstName.charAt(0).toUpperCase()}</p>
                                </div>
                            </div>
                        </div>
                        <div className="main__header">
                            <h1>Dashboard</h1>
                            <h5>Account Overview</h5>
                        </div>
                        <section className="main-content">
                            <h4 style={{ color }} id="greeting">{this.greetUser()}</h4>
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

export default connect(mapStateToProps, { logoutUser, setUserColor })(Dashboard);