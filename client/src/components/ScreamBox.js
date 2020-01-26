import React, { Component, Fragment } from 'react';

class ScreamBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentScream: "",
			sent: false,
			success: true
		}
		this.textArea = React.createRef();
		this.screamIntoTheAbyss = this.screamIntoTheAbyss.bind(this);
		this.setScream = this.setScream.bind(this);
		this.giveFocus = this.giveFocus.bind(this);
		this.reset = this.reset.bind(this);
	}
	giveFocus() {
		this.textArea.current.focus();
	}
	componentDidMount() {
	    this.giveFocus();
	}
  	screamIntoTheAbyss() {
		if (this.state.currentScream) {
			console.log(this.state.currentScream);
			fetch("/api/scream", {
				method: "POST",
				credentials: 'same-origin',
				headers: {
				    'Content-Type': 'application/json',
				},
				body: JSON.stringify({scream: this.state.currentScream})
			})
			.then(response => response.json())
			.then(data => {
				this.setState({
					...this.state,
					sent: true,
					success: true
				});
			})
			.catch(err => {
				console.error(err);
				this.setState({
					...this.state,
					sent: true,
					success: false
				});
			})
		}
	}
	setScream(e) {
		const scream = e.target.value;
		this.setState({
			...this.state,
			currentScream: scream
		});
	}
	reset() {
		this.setState({
			...this.state,
			currentScream: "",
			sent: false
		});
	}
  	render() {
  		if (!this.state.sent) {
  			return (
	  			<Fragment>
		  			<textarea 
						onChange = {this.setScream}
						maxLength="500"
						ref={this.textArea}
					/>
					<button
		      			className="scream-button"
		      			onClick = {this.screamIntoTheAbyss}
		      		>Scream</button>
	      		</Fragment>
	  		);
  		} else {
  			if (this.state.success) {
  				return (
		  			<Fragment>
			  			<h1>The Abyss accepts your offering.</h1>
						<button
			      			className="scream-button"
			      			onClick = {this.reset}
			      		>Scream Again</button>
		      		</Fragment>
		  		);
  			} else {
  				return (
		  			<Fragment>
			  			<h1>The Abyss rejects your offering.</h1>
						<textarea 
							onChange = {this.setScream}
							maxLength="500"
							ref={this.textArea}
						>{this.state.currentScream}</textarea>
						<button
			      			className="scream-button"
			      			onClick = {this.screamIntoTheAbyss}
			      		>Scream</button>
		      		</Fragment>
		  		);
  			}
  		}
  	}
}

export default ScreamBox;