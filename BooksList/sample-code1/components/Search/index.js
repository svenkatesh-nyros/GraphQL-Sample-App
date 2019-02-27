import React from "react";
import { Search } from "semantic-ui-react";

const SearchFeild = ({find, results,resultClick, ...props }) => {
	let data = results.map((result, index) => ({
		key:index,
		// id: index,
		title: result.formatted_address

	}));
	return (
		<Search
			showNoResults={false}
			input={{ icon: "search", iconPosition: "left", ...props, fluid:true }}
			placeholder="Search"
			onSearchChange={e => find(e)}
			onResultSelect={e =>resultClick(e)}
			results={data}
			aligned="left"
		/>
	);
};



export default SearchFeild;
