import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./Signup";
import Login from "./Login";
import { Container, Row, Col } from "reactstrap";
import Logo from "../../assets/Brieandlily_tealcircle (1).png";

type Props = {
  updateToken: (newToken: string) => void;
  sessionToken: string;
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
      <div className="background">
        <Container className="auth-container">
          <div className="mainRow">
            <Row>
              <Col>
                <Signup update={this.props.updateToken} />
              </Col>
              <Col className="logo">
                {" "}
                <img src={Logo} alt="logo" />
              </Col>
              <Col>
                <Login
                  update={this.props.updateToken}
                  sessionToken={this.props.sessionToken}
                />
              </Col>
            </Row>
          </div>
        </Container>

        <Container className="auth-container">
          <div className="welcomeBox">
          {/* <p> Welcome to B&L Sweet Treats</p>
          <p className="welcomeP">A handy order tracker for home business bakers</p> */}
          </div>
        </Container>
      </div>
    );
  }
}

export default Auth;
