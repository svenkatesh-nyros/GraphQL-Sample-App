import React from "react";
import PropTypes from "prop-types";
import { Segment } from "semantic-ui-react";
import { ItemData, Paginate } from "../../components";

const ItemsList = ({
	itemData,
	href,
	prev,
	active,
	header,
	getData,
	...props
}) => {
	let data = itemData.length;
	let page_size = 3;
	let indexdata = (active - 1) * page_size;
	return (
		<Segment basic>
			{itemData
				.slice(indexdata)
				.slice(0, page_size)
				.map((item, index) => (
					<ItemData
						key={index}
						href={href}
						size={item.size}
						source={item.image}
						head={item.head}
						subhead={item.subhead}
						desc={item.desc ? item.desc : null}
						extra={item.extra ? item.extra : null}
						header={header}
						onClick={e => getData?getData(e, item.head):e.preventDefault}
					/>
				))}
			<Paginate length={data} prev={prev} active={active} {...props} />
		</Segment>
	);
};

ItemsList.propTypes = {
	itemData: PropTypes.array.isRequired
};

export default ItemsList;   
