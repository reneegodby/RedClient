import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./Signup";
import Login from "./Login";

import { Container, Row, Col } from "reactstrap";

type Props = {
  updateToken: any;
};

type State = {
  hasError: boolean;
};

class Auth extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log(error, errorInfo);
  }

  render() {
    console.log("Auth render");
    if (this.state.hasError) {
      return <h1>Error</h1>;
    }
    return (
      <Container>
        <Row>
          <Col md="6">
            <Signup update={this.props.updateToken} />
          </Col>
          <Col md="6">
            <Login updateToken={this.props.updateToken} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Auth;
