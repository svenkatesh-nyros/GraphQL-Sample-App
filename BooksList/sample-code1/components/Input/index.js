import React from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";

const Field = ({ contrl, pholder, ...props }) => (
	<Form.Field control={contrl} placeholder={pholder} {...props} />
);

Field.propTypes = {
	contrl: PropTypes.any.isRequired,
	pholder: PropTypes.string,
};
export default Field;
