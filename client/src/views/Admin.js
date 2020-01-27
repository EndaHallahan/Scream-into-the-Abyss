import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import ScreamCounter from "../components/ScreamCounter.js";
import ScreamList from "../components/ScreamList.js";
import LogoutButton from "../components/LogoutButton.js";

class Admin extends Component {
	render() {
		return (
			<div>
				<Helmet>
	                <title>The Abyss - Admin</title>
	            </Helmet>
				<header className="top-left">
					<div>
		        		<h1><Link to="/">Scream Into the Abyss</Link></h1>
		        		<div className="spacer"></div>
		        		<LogoutButton />
		        	</div>
		      	</header>
		      	<div className="abyssal">
					<h1>Admin</h1>
					<h3><ScreamCounter /></h3>
					<ScreamList />
				</div>
		    </div>
		);
	}
}

export default Admin;