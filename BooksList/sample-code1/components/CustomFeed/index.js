import React from "react";
import PropTypes from "prop-types";
import { Feed } from "semantic-ui-react";
import { styles } from "./element";
const CustomFeed = ({ date, data, head, ...props }) => {
	return (
		<Feed style={{margin:0}}>
			<Feed.Event >
				{typeof data === "string" || "undefined" ? (
					<Feed.Content>
						<Feed.Summary {...props} style={styles}>
							{head ?<span> {head}<a style={{paddingLeft:10}}>{data}</a> </span>:
								<a style={{paddingLeft:75}}>{data}</a>} 
							{date ? (
								<Feed.Date content={date} style={{ float: "right" }} />
							) : null}
						</Feed.Summary>
					</Feed.Content>
				) : (
					<div>
						{data.map((item, index) => (
							<Feed.Content key={index}>
								<Feed.Summary {...props} style={styles}>
									{head ? head : null} <a>{item.data}</a>
									{date ? (
										<Feed.Date content={date} style={{ float: "right" }} />
									) : null}
								</Feed.Summary>
							</Feed.Content>
						))}
					</div>
				)}
			</Feed.Event>
		</Feed>
	);
};

CustomFeed.propTypes = {
	date: PropTypes.any,
	data: PropTypes.any
};
export default CustomFeed;
