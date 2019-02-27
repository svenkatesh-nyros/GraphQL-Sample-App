import React,{Component} from "react";
import axios from "axios";
import Router from "next/router";
import { Responsive} from "semantic-ui-react";
import PropTypes from "prop-types";
import {Config,  LoginModal, SignupModal} from "../components";
import Nav from "./nav";

class Layout extends Component {
	constructor() {
		super();
		this.state = {
			places:[],
			lmodal:false,
			smodal: false
		};
	}

	onSearch = (e) => {
		let apiKey = "c5c8f5c57b782e1155b1e542152c8f8ef28be78";
		axios.get("https://api.geocod.io/v1.3/geocode?q="+ encodeURIComponent(e.target.value) +"&api_key=" + encodeURIComponent(apiKey))
			.then((response) => {
				let places = response.data.results;
				this.setState({places});
			})
			.catch(error => {
			});
	};

	onSelect = (e) =>{
		Router.push("/DetailsNh");
	}

	buttonClick = (e) =>{
		let name = e.target.name;
		let {lmodal , smodal} = this.state;
		name === "signup"?
			this.setState({smodal:!smodal}):
			this.setState({lmodal:!lmodal});
	}

	nextModal = (e) =>{
		let id = e.target.id;
		id === "smodal"?
			this.setState({smodal:false, lmodal:true}):
			this.setState({smodal:true, lmodal:false});
	} 

	handleSubmit =() =>{
		this.setState({smodal:false,lmodal:false});
	}

	render(){ 
		let { places, lmodal, smodal } = this.state;

		return(
			<Responsive>
				<Config />
				<Nav search={this.props.search} find={this.onSearch} results={places}
					resultClick={this.onSelect} button={this.buttonClick} />
				<LoginModal iconclick={this.handleSubmit} open={lmodal} next={this.nextModal} submit={this.handleSubmit}/>
				{this.props.children}
				<SignupModal iconclick={this.handleSubmit} open={smodal} next={this.nextModal} submit={this.handleSubmit} />
			</Responsive>

		);}
}

Layout.propTypes = {
	children : PropTypes.any,
	search: PropTypes.bool
};

export default Layout;



