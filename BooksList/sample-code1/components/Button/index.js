import React from "react";
import PropTypes from "prop-types";
import { Button} from "semantic-ui-react";
import {styles} from "./element";
const ButtonItem = ({title, ...props}) => {
	return(
		<Button size="medium" content={title} {...props} style={styles} />);
};

ButtonItem.propTypes = {
	title : PropTypes.string,
};
export default ButtonItem;
