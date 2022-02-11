import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Clients } from "./ClientIndex";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

type Props = {
  editClients: Clients;
  token: string;
  fetch: () => void;
  updateOff: () => void;
};

class ClientUpdate extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.state = {
      editFirstName: "",
      editLastName: "",
      editPhoneNumber: "",
      editAddress: "",
      editNotes: "",
    };
  }

  componentDidMount = () => {};

  updateClient = () => {
    fetch(`http://localhost:5001/clients/update/${this.props.editClients.id}`, {
      method: "PUT",
      body: JSON.stringify({
        clients: {
          firstName: this.state.editFirstName,
          lastName: this.state.editLastName,
          phoneNumber: this.state.editPhoneNumber,
          address: this.state.editAddress,
          notes: this.state.editNotes,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${this.props.token}`,
      }),
    }).then((res) => {
      this.props.fetch();
      this.props.updateOff();
    });
  };
  render() {
    return (
      <Modal isOpen={true}>
        <ModalHeader>Edit Client Information</ModalHeader>
        <ModalBody>
        <Form
          inline
          onSubmit={(e) => {
            e.preventDefault();
            this.updateClient();
          }}
        >
          <FormGroup>
            <Label htmlFor="firstName">First Name: </Label>
            <Input
              name="firstName"
              value={this.state.editFirstName}
              onChange={(e) => this.setState({ editFirstName: e.target.value })}
            >
              {" "}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="lastName">Last Name: </Label>
            <Input
              name="lastName"
              value={this.state.editLastName}
              onChange={(e) => this.setState({ editLastName: e.target.value })}
            >
              {" "}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="phoneNumber">Phone Number: </Label>
            <Input
              name="phoneNumber"
              value={this.state.editPhoneNumber}
              onChange={(e) => this.setState({ editPhoneNumber: e.target.value })}
            >
              {" "}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="address">Address: </Label>
            <Input
              name="address"
              value={this.state.editAddress}
              onChange={(e) => this.setState({ editAddress: e.target.value })}
            >
              {" "}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="notes">Notes: </Label>
            <Input
              name="notes"
              value={this.state.editNotes}
              onChange={(e) => this.setState({ editNotes: e.target.value })}
            >
              {" "}
            </Input>
          </FormGroup>
          <Button type="submit">Save</Button>
        </Form>
        </ModalBody>
      </Modal>
    );
  }
}

export default ClientUpdate;
