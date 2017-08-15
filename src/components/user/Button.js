import React from 'react';
import propTypes from 'prop-types';
class Button extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			buttonText:''
		}	
	}
	onButtonClick(e){
		e.preventDefault();
		this.props.onButtonClick && this.props.onButtonClick();
	}
	render(){
		return <button onClick={this.onButtonClick.bind(this)}>{this.props.buttonText || this.state.buttonText}</button>
	}
}

Button.propTypes = {
	onButtonClick:propTypes.func,
	buttonText:propTypes.string
}
export default Button;