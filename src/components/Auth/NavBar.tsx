import React from "react";

import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  NavbarToggler,
  Collapse,
} from "reactstrap";

interface Props {
  clickLogout: any;
  tokenUpdate: any;
}

class NavBar extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.toggle = this.toggle.bind(this);
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

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  componentDidMount = () => {};

  render() {
    if (this.state.hasError) {
      return <h1>Error</h1>;
    }
    return (
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand>Baker Helper</NavbarBrand>
          <NavbarToggler size="sm" />
          <Collapse navbar>
            <Nav className="ms-auto" navbar>
              <NavItem>
                <Button onClick={this.props.clickLogout}>Logout</Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
