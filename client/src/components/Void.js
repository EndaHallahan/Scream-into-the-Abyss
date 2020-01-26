import React, { Component } from 'react';
import Pinhole from '../pinhole-js.js';

class Void extends Component {
	constructor(props) {
		super(props);
		this.state = {
			canvas: React.createRef(),
			rz: 0,
			rotSpeed: 960 * 40
		}
		this.step = this.step.bind(this);
	} 
	step(timestamp) {
		if (this.state.canvas.current !== null) {
			const p = new Pinhole()
			for (let i = .5; i > 0; i -= .05) {
				let rzc = this.state.rz;

				this.setState({
					...this.state,
					rz: rzc + Math.PI*2/this.state.rotSpeed
				});
				for (let j=1;j<=3;j++) {
					p.begin()
					p.drawSquare(-i, -i, -i, i, i, i);
					p.colorize("#343434")
					p.rotate(0,0,this.state.rz * j)
					p.end()
				}
				for (let j=1;j<=3;j++) {
					p.begin()
					p.drawSquare(-i, -i, -i, i, i, i);
					p.colorize("#343434")
					p.rotate(0,0,-this.state.rz * j)
					p.end()
				}
			}
			p.render(this.state.canvas.current);
		}
		window.requestAnimationFrame(this.step);
	}
	componentDidMount() {
		window.requestAnimationFrame(this.step);
	}
	render() {
		return(
			<div className="background">
	    		<canvas 
		    		ref={this.state.canvas} 
		    		width={640} 
		    		height={400} 
	    		/>
	    	</div>
		);
	}
}

export default Void;