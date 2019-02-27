import React from "react";
import ReactStreetview from "react-streetview";

const StreetView = () =>{
    
	const googleMapsApiKey = "AIzaSyAr7Xm_DWelGrp_kMhVa6n97PlRrkA5znM";

	// see https://developers.google.com/maps/documentation/javascript/3.exp/reference#StreetViewPanoramaOptions
	const streetViewPanoramaOptions = {
		position: { lat: 46.9171876, lng: 17.8951832 },
		pov: { heading: 100, pitch: 0 },
		zoom: 1
	};

	return (
		<div style={{
			width: "1200px",
			height: "600px",
			backgroundColor: "#eeeeee",
			margin:"0 auto"
		}}>
			<ReactStreetview
				apiKey={googleMapsApiKey}
				streetViewPanoramaOptions={streetViewPanoramaOptions}
			/>
		</div>
	);

};
export default StreetView;
