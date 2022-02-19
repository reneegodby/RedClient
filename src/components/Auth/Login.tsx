import APIURL from "../../helpers/environment";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Form,
  FormGroup,
  Input,
  Button,
  Label,
  FormFeedback,
} from "reactstrap";
import { Navigate } from "react-router-dom";

type Props = {
  update: (newToken: string) => void;
  sessionToken: string;
};

type State = {
  role: string;
  email: string;
  password: string;
  message: string;
  responseCode: number;
  _isMounted: boolean;
};
class Login extends React.Component<Props, State> {
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

  // componentDidUnmount() {
  //   this.setState({
  //     _isMounted: false,
  //   });
  // }

  handleSubmit = () => {
    let errorCode: number | string;
    // console.log("login handle");
    console.log(this.state.email, this.state.password);

    fetch(`${APIURL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        user: {
          role: this.state.role,
          email: this.state.email,
          password: this.state.password,
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
          this.setState({ message: "Something is wrong" });
          console.log(this.state.message);
        } else if (errorCode === 500) {
          this.setState({ message: "User failed to login" });
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

  render() {
    console.log("login render");
    return (
      <div>
        <h3 className="title">Login</h3>
        <Form
          className="centerForm"
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
          <FormFeedback>
            {this.state.message !== "" ? <p>{this.state.message}</p> : ""}
          </FormFeedback>
          <Button className="mainBtns" type="submit">
            Login
          </Button>
        </Form>
      </div>
    );
  }
}

export default Login;
