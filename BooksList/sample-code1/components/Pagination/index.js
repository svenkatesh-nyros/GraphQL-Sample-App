import React from "react";
import PropTypes from "prop-types";
import { Pagination,Icon } from "semantic-ui-react";
import { Title } from "../../components";

const Paginate = ({ length, prev,active, ...props }) => {
	let id = {...props};
	let pages = length / 3;
	let prevCond = active <= 1;
	let nextCond = active ==pages;
	return (
		<div style={{textAlign:"center"}}>
			<Pagination 
				boundaryRange={0}
				secondary
				defaultActivePage={1}
				ellipsisItem={null}
				firstItem={null}
				lastItem={null}
				totalPages={pages}
				prevItem={prevCond?null:{ content: <Title size="small" color="blue" floated="left">Prev<Icon name='angle left' /></Title>, icon: true }}
				nextItem={nextCond?null:{ content: <Title size="small" color="blue" floated="left"><Icon name='angle right' />Next</Title>, icon: true }}				
				pageItem={null}
				onPageChange={(e, value) => prev(e, { value },id)}
			/>
		</div>
	);
};

Paginate.propTypes = {
	length: PropTypes.number.isRequired,
	prev: PropTypes.func,
	active: PropTypes.number
};

export default Paginate;
