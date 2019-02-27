import React from "react";
import PropTypes from "prop-types";
import {  Grid } from "semantic-ui-react";
import Link from "next/link";
import {

	Title,
	Segmant,
	ImageItem, 
	CustomFeed
} from "../../components";

const Activities = ({ activityData, onClick, display, ...props }) => {
	return (
		<Grid>
			{activityData.map((activity, index) => (
				<Grid.Row key={index}>
					<Grid.Column width={5}>
						<Link {...props}><ImageItem src={activity.image} /></Link>
					</ Grid.Column>
					<Grid.Column width={11}>
						<Title color="blue" name={activity.title} />
						{typeof(activity.review) == "object"?
							<div>
								{!activity.review?null:activity.review.length <= 3?
									<Segmant>
										{activity.review.map((data, index) => (
											<div style={{paddingTop:10}} key={index}>
												<CustomFeed date={data.rdate} head={data.head1} data={data.review}/>
												<CustomFeed data={data.written}/>
											</div>
										))}
									</Segmant>:display[index]?(
										<div>	
											<Segmant>
												{activity.review.slice(0,6).map((data, index) => (
													<div style={{paddingTop:10}} key={index}>
														<CustomFeed date={data.rdate} head={data.head1} data={data.review}/>
														<CustomFeed data={data.written}/>
													</div>
												))}
											</Segmant>
											<span
												style={{
													display: "inline-block",
													cursor: "pointer",
													width: "100%"
												}}
												onClick={e => onClick(e, index)}
											>
												<Title
													name="Show Less"
													color="black"
													size="small"
													floated="right"
												/>
											</span>
										</div>):<div>
										<Segmant>
											{activity.review.slice(0,3).map((data, index) => (
												<div style={{paddingTop:10}} key={index}>
													<CustomFeed date={data.rdate} head={data.head1} data={data.review}/>
													<CustomFeed data={data.written}/>
												</div>
											))}
										</Segmant>
										<span
											style={{
												display: "inline-block",
												cursor: "pointer",
												width: "100%"
											}}
											onClick={e => onClick(e, index)}
										>
											<Title
												name="Show More"
												color="black"
												size="small"
												floated="right"
											/>
										</span>
									</div>
								}
							</div>:
							<Segmant>
								<CustomFeed date={activity.rdate} head="Reviews :" data={activity.review}/>
								<CustomFeed  data={activity.written}/>
							</Segmant>
						}
						{typeof(activity.question) == "object"?
							<div>
								{!activity.question?null:activity.question.length <= 3?
									<Segmant>
										{activity.question.map((data, index) => (
											<div style={{paddingTop:10}} key={index}>
												<CustomFeed date={data.date} head={data.head1} data={data.question}/>
												<CustomFeed data={data.answer}/>
											</div>
										))}
									</Segmant>:display[index]?(
										<div>	
											<Segmant>
												{activity.question.slice(0,6).map((data, index) => (
													<div style={{paddingTop:10}} key={index}>
														<CustomFeed date={data.date} head={data.head1} data={data.question}/>
														<CustomFeed data={data.answer}/>
													</div>
												))}
											</Segmant>
											<span
												style={{
													display: "inline-block",
													cursor: "pointer",
													width: "100%"
												}}
												onClick={e => onClick(e, index)}
											>
												<Title
													name="Show Less"
													color="black"
													size="small"
													floated="right"
												/>
											</span>
										</div>):<div>
										<Segmant>
											{activity.question.slice(0,3).map((data, index) => (
												<div style={{paddingTop:10}} key={index}>
													<CustomFeed date={data.date} head={data.head1} data={data.question}/>
													<CustomFeed data={data.answer}/>
												</div>
											))}
										</Segmant>
										<span
											style={{
												display: "inline-block",
												cursor: "pointer",
												width: "100%"
											}}
											onClick={e => onClick(e, index)}
										>
											<Title
												name="Show More"
												color="black"
												size="small"
												floated="right"
											/>
										</span>
									</div>
								}
							</div>:
							<Segmant>
								<CustomFeed date={activity.qdate} head="Questions :" data={activity.question}/>
								<CustomFeed data={activity.answer}/>
							</Segmant>
						}
					</ Grid.Column>
				</Grid.Row>
			))}
		</ Grid>
	);
};

Activities.propTypes = {
	activityData: PropTypes.array.isRequired
};

export default Activities;
