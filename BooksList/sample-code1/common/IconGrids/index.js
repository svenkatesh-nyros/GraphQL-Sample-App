import React from "react";
import PropTypes from "prop-types";
import { Grid } from "semantic-ui-react";
import {Title,ImageItem} from "../../components";

const IconsGrid = ({ gridData }) =>
	<Grid columns={9} >
		<Grid.Row style={{padding:0}}>
			{gridData.map((grid, index) =>
				<Grid.Column key={index}>
					<ImageItem centered source={grid.HeaderImage} />
					<Title size ="small" name={grid.SubContent} textAlign="center" />
				</Grid.Column>
			)}
		</Grid.Row>
	</Grid>;

IconsGrid.propTypes = {
	gridData: PropTypes.array.isRequired
};

export default IconsGrid;