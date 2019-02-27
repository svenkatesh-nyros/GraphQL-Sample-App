import React from "react";
import PropTypes from "prop-types";
import { Menu, Divider,Button } from "semantic-ui-react";
import {ImageItem,SearchFeild ,ButtonItem} from "../components";
import Link from "next/link";

const Nav = ({search, find, results, resultClick, button})=>{
	return(
		<div>
			<Menu text style={{margin:0}}>
				<Menu.Menu position='left'>
					<Menu.Item>
						<ImageItem size="tiny" source="/static/images/logo.png" style={{height:90}} />
					</Menu.Item>
					{search?
						<Menu.Item>
							<SearchFeild size="small" style={{width:400, marginTop:30}}
								find={find} results={results} resultClick={resultClick}/>
						</Menu.Item>:null
					}
				</Menu.Menu>
				<Menu.Menu position='right'>
					<Menu.Item style={{top:-25}}>
						<Button.Group >
							<Link href="/"><ButtonItem basic color="grey" title="Home" floated="right"/></Link>
							<ButtonItem name="signup" basic color="grey" title="Signup" floated="right"  onClick={(e)=>button(e)}/>
							<ButtonItem name="login" basic color="grey" title="Login" floated="right" onClick={(e)=>button(e)}/>
						</Button.Group>
					</Menu.Item>
				</Menu.Menu>
			</Menu>
			<Divider style={{margin:"0.5rem 0"}}/>
		</div>);};

Nav.propTypes = {
	search: PropTypes.bool
};
export default Nav;
