import React from "react";
import { ImageItem, Segmant } from "../../components";
import {Segment } from "semantic-ui-react";

import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";


const MapContainer = ({ google}) => {
	return(
		<Segment basic style={{height:"300px"}}>
			<Map google={google} style={{ width: "100%",height: "300px"}}  scrollwheel={false}>
				<Marker />
				<InfoWindow>
					<div>
						<h1></h1>
					</div>
				</InfoWindow>
			</Map>	
		</Segment>
	);
};

export default GoogleApiWrapper({
	apiKey: ("AIzaSyAr7Xm_DWelGrp_kMhVa6n97PlRrkA5znM")
})(MapContainer);

