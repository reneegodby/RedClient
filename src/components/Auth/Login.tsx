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
  update: any;
  sessionToken: string;
};
class Login extends React.Component<Props, any> {
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

  componentWillUnmount() {
    this.setState({
      _isMounted: false,
    });
  }

  handleSubmit = () => {
    let errorCode: number | string;
    console.log("login handle");
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
        <h3>Login</h3>
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
          </FormGroup>
          <FormGroup floating>
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => this.setState({ password: e.target.value })}
              value={this.state.password}
              name="password"
            />
            <Label for="examplePassword">Password</Label>
            <FormFeedback>
              {this.state.message !== "" ? <p>{this.state.message}</p> : ""}
            </FormFeedback>
          </FormGroup>
          <Button type="submit">Login</Button>
        </Form>
        {this.state.responseCode === 200 && this.props.sessionToken.length > 0 ? 
          <Navigate to="/clients" replace={true} /> : 
          <></>  }
      </div>
    );
  }
}

export default Login;
