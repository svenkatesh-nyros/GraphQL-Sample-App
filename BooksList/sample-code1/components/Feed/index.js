import React from "react";
import PropTypes from "prop-types";
import { Feed } from "semantic-ui-react";
import {styles} from "./element";
const QuesFeed = ({ date, data,head, ...props }) => (
	<Feed>
		<Feed.Event>
			<Feed.Content>
				<Feed.Summary {...props}  style={styles} >
					{head?head:null}  <span>{data}</span>
					{date?<Feed.Date content={date} style={{float:"right"}}/>:null}
				</Feed.Summary>
			</Feed.Content>
		</Feed.Event>
	</Feed>

);


QuesFeed.propTypes = {
	date: PropTypes.any,
	data: PropTypes.any
};
export default QuesFeed;
