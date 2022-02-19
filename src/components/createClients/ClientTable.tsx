import APIURL from "../../helpers/environment";
import React from "react";
import { Button, Row } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Clients } from "./ClientIndex";
import { ClientIndexProps } from "../createClients/ClientIndex";

type ClientTableProps = {
  fetch: () => void;
  clientArray: object[];
  token: string;
  editUpdateClient: (client: Clients) => void;
  updateOn: () => void;
  createOrder: ClientIndexProps["createOrder"];
  setCreateOrder: ClientIndexProps["setCreateOrder"];
  openModal: () => void;
};

type ClientTableState = {
  isSpecific: boolean;
  searchArr: [];
  value: [];
  clientProps: {};
  _isMounted: boolean;
};

class ClientTable extends React.Component<ClientTableProps, ClientTableState> {
  constructor(props: ClientTableProps) {
    super(props);
    this.state = {
      isSpecific: false,
      searchArr: [],
      value: [],
      clientProps: this.props.clientArray,
      _isMounted: false,
    };
  }

  //Delete Client
  deleteClient = (client: Clients) => {
    // console.log(client);
    fetch(`${APIURL}/clients/delete/${client.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${this.props.token}`,
      }),
    })
      .then(() => this.props.fetch())
      .catch((err) => {
        // console.log(err);
      });
  };

  componentDidMount() {
    this.props.fetch();
    this.setState({
      _isMounted: true,
    });
  }

  componentWillUnmount() {
    this.setState({
      _isMounted: false,
    });
  }

  clientMapper = () => {
    // console.log("clientMapper");
    // console.log(this.props.clientArray);

    return this.props.clientArray.map((client: any, index: number) => {
      return (
        <table className="table2">
          <thead>
            <tr key={index}>
              <th>Client Name</th>

              <th>Phone Number</th>
              <th>Address</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {client.firstName} <br />
                {client.lastName}
              </td>
              <td>{client.phoneNumber}</td>
              <td>{client.address}</td>
              <td>{client.notes}</td>
              <td>
                <Button
                  className="actionBtns"
                  size="sm"
                  onClick={() => {
                    this.props.editUpdateClient(client);
                    this.props.updateOn();
                  }}
                >
                  Update
                </Button>

                <Button
                  className="actionBtns"
                  size="sm"
                  onClick={() => {
                    this.deleteClient(client);
                  }}
                >
                  Delete{" "}
                </Button>

                <Button
                  className="actionBtns"
                  size="sm"
                  onClick={() => {
                    this.props.editUpdateClient(client);
                    this.props.openModal();
                    // console.log(client.id);
                  }}
                >
                  Create Order
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      );
    });
  };

  render() {
    // console.log("table render");
    // console.log(this.state.clientProps);
    return (
      <div>
        <h3 className="title">My Clients</h3>
        <Row>{this.clientMapper()}</Row>
      </div>
    );
  }
}

export default ClientTable;
