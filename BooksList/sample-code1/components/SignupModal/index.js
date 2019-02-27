import React from "react";
import * as yup from "yup";
import { Modal, Divider, Segment, Icon, Grid } from "semantic-ui-react";
import { Title, Field, ButtonItem, InText, Segmant } from "../../components";
import { Button, Form, Input } from "formik-semantic-ui";
import { styles } from "./element";

const SignupModal = ({ open, submit, next, iconclick }) => {

	const validations = yup.object().shape({
		first_name: yup.string().min(3, "Minimum 3 characters").max(15,"Maximum 15 characters").required("Name is required"),
		last_name: yup.string().min(3, "Minimum 3 characters").max(15,"Maximum 15 characters"),
		email: yup.string().email("Invalid Email").required("Email is required")
	  });

	return (
		<Modal open={open} size="tiny" style={styles}>
			<Segment padded>
				<Grid>
					<Grid.Row>
						<Grid.Column width={14}>
							<Title floated="left" content="Join RYLY" size="large" />
						</Grid.Column>
						<Grid.Column verticalAlign="middle" width={2}>
							<span onClick={iconclick}>
								<Icon size="large" name="close" />
							</span>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<Divider hidden />
				<Modal.Content>
					<Form
						initialValues={{
							first_name: "",
			         last_name: "",
			         email:"",
							id: "smodal"
						}}
						onSubmit={(values) => submit(values)}
						validationSchema={validations}
					>
						<Form.Group widths="2">
							<Input
								name="first_name"
								inputProps={{
									placeholder: "First Name"
								}}
							/>
							<Input
								name="last_name"
								inputProps={{
									placeholder: "Last Name"
								}}
							/>
						</Form.Group>
						<Input
							name="email"
							inputProps={{
								placeholder: "Email"
							}}
						/>
						<Divider hidden />
						<Button.Submit fluid primary>
              Join
						</Button.Submit>
					</Form>
					<Segmant>
						<span style={{ cursor: "pointer" }} onClick={e => next(e)}>
							<InText
								id="smodal"
								content="Sign In"
								floated="right"
								color="blue"
							/>
						</span>
						<InText content="Already a Member ?" floated="right" />
					</Segmant>
					<Divider hidden />
					<Divider hidden />
					<InText
						textAlign="center"
						content="By joining you agree to RYLY's Terms of Use and Privacy Policy"
					/>
				</Modal.Content>
			</Segment>
		</Modal>
	);
};

// SignupModal.propTypes = {
// 	title : PropTypes.string,
// };
export default SignupModal;
