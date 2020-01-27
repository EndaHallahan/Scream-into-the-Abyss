import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import ScreamBox from "../components/ScreamBox.js";
import Void from "../components/Void.js";

class Scream extends Component {
	render() {
		return (
			<div>
				<Helmet>
	                <title>The Abyss - Scream</title>
	            </Helmet>
				<header className="top-left">
					<div>
		        		<h1><Link to="/">Scream Into the Abyss</Link></h1>
		        		<div className="spacer"></div>
		        		<Link to="/listen" className="listen-button">Listen</Link>
		        	</div>
		      	</header>
		      	<Void />
		      	<div className="abyssal">
					<ScreamBox />
		      	</div>
			</div>
		);
	}
}

export default Scream;