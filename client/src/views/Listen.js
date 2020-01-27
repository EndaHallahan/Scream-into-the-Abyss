import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import ListenBox from "../components/ListenBox.js";

class Listen extends Component {
	render() {
		return (
			<div>
				<Helmet>
	                <title>The Abyss - Listen</title>
	            </Helmet>
				<header className="top-left">
					<div>
		        		<h1><Link to="/">Scream Into the Abyss</Link></h1>
		        		<div className="spacer"></div>
		        		<Link to="/scream" className="scream-button">Scream</Link>
		        	</div>
		      	</header>
		      	<ListenBox />
      		</div>
		);
	}
}

export default Listen;