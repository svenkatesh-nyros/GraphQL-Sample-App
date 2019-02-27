import React from "react";
import PropTypes from "prop-types";
import { Image } from "semantic-ui-react";


const ImageItem = ({source, ...props} ) => (
	<Image src={source} {...props} />
);

ImageItem.propTypes = {
	source : PropTypes.string.isRequired,
};

export default ImageItem;
