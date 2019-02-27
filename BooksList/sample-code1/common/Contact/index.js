import React from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";

import {
	ButtonItem,
	Field,
	Segmant
} from "../../components";

const Contact = ({ formData, ...props }) => {
	return (
		<Segmant>
			<Form>
				{formData.map((feild, index) => (
					<Field key={index} contrl={feild.control} value={feild.value} {...props} />
				))}
				<ButtonItem fluid title="Contact Me" color="black" />
			</ Form>
		</Segmant>
	);
};

Contact.propTypes = {
	formData: PropTypes.any
};


export default Contact;
