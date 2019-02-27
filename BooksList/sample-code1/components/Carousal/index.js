import React from "react";
import PropTypes from "prop-types";
import { Carousel } from "react-responsive-carousel";
import { Segmant } from "../../components";
const Gallery = ({ imageData, toggle, street }) => {
	(street?imageData.push("/static/images/icon.jpg"):null);
	let length = imageData.length; 
	return (
		<div>
			<Segmant>
				{street?
					<Carousel showIndicators={false} infiniteloop={true} autoPlay interval={2000} onClickThumb={(e)=>toggle(e, length)}>
						{imageData.map((image, index) =>
							<div key={index}>
								<img src={image} />
							</div>
						)}
					</Carousel>:
					<Carousel showIndicators={false} infiniteloop={true} autoPlay interval={2000} >
						{imageData.map((image, index) =>
							<div key={index}>
								<img src={image}  />
							</div>
						)}
					</Carousel>}
			</Segmant >
		</div>
	);
};

Gallery.propTypes = {
	imageData: PropTypes.array.isRequired,
	button: PropTypes.bool
};
export default Gallery;
