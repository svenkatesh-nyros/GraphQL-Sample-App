import React, { Component } from 'react';

export default class FormError extends Component{
	render(){
		return(
			this.props.err_status ? <p className="err_msg">{this.props.err_msg}</p> : <p className="err_msg"></p>
		);
	}
}