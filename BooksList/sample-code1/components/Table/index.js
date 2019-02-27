import React from "react";
import PropTypes from "prop-types";
import { Table} from "semantic-ui-react";

const TableItem = ({ headers, items,...props}) => (
	<Table {...props}>
		<Table.Header>
			<Table.Row>
				{headers.map((header, index) =>
					<Table.HeaderCell key={index}>{header}</Table.HeaderCell>
				)}
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{items.map((item, index) =>
				<Table.Row key={index}>
					<Table.Cell>{item.date}</Table.Cell>
					<Table.Cell>{item.event}</Table.Cell>
					{item.price?
						(<Table.Cell>{item.price}</Table.Cell>):null
					}
				</Table.Row>
			)}
		</Table.Body>
	</Table>
);

TableItem.propTypes = {
	headers : PropTypes.any,
	items: PropTypes.any
};
export default TableItem;
 