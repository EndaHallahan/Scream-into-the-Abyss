import React, { Component} from 'react';
import ScreamListItem from './ScreamListItem.js';

class ScreamList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			screamList: [],
			delList: [],
			fetched: false
		}
		this.fetchScreams = this.fetchScreams.bind(this);
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
		this.deleteScreams = this.deleteScreams.bind(this);
	}
	fetchScreams() {
		fetch("/api/screams", {
			method: "GET",
			credentials: 'same-origin'
		})
		.then(response => response.json())
		.then(data => {
			this.setState({
				...this.state,
				screamList: data.result,
				fetched: true
			});
		})
		.catch(err => {
			console.error(err);
		});
	}
	deleteScreams() {
		console.log(this.state.delList)
		fetch("/api/screams", {
			method: "DELETE",
			credentials: 'same-origin',
			body: JSON.stringify({
				screamIds: this.state.delList
			}),
			headers: {
				'Content-Type': 'application/json',
				"Accept": "application/json"
	        }
		})
		.then(response => response.json())
		.then(data => {
			if (data.success === true) {
				console.log("Screams deleted")
				this.fetchScreams()
			} else {
				console.error(data.msg);
			}		
		})
		.catch(err => {
			console.error(err);
		});
	}
	handleCheckboxChange(e) {
		let name = e.target.value;
		let index = this.state.delList.indexOf(name);
		let tempList = this.state.delList;
		if (index !== -1) {
			tempList.splice(index, 1);
		} else {
			tempList.push(name);
		}
		this.setState({
			...this.state,
			delList: tempList
		});
	}
	render() {
		if (!this.state.fetched) {
			return(
				<div>
					<button
		      			className="listen-button"
		      			onClick = {this.fetchScreams}
		      		>List All Screams</button>
		      	</div>
			);
		} else {
			return(
				<div>
					<button
		      			className="listen-button"
		      			onClick={this.deleteScreams}
		      		>Delete Selected Screams</button>
		      		<table className="scream-list">
		      			<tbody>
			      			{this.state.screamList.map((scream) =>
						        <ScreamListItem
						        	key={scream._id.toString()}
						            scream={scream} 
						            onCheckboxChange={this.handleCheckboxChange}
						        />
						    )}
					    </tbody>
		      		</table>
		      	</div>
			);
		}
	}
}

export default ScreamList;