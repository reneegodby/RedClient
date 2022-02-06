import React from "react";
import Signup from "./Signup";
import Login from "./Login";
import { Container, Row, Col } from "reactstrap";

type Props = {
  tokenUpdate: any;
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
            <Signup update={this.props.tokenUpdate} />
          </Col>
          <Col md="6">
            <Login update={this.props.tokenUpdate} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Auth;
