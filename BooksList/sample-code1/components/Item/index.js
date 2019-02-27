import React from "react";
import PropTypes from "prop-types";
import { Item } from "semantic-ui-react";
import Link from "next/link";
const ItemData = ({ source, head, subhead, desc, extra, href, ...props }) => {
	return (
		<Item.Group>
			<Link href={href}>
				<Item>
					<Item.Image {...props} src={source} style={{cursor:"pointer"}}/>
					<Item.Content verticalAlign='top'>
						<Item.Header content={head} style={{cursor:"pointer"}}/>
						{subhead ? <Item.Meta content={subhead} /> : null}
						{desc ? <Item.Description content={desc} {...props} /> : null}
						{extra ? <Item.Extra content={extra} /> : null}
					</Item.Content>
				</Item>
			</Link>
		</Item.Group>
	);
};

ItemData.propTypes = {
	source: PropTypes.string,
	head: PropTypes.any,
	subhead: PropTypes.any,
	description: PropTypes.any,
	desc: PropTypes.any,
	extra: PropTypes.any
};
export default ItemData;
