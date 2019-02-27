import React from "react";
import PropTypes from "prop-types";
import { Label} from "semantic-ui-react";
import {styles} from "./element";
const LabelTag = ({title, ...props}) => (
	<Label  content={title} {...props} style={styles} />
);

LabelTag.propTypes = {
	title : PropTypes.string,
};
export default LabelTag;
