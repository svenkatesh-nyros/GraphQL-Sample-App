import React from "react";
import PropTypes from "prop-types";
import { Header } from "semantic-ui-react";

import {styles} from "./element";

const InText = ({name, ...props}) => (
	<Header size="small" content={name} {...props} style={styles}/>
);

InText.propTypes = {
	name : PropTypes.string
};
export default InText;
