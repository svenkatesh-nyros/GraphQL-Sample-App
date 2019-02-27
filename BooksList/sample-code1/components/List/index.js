import React from "react";
import PropTypes from "prop-types";
import { List } from "semantic-ui-react";

const ListItems = ({listItem}) =>
	<List as='ol'>
		{listItem.map((list,index) => 
			<List.Item key={index} as='li' value='-'>
				<a href='#'>{list}</a>
			</List.Item>)}
	</List>;

ListItems.propTypes = {
	listItem : PropTypes.array.isRequired
};

export default ListItems;
