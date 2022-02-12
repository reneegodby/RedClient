import APIURL from "../../helpers/environment";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Label,
  Form,
  FormGroup,
  Input,
  Button,
  FormFeedback,
  FormText,
  List,
} from "reactstrap";

type Props = {
  update: any;
};

class Signup extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      role: "user",
      message: "",
    };
  }
  componentDidMount = () => {};

  handleSubmit = () => {
    let errorCode: number | string;
    console.log(this.state.email, this.state.password);
    // fetch(`http://localhost:5001/auth/signup`, {     Local
      fetch(`${APIURL}auth/signup`, {       /*Heroku */
      method: "POST",
      body: JSON.stringify({
        user: {
          email: this.state.email,
          password: this.state.password,
          role: this.state.role,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        console.log(`fetch successful ${response}`);

        errorCode = response.status;
        console.log(errorCode);

        if (errorCode === 409) {
          this.setState({ message: "Email already in use" });
          console.log(this.state.message);
        } else if (errorCode === 500) {
          this.setState({ message: "User failed to register" });
          console.log(this.state.message);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.props.update(data.sessionToken);
        console.log(data.sessionToken);
      });
  };
  validPassword = () => {
    console.log("valid password");
    return (
      this.state.password.length > 8 &&
      this.state.password.match(/[A-Z]/) !== null &&
      this.state.password.match(/[a-z]/) !== null &&
      this.state.password.match(/[0-9]/) !== null
    );
  };

  render() {
    return (
      <div>
        <h3 >Signup</h3>
        <Form
          inline
          onSubmit={(e) => {
            e.preventDefault();
            this.handleSubmit();
          }}
        >
          <FormGroup floating>
            <Input
              type="email"
              placeholder="Email"
              onChange={(e) => this.setState({ email: e.target.value })}
              value={this.state.email}
              name="email"
            />
            <Label for="exampleEmail">Email</Label>
          </FormGroup>{" "}
          <FormGroup floating>
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => this.setState({ password: e.target.value })}
              value={this.state.password}
              name="password"
            />
            <Label for="examplePassword">Password</Label>
          </FormGroup>{" "}
          <FormGroup floating>
            <FormText>
              <List className="password-list">
                <li>Password Requirements:</li>
                <li>At least 8 characters</li>
                <li>A mixture of both uppercase and lowercase letters.</li>
                <li>A mixture of letters and numbers.</li>
              </List>
            </FormText>{" "}
            <FormFeedback>
              {this.state.message !== "" ? <p>{this.state.message}</p> : ""}
            </FormFeedback>
          </FormGroup>{" "}
          <Button type="submit" disabled={!this.validPassword()}>
            Sign Up
          </Button>{" "}
          <FormFeedback>
            {this.state.message !== "" ? (
              <p className="message">{this.state.message}</p>
            ) : (
              ""
            )}
          </FormFeedback>
        </Form>
      </div>
    );
  }
}

export default Signup;
