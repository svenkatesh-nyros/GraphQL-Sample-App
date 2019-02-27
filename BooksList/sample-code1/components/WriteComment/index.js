import React from "react";
import { Comment, Form, Label, Icon } from "semantic-ui-react";
import { ButtonItem } from "../../components";
const Wcomment = ({ visibility, changeval, submit,value,form, ...props }) => {
	return (
		<div>
			{visibility ? (
				<Comment.Group>
					<Comment>
						<Comment.Avatar src="/static/images/avatar.png" />
						<Comment.Content>
							<Form name={form} onSubmit={submit} reply>
								<Form.TextArea
									{...props}
									onChange={e => changeval(e)}
									style={{ clear: "none" }}
									value={value}
								/>
								<Label attached="bottom">
									<ButtonItem content="Comment" color="green" floated="right" />
								</Label>
							</Form>
						</Comment.Content>
					</Comment>
				</Comment.Group>
			) : null}
		</div>
	);
};

export default Wcomment;
