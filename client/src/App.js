import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import ScrollToTop from './components/layout/ScrollToTop';
import Header from './components/layout/Header'
import Home from './components/Home'
import Footer from './components/layout/Footer'
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Play from './components/free-quiz/Play';
import FreeGameInstructions from './components/free-quiz/FreeGameInstructions';
import QuizSummary from './components/free-quiz/QuizSummary';
import Dashboard from './components/user/Dashboard';
import Profile from './components/user/Profile';
import Games from './components/user/Games';
import Funds from './components/user/Funds';
import Support from './components/user/Support';

import PrivateRoute from './components/common/PrivateRoute'; 

import store from './store';
import setAuthToken from './utils/setAuthToken';
import { logoutUser, setCurrentUser } from './actions/authActions';

if (localStorage.jwtToken) {
	// set auth tokwn to header auth
	setAuthToken(localStorage.jwtToken);
	// Decode token and get user info
	const decoded = jwt_decode(localStorage.jwtToken);
	// Set user and authenticated
	store.dispatch(setCurrentUser(decoded));
	// Check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		// Logout out user
		store.dispatch(logoutUser());
		window.location.href = '/';
	}
}

class App extends Component {
	render () {
		return (
			<Provider store={store}>
				<Router>
					<ScrollToTop>
						<Fragment>
							<Header />
							<Route path="/" exact component={Home} />
							<Route path="/login" exact component={Login} />
							<Route path="/register" exact component={Register} />
							<Route path="/play" exact component={Play} />
							<Route path="/play/instructions" exact component={FreeGameInstructions} />
							<Route path="/play/quizSummary" exact component={QuizSummary} />
							<Switch>
								<PrivateRoute path="/dashboard" exact component={Dashboard} />
							</Switch>
							<Switch>
								<PrivateRoute path="/profile" exact component={Profile} />
							</Switch>
							<Switch>
								<PrivateRoute path="/myGames" exact component={Games} />
							</Switch>
							<Switch>
								<PrivateRoute path="/funds" exact component={Funds} />
							</Switch>
							<Switch>
								<PrivateRoute path="/support" exact component={Support} />
							</Switch>
							<Footer />
						</Fragment>
					</ScrollToTop>
				</Router>
			</Provider>
		);
	}
}

export default App;