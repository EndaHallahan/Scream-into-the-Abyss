import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Switch, Route } from "react-router-dom";
import Helmet from "react-helmet";
import './scss/index.scss';

import Home from "./views/Home.js";
import Scream from "./views/Scream.js";
import Listen from "./views/Listen.js";
import Admin from "./views/Admin.js";
import Login from "./views/Login.js";

class App extends Component {
  	render() {
  		return (
  			<Route render={({location}) => (
  				<div className="App"> 
  					<Helmet>
		                <meta charSet="utf-8" />
		                <meta name="description" content="Scream into the Abyss" />
		                <meta name="keywords" content="scream, into, the, abyss, void, message" />
		                <meta name="author" content="RB Underwood" />
		                <title>The Abyss</title>
		            </Helmet>
			    	<TransitionGroup>
				    	<CSSTransition 
				    		timeout={{enter: 300, exit: 300}} 
				    		classNames="fade" 
				    		key={location.key}
				    	>  	
				    		<section className="route-section">
						    	<Switch location={location}>
						    		<Route path="/scream" component={Scream} />
							        <Route path="/listen" component={Listen} />
						    		<Route path="/admin" component={Admin} />
						    		<Route path="/login" component={Login} />
						    		<Route path="/" component={Home} />
						    		<Route render={() => <div><h1>404: Page not Found</h1></div>} />
						    	</Switch>
					    	</section> 
				    	</CSSTransition>
			    	</TransitionGroup>
			    	<div className="below-scroll">
			    		<div>
			      			
			      		</div>
			      	</div> 	
			    </div>
  			)} />  
		);
  	}
}

export default App;
