import APIURL from "../../helpers/environment";
import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Navigate } from "react-router-dom";

type Props = {
  token: string;
  fetch: () => void;
};

type State = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  notes: string;
  _isMounted: boolean;
};

class CreateClient extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      notes: "",
      _isMounted: false,
    };
    // console.log(this.props.token);
  }

  handleSubmit = () => {
    // console.log(
    //   this.state.firstName,
    //   this.state.lastName,
    //   this.state.phoneNumber,
    //   this.state.address,
    //   this.state.notes
    // );

    fetch(`${APIURL}/clients/client`, {
      method: "POST",
      body: JSON.stringify({
        clients: {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          phoneNumber: this.state.phoneNumber,
          address: this.state.address,
          notes: this.state.notes,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${this.props.token}`,
      }),
    })
      .then((res) => {
        res.json();
        // console.log(res);
      })
      .then((clientData) => {
        // console.log(clientData);
        this.setState({
          firstName: "",
          lastName: "",
          phoneNumber: "",
          address: "",
          notes: "",
        });
        this.props.fetch();
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  componentDidMount() {
    this.setState({
      _isMounted: true,
    });
  }

  componentWillUnmount() {
    this.setState({
      _isMounted: false,
    });
  }

  render() {
    return (
      <div className="newClient">
        <h2 className="title">Create New Client</h2>
        <Form
          className="clientForm"
          inline
          onSubmit={(e) => {
            e.preventDefault();
            this.handleSubmit();
          }}
        >
          <FormGroup>
            <Label htmlFor="firstName">First Name: </Label>
            <Input
              bsSize="sm"
              className="mb-3"
              name="firstName"
              value={this.state.firstName}
              onChange={(e) => this.setState({ firstName: e.target.value })}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="lastName">Last Name: </Label>
            <Input
              bsSize="sm"
              className="mb-3"
              name="lastName"
              value={this.state.lastName}
              onChange={(e) => this.setState({ lastName: e.target.value })}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="phoneNumber">Phone Number: </Label>
            <Input
              bsSize="sm"
              className="mb-3"
              name="phoneNumber"
              value={this.state.phoneNumber}
              onChange={(e) => this.setState({ phoneNumber: e.target.value })}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="address">Address: </Label>
            <Input
              bsSize="sm"
              className="mb-3"
              name="address"
              value={this.state.address}
              onChange={(e) => this.setState({ address: e.target.value })}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="notes">Notes: </Label>
            <Input
              bsSize="sm"
              className="mb-3"
              name="notes"
              value={this.state.notes}
              onChange={(e) => this.setState({ notes: e.target.value })}
            ></Input>
          </FormGroup>
          <Button className="mainBtns" type="submit">
            Save
          </Button>
        </Form>
      </div>
    );
  }
}

export default CreateClient;
