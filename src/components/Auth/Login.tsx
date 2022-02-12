import APIURL from "../../helpers/environment";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormGroup, Input, Button, Label } from "reactstrap";

type Props = {
  updateToken: any;
};

type State = {
  role: string;
  email: string;
  password: string;
  sessionToken: any;
};

class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      role: "user",
      email: "",
      password: "",
      sessionToken: "",
    };
  }

  handleSubmit = () => {
    console.log("login handle");
    console.log(this.state.email, this.state.password);
    // fetch("http://localhost:5001/auth/login", {
      fetch(`${APIURL}auth/login`, {       /*Heroku */
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
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(this.props.updateToken);
        this.props.updateToken(data.sessionToken);
      })
      .catch((e) => console.log(e));
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
          </FormGroup>
          <Button type="submit">Login</Button>
        </Form>
      </div>
    );
  }
}

export default Login;
