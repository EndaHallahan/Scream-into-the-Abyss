import React, { Component } from 'react';
import Pinhole from '../pinhole-js.js';

class Spitter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			canvas: React.createRef(),
			rz: 0,
			rotSpeed: 240 * 50
		}
		this.step = this.step.bind(this);
	} 
	step(timestamp) {
		if (this.state.canvas.current !== null) {
			const p = new Pinhole()
			let sideWidth = .3
			for (let i = .3; i > 0; i -= .05) {
				let rzc = this.state.rz;
				this.setState({
					...this.state,
					rz: rzc + Math.PI*2/this.state.rotSpeed
				});
				p.begin()

				p.begin()
				p.drawSquare(-sideWidth, -sideWidth, -sideWidth, sideWidth, sideWidth, sideWidth);
				p.colorize("#343434")
				p.translate(.4, 0, 0)
				p.rotate(0,0,i)
				p.end()

				p.begin()
				p.drawSquare(-sideWidth, -sideWidth, -sideWidth, sideWidth, sideWidth, sideWidth);
				p.colorize("#343434")
				p.translate(-.4, 0, 0)
				p.rotate(0,0,i)
				p.end()

				p.begin()
				p.drawSquare(-sideWidth, -sideWidth, -sideWidth, sideWidth, sideWidth, sideWidth);
				p.colorize("#343434")
				p.translate(0, -.4, 0)
				p.rotate(0,0,i)
				p.end()

				p.begin()
				p.drawSquare(-sideWidth, -sideWidth, -sideWidth, sideWidth, sideWidth, sideWidth);
				p.colorize("#343434")
				p.translate(0, .4, 0)
				p.rotate(0,0,i)
				p.end()

				p.rotate(0,0,i)
				p.rotate(0,0,this.state.rz)
				p.end()

				p.begin()

				p.begin()
				p.drawSquare(-sideWidth, -sideWidth, -sideWidth, sideWidth, sideWidth, sideWidth);
				p.colorize("#343434")
				p.translate(.4, 0, 0)
				p.rotate(0,0,-i)
				p.end()

				p.begin()
				p.drawSquare(-sideWidth, -sideWidth, -sideWidth, sideWidth, sideWidth, sideWidth);
				p.colorize("#343434")
				p.translate(-.4, 0, 0)
				p.rotate(0,0,-i)
				p.end()

				p.begin()
				p.drawSquare(-sideWidth, -sideWidth, -sideWidth, sideWidth, sideWidth, sideWidth);
				p.colorize("#343434")
				p.translate(0, -.4, 0)
				p.rotate(0,0,-i)
				p.end()

				p.begin()
				p.drawSquare(-sideWidth, -sideWidth, -sideWidth, sideWidth, sideWidth, sideWidth);
				p.colorize("#343434")
				p.translate(0, .4, 0)
				p.rotate(0,0,-i)
				p.end()

				p.rotate(0,0,-i)
				p.rotate(0,0,-this.state.rz)
				p.end()
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
    		<canvas 
	    		ref={this.state.canvas} 
	    		width={640} 
	    		height={400} 
    		/>
		);
	}
}

export default Spitter;