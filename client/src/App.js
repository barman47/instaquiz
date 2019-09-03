import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import ScrollToTop from './components/layout/ScrollToTop';
import Header from './components/layout/Header'
import Home from './components/Home'
import Footer from './components/layout/Footer'
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Play from './components/free-quiz/Play';
import FreeQuiz from './components/free-quiz/FreeQuiz';

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
							<Route path="/play/freeQuiz" exact component={FreeQuiz} />
							<Footer />
						</Fragment>
					</ScrollToTop>
				</Router>
			</Provider>
		);
	}
}

export default App;