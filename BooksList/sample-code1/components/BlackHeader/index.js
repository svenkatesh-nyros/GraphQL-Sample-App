import React from "react";
import PropTypes from "prop-types";
import { Header, Icon } from "semantic-ui-react";


const BlackTitle = ({ icon, head, subhead, desc, ...props }) => (
	<Header {...props} >
		{icon ? <Icon.Group><Icon fitted name={icon} />{head}</Icon.Group> : head}
		<Header.Subheader content={subhead} {...props} />
		{desc ? <Header.Subheader content={desc} {...props} /> : null}
	</Header>
);

BlackTitle.propTypes = {
	head: PropTypes.any,
	subhead: PropTypes.any,
	desc: PropTypes.any,
	icon: PropTypes.any
};



export default BlackTitle;
