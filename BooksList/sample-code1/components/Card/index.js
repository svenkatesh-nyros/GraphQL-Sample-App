import React from "react";
import ImageItem from "../Image";
import PropTypes from "prop-types";
import { Card} from "semantic-ui-react";
const Ecard = ({header, subheader, description, ...props  }) => (
	<Card.Group {...props}>
		<Card fluid {...props}>
			<ImageItem fluid {...props} />
			<Card.Content>
				<Card.Header>{header}</Card.Header>
				<Card.Meta>{subheader}</Card.Meta>
				<Card.Description>{description}</Card.Description>
			</Card.Content>
		</Card>
	</Card.Group>
);

Ecard.propTypes = {
	header : PropTypes.string,
	subheader : PropTypes.string,
	description : PropTypes.string,
};

export default Ecard;


