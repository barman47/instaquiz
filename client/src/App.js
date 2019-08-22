import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import ScrollToTop from './components/layout/ScrollToTop';
import Header from './components/layout/Header'
import Home from './components/Home'
import Footer from './components/layout/Footer'

import store from './store';

class App extends Component {
	render () {
		return (
			<Provider store={store}>
				<Router>
					<ScrollToTop>
						<Fragment>
							<Header />
							<Route path="/" exact component={Home} />
							<Footer />
						</Fragment>
					</ScrollToTop>
				</Router>
			</Provider>
		);
	}
}

export default App;