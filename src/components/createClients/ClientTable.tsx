import APIURL from "../../helpers/environment";
import React from "react";
import { Button, Table, Row } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Clients } from "./ClientIndex";
import {Orders} from "../createOrders/OrderIndex";
import {ClientIndexProps} from "../createClients/ClientIndex"
import CreateOrder from "../createOrders/CreateOrder";
// import { Navigate } from "react-router-dom";

type Props = {
  fetch: () => void;
  clientArray: object[];
  token: string;
  editUpdateClient: (client: Clients) => void;
  updateOn: () => void;
  createOrder: ClientIndexProps['createOrder'];
  setCreateOrder: ClientIndexProps['setCreateOrder'];
};

class ClientTable extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isSpecific: false,
      searchArr: [],
      value: [],
      clientProps: this.props.clientArray,
    };
  }

  //Delete Client
  deleteClient = (client: Clients) => {
    console.log(client);
    fetch(`${APIURL}/clients/delete/${client.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${this.props.token}`,
      }),
    }).then(() => this.props.fetch());
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
    console.log("clientMapper");
    console.log(this.props.clientArray);

    return this.props.clientArray.map((client: any, index: number) => {
      return (
        <Table bordered responsive striped>
          <thead>
            <tr key={index}>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{client.firstName}</td>
              <td>{client.lastName}</td>
              <td>{client.phoneNumber}</td>
              <td>{client.address}</td>
              <td>{client.notes}</td>

              <Button
                size="sm"
                onClick={() => {
                  this.props.editUpdateClient(client);
                  this.props.updateOn();
                }}
              >
                Update
              </Button>

              <Button
                size="sm"
                onClick={() => {
                  this.deleteClient(client);
                }}
              >
                Delete{" "}
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  this.props.setCreateOrder(client.id);
                  console.log(client.id);
                }}
              >
                Create Order
              </Button>
            </tr>
          </tbody>
        </Table>
      );
    });
  };

  render() {
    console.log("table render");
    console.log(this.state.clientProps);
    return (
      <div>
        <Row>{this.clientMapper()}</Row>
        {/* <Navigate to='[route endpoint]' replace={true} /> */}
        {/* <a href="http://locahost:3000"></a> */}
      </div>
    );
  }
}

export default ClientTable;
