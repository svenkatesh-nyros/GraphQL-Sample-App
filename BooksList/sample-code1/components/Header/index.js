import React from "react";
import PropTypes from "prop-types";
import { styles } from "./element";
import { Header } from "semantic-ui-react";

const Title = ({ name, ...props }) => {
	return <Header content={name} style={styles} {...props} />;
};

Title.propTypes = {
	name: PropTypes.string
};

export default Title;
