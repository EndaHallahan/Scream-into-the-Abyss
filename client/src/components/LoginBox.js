import React, { Component, Fragment } from 'react';
import { sha3_384 } from "js-sha3";

class LoginBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			error: ""
		}
		this.nameArea = React.createRef();
		this.passArea = React.createRef();
		this.postLogin = this.postLogin.bind(this);
		this.setUsername = this.setUsername.bind(this);
		this.setPassword = this.setPassword.bind(this);
	}
	postLogin() {
		let password = sha3_384(this.state.password + "abyss");
		fetch("/admin/login", {
			method: "POST",
			credentials: 'same-origin',
			body: JSON.stringify({
				username: this.state.username,
				password: password
			}),
			headers: {
				'Content-Type': 'application/json',
				"Accept": "application/json"
	        }
		})
		.then(response => {return response.json();})
		.then(data => {
			if (data.success) {
				window.location.assign("../admin");
			} else {
				this.setState({
					...this.state,
					error: data.msg
				});
			}
		})
		.catch(error => {
			console.error('Error:', error);
			this.setState({
				...this.state,
				error: error
			});
		});

	}
	setUsername(e) {
		const username = e.target.value;
		this.setState({
			...this.state,
			username: username
		});
	}
	setPassword(e) {
		const password = e.target.value;
		this.setState({
			...this.state,
			password: password
		});
	}
	render() {
		return(
			<Fragment>
				<div className="log-in">
					<div>Username:</div>
					<input 
						onChange = {this.setUsername}
						ref = {this.nameArea}
					/>
					<div>Password:</div>
					<input 
						onChange = {this.setPassword}
						ref = {this.passArea}
					/>
		      	</div>
		      	<button
	      			className="scream-button"
	      			onClick = {this.postLogin}
	      		>Log In</button>
	      		<div>{this.state.error}</div>
      		</Fragment>
		);
	}
}

export default LoginBox;