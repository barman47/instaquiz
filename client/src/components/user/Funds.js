import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { addBank, addCard, logoutUser, removeBank } from '../../actions/authActions';

import Dropdown from '../input-groups/Dropdown';
import CardTextInput from '../input-groups/CardTextInput';
import FundsTextInput from '../input-groups/FundsTextInput';
import Spinner from '../common/Spinner';

class Funds extends Component {
    constructor (props) {
        super(props);
        this.state = {
            user: this.props.auth.user,
            username: this.props.auth.user.username,
            accountNumber: this.props.auth.user.accountNumber || '',
            accountName: this.props.auth.user.accountName || '',
            bank: this.props.auth.user.bank || '',
            cardNumber: this.props.auth.user.cardNumber || '',
            cardName: this.props.auth.user.cardName || '',
            cardExp: this.props.auth.user.cardExp || '',
            cvv: this.props.auth.user.cvv || '',
            cardEnding: '',
            color: this.props.auth.color,
            showPaymentNotification: true,
            showCardDetails: false,
            showBankDetails: false,
            showCardForm: false,
            showBankForm: false,
            showAddCardButton: true,
            showAddBankButton: true,
            disableEditBank: true,
            loading: false,
            errors: {}
        };
    }

    componentDidMount () {
        const sidenavElem = document.querySelectorAll('.sidenav');
        // eslint-disable-next-line
        const sidenavInstance = M.Sidenav.init(sidenavElem, {});

        const selectElement = document.querySelectorAll('select');
        // eslint-disable-next-line
        const selectInstance = M.FormSelect.init(selectElement, {});

        const { state } = this;
        
        if (state.bank === '' || state.accountNumber === '' || state.accountName === '') {
            this.setState({
                showBankDetails: false
            });
        } else {
            this.setState({
                showBankDetails: true,
                showBankForm: false,
                showAddBankButton: false
            });
        }

        if (state.cardName === '' || state.cardNumber === '' || state.cardExp === '' || state.cvv === '') {
            this.setState({
                showCardDetails: false
            });
        } else {
            this.setState({
                showCardDetails: true,
                showCardForm: false,
                showAddCardButton: false
            });
        }

        if ((state.cardName === '' || state.cardNumber === '' || state.cardExp === '' || state.cvv === '') || (state.bank === '' || state.accountNumber === '' || state.accountName === '')) {
            this.setState({
                showPaymentNotification: true
            });
        } else {
            this.setState({
                showPaymentNotification: false
            });
        }

        this.setCardEnding();
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors,
                loading: false
            });
        }

        if (nextProps) {
            console.log(nextProps);
        }
        // if (nextProps.auth.user) {
        //     this.setState({
        //         accountNumber: '',
        //         accountName: '',
        //         bank: '',
        //         cardNumber: '',
        //         cardName: '',
        //         cardExp: '',
        //         cvv: '',
        //     });
        // }
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

    handleAddPayment = (e) => {
        switch (e.target.id) {
            case 'add-card':
                this.setState({
                    showCardForm: true,
                    showBankForm: false
                });
                break;

            case 'change-card':
                this.setState({
                    showCardForm: true,
                    showBankForm: false,
                    cardNumber: '',
                    cardName: '',
                    cardExp: '',
                    cvv: '',
                }, () => {
                    document.getElementById('card-form').reset();
                });
                break;

            case 'add-bank':
                this.setState({
                    showBankForm: true,
                    showCardForm: false
                });
                break;

            default: 
                break;
        }
    }

    handleChangeBank = (e) => {
        switch (e.target.id) {
            case 'change-bank':
                this.setState({
                    showBankForm: true
                });
                break;

            case 'remove-bank':
                this.props.removeBank();
                break;

            default:
                break;
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleLogoutUser = () => {
        this.props.logoutUser();
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        switch(e.target.id) {
            case 'card-form':
                const card = {
                    cardNumber: this.state.cardNumber,
                    cardName: this.state.cardName,
                    cardExp: this.state.cardExp,
                    cvv: this.state.cvv,
                };
                this.props.addCard(card);
                this.setState({ loading: true });
                break;

            case 'bank-form':
                const bank = {
                    accountNumber: this.state.accountNumber,
                    accountName: this.state.accountName,
                    bank: this.state.bank,
                };
                this.props.addBank(bank);
                this.setState({ loading: true });
                break;

            default:
                break;
        }
    }

    setCardEnding = () => {
        let card = this.state.cardNumber.toString().split('');
        let cardEnding = [];
        card.forEach((digit, index) => {
            if (index >= card.length - 4) {
                cardEnding.push(digit);
            }
        });

        this.setState({
            cardEnding: cardEnding.join('')
        })
        // const newCardEnding = cardEnding.join('');
    }

    render () {
        const { state } = this;
        const { cardEnding, color, errors, user } = this.state;
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
                            <li className="funds-active"><Link to="/funds"><span className="mdi mdi-credit-card link-icon mdi-24px"></span>Funds</Link></li>
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
                                    <li><Link to="/profile"><span className="mdi mdi-settings link-icon mdi-24px"></span>Profile</Link></li>
                                    <li className="funds-active"><Link to="/funds"><span className="mdi mdi-credit-card link-icon mdi-24px"></span>Funds</Link></li>
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
                            <h1>My Funds</h1>
                            <h5>View and Edit Your Payment Information</h5>
                        </div>
                        <section className="main-content">
                            <div className="funds-content">
                                <div className={classnames('funds-info', { 'hide': state.showCardDetails === false})}>
                                    <div>
                                        <p>This account is currently funded by</p>
                                        <p>XXXX-XXXX-XXXX-{cardEnding}</p>
                                    </div>
                                    <div>
                                        <button onClick={this.handleAddPayment} id="change-card" className="card-button">Change Credit Card</button>
                                        <button className="card-button">Remove Credit Card</button>
                                    </div>
                                </div>
                                <div className={classnames('bank-container', { 'hide': state.showBankDetails === false })}>
                                    <div className="bank-details">
                                        <p><span className="title">Account Name:</span> {state.accountName}</p>
                                        <p><span className="title">Account Number:</span> {state.accountNumber}</p>
                                        <p><span className="title">Bank Name:</span> {state.bank}</p>
                                    </div>
                                    <div className="bank-details-button-container">
                                        <button className="add-payment" id="change-bank" onClick={this.handleChangeBank}>Change Bank</button>
                                    </div>
                                </div>
                                <section className={classnames('payment-message', { 'hide': state.showPaymentNotification === false })}>
                                    <p><span className="mdi mdi-information-outline mdi-24px"></span>Payment information is unavailable or incomplete. Please add a bank account and (or) a credit card to enable you make and receive payments.</p>
                                    <div>
                                        <button className={classnames('add-payment', { 'hide': state.showAddCardButton === false })} id="add-card" onClick={this.handleAddPayment}>Add Credit Card</button>
                                        <button className={classnames('add-payment', { 'hide': state.showAddBankButton === false })} id="add-bank" onClick={this.handleAddPayment}>Add Bank Account</button>
                                    </div>
                                </section>
                                <form onSubmit={this.handleFormSubmit} id="bank-form" className={classnames('', { 'hide': state.showBankForm === false })}>
                                    <h5>Bank Account Details</h5>
                                    <p>Enter your local bank account details to be enable us send funds to your bank account.</p>
                                    <div className="row">
                                        <CardTextInput
                                            type="number"
                                            icon="mdi mdi-numeric prefix"
                                            id="accountNumber"
                                            name="accountNumber"
                                            value={state.accountNumber}
                                            onChange={this.onChange}
                                            label="Account Number"
                                            errorMessage={errors.accountNumber}
                                        />
                                        <CardTextInput
                                            icon="mdi mdi-alphabetical prefix"
                                            id="accountName"
                                            name="accountName"
                                            value={state.accountName}
                                            onChange={this.onChange}
                                            label="Account Name"
                                            errorMessage={errors.accountName}
                                        />
                                    </div>
                                    <div className="row">
                                        <Dropdown 
                                            id="bank"
                                            name="bank"
                                            value={state.bank}
                                            onChange={this.onChange}
                                            errorMessage={errors.bank}
                                            label="Bank Name"
                                        />
                                    </div>
                                    <div className="col">
                                        <button type="submit">Add Bank</button>
                                        <button disabled={state.disableEditBank} id="edit-bank" type="submit">Edit Details</button>
                                    </div>
                                </form>
                                <form onSubmit={this.handleFormSubmit} id="card-form" className={classnames('', { 'hide': state.showCardForm === false })}>
                                    <h5>Credit Card Information</h5>
                                    <p>Provide card details to enable you funbd your e-wallet.</p>
                                    <div className="credit-card-container">
                                        <CardTextInput
                                            icon="mdi mdi-credit-card prefix"
                                            id="cardNumber"
                                            name="cardNumber"
                                            value={state.cardNumber.toString()}
                                            onChange={this.onChange}
                                            label="Number on Card"
                                            errorMessage={errors.cardNumber}
                                            info="XXXX-XXXX-XXXX-XXXX"
                                        />
                                        <CardTextInput
                                            icon="mdi mdi-alphabetical prefix"
                                            id="cardName"
                                            name="cardName"
                                            value={state.cardName}
                                            onChange={this.onChange}
                                            label="Name on Card"
                                            errorMessage={errors.cardName}
                                            info="e.g. John Doe"
                                        />
                                    </div>
                                    <div className="credit-card-container">
                                        <FundsTextInput
                                            icon="mdi mdi-calendar-month prefix"
                                            id="cardExp"
                                            name="cardExp"
                                            value={state.cardExp.toString()}
                                            onChange={this.onChange}
                                            label="Expiry Date"
                                            errorMessage={errors.cardExp}
                                            info="XX/XX"
                                        />
                                        <FundsTextInput
                                            icon="mdi mdi-numeric prefix"
                                            id="cvv"
                                            name="cvv"
                                            value={state.cvv.toString()}
                                            onChange={this.onChange}
                                            label="CVV"
                                            errorMessage={errors.cvv}
                                            info="e.g. XXX"
                                        />
                                    </div>
                                    <div className="col">
                                        <button type="submit">Add Card</button>
                                    </div>
                                </form>
                            </div>
                        </section>
                        <div><p>&copy; Copyright Instaquiz 2019</p></div>
                    </section>
                </div>
                <Spinner loading={this.state.loading} text="One moment . . ." />
            </Fragment>
        );
    }
}

Funds.propTypes = {
    addBank: PropTypes.func.isRequired,
    addCard: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    removeBank: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { addBank, addCard, logoutUser, removeBank })(Funds);