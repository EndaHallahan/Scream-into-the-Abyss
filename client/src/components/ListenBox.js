import React, { Component, Fragment } from 'react';
import Spitter from "./Spitter.js"

class ListenBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentScream: "",
			success: true,
			active: false
		}
		this.fetchScream = this.fetchScream.bind(this);
		this.cycleScream = this.cycleScream.bind(this);
	}
	cycleScream() {
		this.setState({
			...this.state,
			active: false
		});
		setTimeout(this.fetchScream.bind(this), 1000);
	}
	fetchScream() {
		fetch("/api/scream")
			.then(res => res.json())
			.then(data => this.setState({
				...this.state,
				currentScream: data && data.success ? data.result : "The Abyss is silent.",
				active: true
			}))
			.catch(err => {
				console.error(err);
				this.setState({
					...this.state,
					success: false,
					currentScream: "The Abyss is silent.",
					active: true
				});
			})
	}
	render() {
		return(
			<Fragment>
				<div className="background">
					<div className={`scream-container ${this.state.active ? "active" : ""}`} >
			      		<p>{this.state.currentScream}</p>
			      	</div>
					<Spitter />
				</div>
				<div className="abyssal">
		      		<button
		      			className="listen-button"
		      			onClick = {this.state.active ? this.cycleScream : this.fetchScream}
		      		>Listen</button>
		      	</div>
	      	</Fragment>
		);
	}
}

export default ListenBox;