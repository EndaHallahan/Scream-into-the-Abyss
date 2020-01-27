import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import Cube from "../components/Cube.js";

class Home extends Component {
	render() {
		return (
			<div>
				<Helmet>
	                <title>The Abyss</title>
	            </Helmet>
				<Cube />
				<div className="abyssal">
					
					<header>
			        	<h1>Scream Into the Abyss</h1>
			      	</header>
			      	
			      	<Link to="/scream" className="scream-button">Scream</Link>
			      	<Link to="/listen" className="listen-button">Listen</Link>

			      	<h3>Speak your thoughts and troubles into the void. Maybe someone, somewhere, will hear you.</h3>
		      	</div>
		    </div>
		);
	}
}

export default Home;