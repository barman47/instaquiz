import React, { Component } from 'react';
import './App.css';

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

class App extends Component {
	render () {
		const responseFacebook = (response) => {
			console.log(response);
		}

		const responseGoogle = (response) => {
			console.log(response);
		}

		return (
			<div className="App">
				<h1>Login With Facebook anf Google</h1>

				<FacebookLogin 
					appId="2555646991164200"
					fields="name, email, picture"
					callback={responseFacebook}
				/>

				{/* <GoogleLogin 
					clientId=""
					buttonText="Login with Google"
					onSuccess={responseGoogle}
					onFailure={responseGoogle}
				/> */}
			</div>
		);
	}
}

export default App;