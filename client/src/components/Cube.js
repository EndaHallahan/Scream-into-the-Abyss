import React, { Component } from 'react';
import Pinhole from '../pinhole-js.js';

class Cube extends Component {
	constructor(props) {
		super(props);
		this.state = {
			canvas: React.createRef(),
			rx: 0,
			ry: 0,
			rz: 0,
			rotSpeed: 240
		}
		this.step = this.step.bind(this);
	} 
	step(timestamp) {
		if (this.state.canvas.current !== null) {
			const p = new Pinhole()
			p.drawCube(-0.3, -0.3, -0.3, 0.3, 0.3, 0.3);
			p.colorize("#343434")

			p.begin()
			p.drawCube(-0.1, -0.1, -0.1, 0.1, 0.1, 0.1);
			p.colorize("#343434")
			p.rotate(-2 * this.state.rx, 0, -2 * this.state.ry)
			p.end()

			p.begin()
			p.drawCube(-0.01, -0.01, -0.01, 0.01, 0.01, 0.01);
			p.colorize("#343434")
			p.rotate(0, this.state.rx, this.state.ry)
			p.end()

			let rxc = this.state.rx;
			let ryc = this.state.ry;

			this.setState({
				...this.state,
				rx: rxc + Math.PI*2/this.state.rotSpeed,
				ry: ryc + Math.PI*2/this.state.rotSpeed
			});
			
			p.rotate(this.state.rx, this.state.ry, 0)

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

export default Cube;