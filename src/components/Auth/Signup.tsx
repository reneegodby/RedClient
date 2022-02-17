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
import { Navigate } from "react-router-dom";

type Props = {
  update: (newToken: string) => void;
};

class Signup extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.state = {
      role: "user",
      email: "",
      password: "",
      message: "",
      responseCode: 0,
      _isMounted: false,
    };
  }
  componentDidMount = () => {
    this.setState({
      _isMounted: true,
    });
  };

  handleSubmit = () => {
    let errorCode: number | string;
    console.log(this.state.email, this.state.password);

    fetch(`${APIURL}/auth/signup`, {
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
        Accept: "application/json",
      }),
    })
      .then((res) => {
        console.log(`fetch successful ${res}`);
        this.setState({ responseCode: res.status });
        errorCode = res.status;
        console.log(errorCode);

        if (errorCode === 409) {
          this.setState({ message: "Email already in use" });
          console.log(this.state.message);
        } else if (errorCode === 500) {
          this.setState({ message: "User failed to register" });
          console.log(this.state.message);
        }
        return res.json();
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
        <h3 className="title">New Account</h3>
        <Form
          inline
          onSubmit={(e) => {
            e.preventDefault();
            this.handleSubmit();
          }}
        >
          <FormGroup>
            <Input
            bsSize="sm"
            className="mb-3"
              type="email"
              placeholder="Email"
              onChange={(e) => this.setState({ email: e.target.value })}
              value={this.state.email}
            />
          </FormGroup>
          <FormGroup>
            <Input
            bsSize="sm"
            className="mb-3"
              type="password"
              placeholder="Password"
              onChange={(e) => this.setState({ password: e.target.value })}
              value={this.state.password}
              name="password"
            />
          </FormGroup>
          <FormGroup>
            <FormText>
              <Button
                className="mainBtns"
                type="submit"
                disabled={!this.validPassword()}
              >
                Sign Up
              </Button>
              <List type="unstyled" className="passwordReq">
                <li>Password Requirements:</li>
                <li>At least 8 characters</li>
                <li>A mixture of both uppercase and lowercase letters.</li>
                <li>A mixture of letters and numbers.</li>
              </List>
            </FormText>
            <FormFeedback>
              {this.state.message !== "" ? <p>{this.state.message}</p> : ""}
            </FormFeedback>
          </FormGroup>
          <FormFeedback>
            {this.state.message !== "" ? (
              <p className="message">{this.state.message}</p>
            ) : (
              ""
            )}
          </FormFeedback>
        </Form>
        {this.state.responseCode === 201 && (
          <Navigate to="/clients" replace={true} />
        )}
      </div>
    );
  }
}

export default Signup;
