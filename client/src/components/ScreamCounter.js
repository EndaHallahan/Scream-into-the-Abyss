import React, { Component} from 'react';

class ScreamCounter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			screamCount: 0
		}
	}
	componentDidMount() {
	    fetch("/api/screamcount", {
			method: "GET",
			credentials: 'same-origin'
		})
		.then(response => response.json())
		.then(data => {
			this.setState({
				...this.state,
				screamCount: data.result
			});
		})
		.catch(err => {
			console.error(err);
		});
	}
	render() {
		return(
			<span>Screams in the Abyss: {this.state.screamCount}</span>
		);
	}
}

export default ScreamCounter;