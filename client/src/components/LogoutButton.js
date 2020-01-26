import React, { Component} from 'react';

class LogoutButton extends Component {
	constructor(props) {
		super(props);
		this.postLogout = this.postLogout.bind(this);
	}
	postLogout() {
		fetch("/admin/logout", {
			method: "GET",
			credentials: 'same-origin'
		})
		.then(response => {return response.json();})
		.then(data => {
			if (data.success) {
				window.location.assign("../");
			} else {
				this.setState({
					...this.state,
					error: data.msg
				});
			}
		})
		.catch(err => {
			console.error(err);
		});
	}
	render() {
		return(
			<button
      			className="listen-button"
      			onClick = {this.postLogout}
      		>Log Out</button>
		);
	}
}

export default LogoutButton;