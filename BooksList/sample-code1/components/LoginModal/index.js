import React from "react";
import { Modal, Divider, Segment, Grid, Icon } from "semantic-ui-react";
import { Title, InText } from "../../components";
import { styles } from "./element";
import * as yup from "yup";
import Router from "next/router";
import { Button, Form, Input } from "formik-semantic-ui";

const LoginModal = ({ open, submit, next, iconclick }) => {
	const validations = yup.object().shape({
		email: yup
			.string()
			.email("Invalid Email")
			.required("Email is required"),
		password: yup.string().required("Password is Required")
	});
	return (
		<Modal open={open} size="tiny" style={styles}>
			<Segment padded>
				<Grid>
					<Grid.Row>
						<Grid.Column width={13}>
							<Title floated="left" content="Sign In" size="large" />
						</Grid.Column>
						<Grid.Column verticalAlign="middle" width={3}>
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
							email: "",
							password: "",
							id: "lmodal"
						}}
						onSubmit={(values, formikApi) => submit(values, formikApi)}
						validationSchema={validations}
					>
						<Input
							name="email"
							inputProps={{
								placeholder: "Email"
							}}
						/>
						<Input
							name="password"
							inputProps={{
								type: "password",
								placeholder: "Password"
							}}
						/>
						<InText content="Forgot Password" floated="left" color="blue" />
						<Divider hidden />
						<Button.Submit fluid primary>
              Sign In
						</Button.Submit>
					</Form>
					<Divider hidden />
					<span style={{ cursor: "pointer" }} onClick={e => next?next(e):Router.push("/signup")}>
						<Title
							id="lmodal"
							content="Back"
							icon="long arrow alternate left"
						/>
					</span>
					<Divider hidden />
					<InText content="By joining you agree to RYLY's Terms of Use and Privacy Policy" />
				</Modal.Content>
			</Segment>
		</Modal>
	);
};

export default LoginModal;
