import React from "react";
import PropTypes from "prop-types";
import { Divider } from "semantic-ui-react";
import { Link, animateScroll as scroll } from "react-scroll";
import {
	Ecomment,
	ButtonItem,
	Title,
	Segmant,
	InText,
	QuesFeed,
	Wcomment
} from "../../components";

const CommentList = ({
	commentData,
	display,
	click,
	visibility,
	toggle,
	change,
	show,
	replies,
	rplylike, 
	queslike,
	onLike,
	changeval,
	submit, 
	value,
	...props
}) => {
	let data = display ? commentData.slice(0, 6) : commentData.slice(0, 3);
	let length = 1;

	return (
		<Segmant>
			<Divider hidden />
			{data.map((comment, index) => (
				<div key={index}>
					<QuesFeed
						date={comment.questions.date}
						data={comment.questions.data}
					/>
					<InText name={comment.questions.answer} color="black" size="small" />
					<div style={{ textAlign: "center" }}>
						{queslike[index]?
							// <ButtonItem onClick={e=>onLike(index,e)} basic icon ><Icon name="thumbs up" color="red" />Helpful</ButtonItem>:
							<ButtonItem name="ques" onClick={(e)=>onLike(index,e)} basic icon='thumbs up' content='Helpful' />:
							<ButtonItem name="ques" onClick={(e)=>onLike(index,e)} basic icon='thumbs up outline' content='Helpful' />
						}
						{/* <ButtonItem basic icon="thumbs up outline" content="Helpful" /> */}
						<Link
							to="reply_box"
							activeClass="active"
							spy={true}
							smooth={true}
							offset={-70}
							duration={500}
						>
							<ButtonItem
								basic
								icon="comment outline"
								content="Reply"
								onClick={e => toggle(index, e)}
								{...props}
							/>
						</Link>
					</div>
					<Segmant>
						<div key={index}>
							{!comment.reviews? null: comment.reviews.length <= length ? (
								<div>
									{comment.reviews.map((data, index) => (
										<Ecomment
											key={index}
											source={data.image}
											name={data.author}
											date={data.date}
											text={data.data}
											visibility={visibility}
										/>
									))}
								</div>
							) : show[index] ? (
								<div>
									<span
										style={{
											display: "inline-block",
											cursor: "pointer",
											width: "100%"
										}}
										onClick={e => replies(e, index)}
									>
										<Title
											name="Hide reply"
											color="blue"
											size="small"
											floated="left"
										/>
									</span>
									{comment.reviews.slice(0,6).map((data, index) => (
										<Ecomment
											key={index}
											source={data.image}
											name={data.author}
											date={data.date}
											text={data.data}
											visibility={visibility}
										/>
									))}
								</div>
							) : (
								<div>
									{comment.reviews.length > length?
										<div>
											<span
												style={{
													display: "inline-block",
													cursor: "pointer",
													width: "100%"
												}}
												onClick={e => replies(e, index)}
											>
												<Title
													name="Show Previous replies"
													color="blue"
													size="small"
													floated="left"
												/>
											</span>
											{comment.reviews.slice(0,1).map((data, index) => (
												<Ecomment
													key={index}
													source={data.image}
													name={data.author}
													date={data.date}
													text={data.data}
													visibility={visibility}
												/>
											))}
										</div>:null
									}
								</div>
							)}
						</div>
					</Segmant>
					<Wcomment
						name="onreply"
						change={change}
						visibility={visibility[index]}
						changeval={changeval}
						submit={submit}
						value={value}
						form="reply"
					/>
				</div>
			))}
			{display ? (
				<span
					style={{ display: "inline-block", cursor: "pointer", width: "100%" }}
					onClick={e => click(e)}
				>
					<Title
						name="Show Less Question"
						color="blue"
						size="small"
						floated="right"
						id="reply_box"
					/>
				</span>
			) : (
				<span
					style={{ display: "inline-block", cursor: "pointer", width: "100%" }}
					onClick={e => click(e)}
				>
					<Title
						name="Show More Question"
						color="blue"
						size="small"
						floated="right"
						id="reply_box"
					/>
				</span>
			)}
		</Segmant>
	);
};

CommentList.propTypes = {
	commentData: PropTypes.array.isRequired
};

export default CommentList;
