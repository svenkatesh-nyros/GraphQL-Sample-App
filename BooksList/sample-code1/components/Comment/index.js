import React from "react";
import PropTypes from "prop-types";
import { Comment} from "semantic-ui-react";
import Link from "next/link";
import { ButtonItem } from "../../components";
const Ecomment = ({ name, date, text, source}) => {
	return(
		<Comment.Group>
			<Comment>
				<Link href="ProfileNeighbor"><Comment.Avatar as="a" src={source} /></Link>
				<Comment.Content>
					<Link  href="ProfileNeighbor"><Comment.Author as="a">{name}</Comment.Author></Link>
					<Comment.Metadata>
						<span>{date}</span>
					</Comment.Metadata>
					<Comment.Text>{text}</Comment.Text>
					<div style={{ textAlign: "center" }}>
						<ButtonItem basic icon="thumbs up outline" content="Helpful" />
						{/* <ButtonItem basic icon="comment outline" content="Comment"/> */}
					</div>
				</Comment.Content>
			</Comment>
		</Comment.Group>
	);
};

Ecomment.propTypes = {
	source: PropTypes.string,
	name: PropTypes.string,
	date: PropTypes.string,
	text: PropTypes.string
};

export default Ecomment;
