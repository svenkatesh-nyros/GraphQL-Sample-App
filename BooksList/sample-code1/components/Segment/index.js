import React from "react";
import PropTypes from "prop-types";
import { Segment} from "semantic-ui-react";
import {styles} from "./element";
const Segmant = ({children, ...props}) => (
	<Segment basic {...props} style={styles}>{children} </Segment>
);

Segmant.propTypes = {
	children : PropTypes.any,
};
export default Segmant;
