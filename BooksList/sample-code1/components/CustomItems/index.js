import React from "react";
import PropTypes from "prop-types";
import { Item} from "semantic-ui-react";
import {Paginate} from "../../components";
import Link from "next/link";
import {header, subheader, description, extra} from "./element";
const CustomItems = ({ itemData , prev , active, ...props}) => {
	let data = itemData.length;
	let page_size = 3;
	let indexdata = (active - 1) * page_size;	
	return (
		<div>
			<Link {...props}>
				<Item.Group>
					{itemData.slice(indexdata).slice(0, page_size).map((item, index) => (
						<Item key={index}>
							<Item.Image {...props} src={item.image} />
							<Item.Content verticalAlign='top'>
								<Item.Header content={item.head} style={header} />
								{item.subhead ? <Item.Meta content={item.subhead} style={subheader} /> : null}
								{item.desc ? <Item.Description content={item.desc} {...props} style={description}/> : null}
								{item.extra ? <Item.Extra content={item.extra} style={extra} /> : null}
							</Item.Content>
						</Item>
					))} 
				</Item.Group>
			</Link>
			<Paginate length={data} prev={prev} active={active} {...props}/>
		</div>
	);
};

CustomItems.propTypes = {
	itemData: PropTypes.array
};
export default CustomItems;
