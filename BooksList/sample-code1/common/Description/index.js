import React from "react";
import PropTypes from "prop-types";
import {
	ButtonItem,
	Title,
	InText,
	ItemData,
	Segmant,
	Wcomment
} from "../../components";
import { Grid, Divider, Icon } from "semantic-ui-react";
// import Link from "next/link";
import { Link, animateScroll as scroll } from "react-scroll";

const Description = ({desData,display,show,toggle,visibility,change,like,onLike,review}) => {
	let limit = 200;
	return (
		<div>
			{desData.map((grid, index) => (
				<div key={index}>
					<Segmant>
						<Title name={grid.heading} size='medium' />
						{grid.p1.length <= limit ? (
							<InText name={grid.p1} floated='left' />
						) : display[index] ? (
							<div>
								<InText name={grid.p1} floated='left' />
								<span
									style={{
										display: "inline-block",
										cursor: "pointer",
										width: "100%"
									}}
									onClick={e => show(index, e)}
								>
									<Title
										name='Show Less'
										color='blue'
										floated='right'
										size='small'
									/>
								</span>
							</div>
						) : (
							<div>
								<InText
									name={grid.p1.substring(0, limit) + " ..."}
									floated='left'
								/>
								<span
									style={{
										display: "inline-block",
										cursor: "pointer",
										width: "100%"
									}}
									onClick={e => show(index, e)}
								>
									<Title
										name='Show More'
										color='blue'
										floated='right'
										size='small'
									/>
								</span>
							</div>
						)}
					</Segmant>
					<Segmant textAlign='center'>
						{like[index]?
							// <ButtonItem onClick={e=>onLike(index,e)} basic icon ><Icon name="thumbs up" color="red" />Helpful</ButtonItem>:
							<ButtonItem name="desc" onClick={(e)=>onLike(index,e)} basic icon='thumbs up' content='Helpful' />:
							<ButtonItem name="desc" onClick={(e)=>onLike(index,e)} basic icon='thumbs up outline' content='Helpful' />
						}
						<Link
							to='comment_box'
							activeClass='active'
							spy
							smooth
							offset={-70} 
							duration={500}
						>
							<ButtonItem
								basic
								icon='comment outline'
								content='Comment'
								onClick={e => toggle(index, e)}
							/>
						</Link>
					</Segmant>
					<Grid padded>
						<Grid.Column width={4}>
							<Title name={grid.heading1} size='small' floated='left' />
						</Grid.Column>
						<Grid.Column width={6}>
							<ItemData
								size='tiny'
								source={grid.image}
								head={grid.itemhead}
								subhead={grid.itemsub}
								desc={grid.desc}
								style={{ color: "blue", cursor: "pointer" }}
								href='/ProfileRealtor'
							/>
						</Grid.Column>
					</Grid>
					<Segmant id='comment_box'>
						<Wcomment
							name='oncomment'
							change={change}
							visibility={visibility[index]}
						/>
					</Segmant>
				</div>
			))}
			<Segmant>
				<ButtonItem
					size='small'
					color='red'
					icon
					labelPosition='right'
					floated='right'
					onClick={(e)=>review(e)}
				>
            Write a Review <Icon name='write' />
				</ButtonItem>
			</Segmant>
			<Segmant>
				<Divider hidden />
				<Divider />
			</Segmant>
		</div>
	);
};

Description.propTypes = {
	desData: PropTypes.array.isRequired
};

export default Description;
