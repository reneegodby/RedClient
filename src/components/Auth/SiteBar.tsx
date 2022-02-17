import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  Collapse,
} from "reactstrap";

interface Props {
  clickLogout: () => void;
  tokenUpdate: any;
}

// type SiteBarState {

// }

class SiteBar extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isOpen: false,
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log(error, errorInfo);
  }

  componentDidMount = () => {};

  render() {
    if (this.state.hasError) {
      return <h1>Error</h1>;
    }
    return (
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand>Baker Helper</NavbarBrand>

          <Collapse navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Button onClick={() => this.props.clickLogout()}>Logout</Button>
              </NavItem>
              <NavItem>
                <Button><Link to ='/clients'>Clients</Link></Button>
              </NavItem>
              <NavItem>
                <Button><Link to ='/orders'>Orders</Link></Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default SiteBar;
