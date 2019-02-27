import React from "react";
import { styles } from "./element";
import PropTypes from "prop-types";
import { Header, Icon } from "semantic-ui-react";


const WhiteTitle = ({ icon, head, subhead, desc, ...props }) => (
	<Header {...props} style={styles} >
		{icon ? <Icon.Group><Icon fitted name={icon} />{head}</Icon.Group> : head}

		<Header.Subheader content={subhead} {...props} style={styles} />
		{desc ? <Header.Subheader content={desc} {...props} style={styles} /> : null}
	</Header>
);

WhiteTitle.propTypes = {
	head: PropTypes.any,
	subhead: PropTypes.any,
	desc: PropTypes.any,
	icon: PropTypes.any
};



export default WhiteTitle;
