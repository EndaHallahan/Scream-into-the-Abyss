import React, { Component} from 'react';

class ScreamListItem extends Component {
	render() {
		return(
			<tr>
				<td>
					<input
						type="checkbox" 
						name="screams" 
						value={this.props.scream._id} 
						onChange={this.props.onCheckboxChange}
					/> Delete
				</td>
				<td>
					{this.props.scream.message}
				</td>
			</tr>
		);
	}
}

export default ScreamListItem;