import React from "react";
import PropTypes from "prop-types";
import { Divider, Grid, Segment } from "semantic-ui-react";
import {

	Title,
	InText,
	ImageItem, 
} from "../../components";

const Base = ({ baseData }) => {
	return (
		<Grid>
			{baseData.map((activity, index) => (
				<Grid.Row key={index}>
					<Grid.Column width={6}>
						<ImageItem
							src={activity.image}
							size={activity.size}
						/>
					</Grid.Column>
					<Grid.Column width={9}>
						<Title name={activity.name} />
						<Segment basic>
							<Title
								name={activity.likes}
								floated='left'
								size='small'
							/>
							<InText name={activity.lno} floated='left' />
							<Title
								name={activity.points}
								floated='left'
								size='small'
							/>
							<InText name={activity.pno} floated='right' />
						</Segment>
						{activity.head1?
							<Segment basic>
								<Title name={activity.head1} floated='left' size='small' />
								<InText name={activity.vhead1} floated='left' />
							</Segment>:null
						}
						{activity.head2?
							<Segment basic>
								<Title
									name={activity.head2}
									floated='left'
									size='small'
								/>
								<InText name={activity.vhead2} floated='left' />
							</Segment>:null}
						{activity.head3?
							<Segment basic>
								<Title
									name={activity.head3}
									floated='left'
									size='small'
								/>
								<InText name={activity.vhead3} floated='left' />
							</Segment>:null}
						{activity.head4?
							<Segment basic>
								<Title
									name={activity.head4}
									floated='left'
									size='small'
								/>
								<InText name={activity.vhead4} floated='left' />
							</Segment>:null}
					</Grid.Column>
				</Grid.Row>
			))}
			<Divider />
		</ Grid>
	);
};

Base.propTypes = {
	baseData: PropTypes.array.isRequired
};

export default Base;
