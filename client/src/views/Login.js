import React, { Component } from 'react';
import { Link } from "react-router-dom";
import LoginBox from "../components/LoginBox.js";

class Login extends Component {
	render() {
		return (
			<div>
				<header className="top-left">
					<div>
		        		<h1><Link to="/">Scream Into the Abyss</Link></h1>
		        	</div>
		      	</header>
		      	<div className="abyssal">
					<LoginBox />
		      	</div>
		    </div>
		);
	}
}

export default Login;