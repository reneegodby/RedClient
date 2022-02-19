import APIURL from "../../helpers/environment";
import React from "react";
import SiteBar from "../Auth/SiteBar";
import CreateClient from "./CreateClient";
import ClientTable from "./ClientTable";
import ClientUpdate from "./ClientUpdate";
import { Container, Row, Col } from "reactstrap";
import CreateOrder from "../createOrders/CreateOrder";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppProps } from "../../../src/App";
import { Orders } from "../createOrders/OrderIndex";
export interface ClientIndexProps {
  token: string;
  clickLogout: () => void;
  tokenUpdate: (newToken: string) => void;
  clientId: string;
  setClientId: (clientId: string) => void;
  createOrder: AppProps["createOrder"];
  setCreateOrder: AppProps["setCreateOrder"];
}
export interface Clients {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  notes: string;
}

export interface ClientIndexState {
  clients: [];
  error: boolean;
  updateActive: boolean;
  editClients: {};
  updateModal: boolean;
}

class ClientIndex extends React.Component<ClientIndexProps, any> {
  constructor(props: ClientIndexProps) {
    super(props);
    this.state = {
      clients: [],
      error: false,
      updateActive: false,
      editClients: {},
      updateModal: false,
    };
  }

  //Get all clients
  fetchClients = () => {
    console.log("fetch Clients", this.props.token);

    fetch(`${APIURL}/clients`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      }),
    })
      .then((res) => res.json())
      .then((clientData) => {
        this.setState({ clients: clientData });
        // console.log(clientData);
      })
      .catch((error) =>
        this.setState({
          error: true,
        })
      );
  };

  createNewOrder = (order: Orders) => {
    this.setState({
      newOrder: order,
    });
    // console.log(this.state.newOrder);
  };

  editUpdateClient = (client: Clients) => {
    this.setState({
      editClients: client,
    });
    // console.log(this.state.editClients);
  };

  openModal = () => {
    this.setState({
      updateModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      updateModal: false,
    });
  };

  updateOn = () => {
    this.setState({
      updateActive: true,
    });
  };

  updateOff = () => {
    this.setState({
      updateActive: false,
    });
  };

  componentDidMount() {
    this.fetchClients();
    this.setState({
      _isMounted: true,
    });
    // console.log(this.props.token);
  }

  componentWillUnmount() {
    this.setState({
      _isMounted: false,
    });
  }
  render() {
    // console.log("ClientIndex render");
    // console.log(this.state);
    return (
      <div className="backgroundClients">
        <SiteBar
          clickLogout={this.props.clickLogout}
          tokenUpdate={this.props.tokenUpdate}
        />
        <Col md="3">
          <CreateOrder
            token={this.props.token}
            editClients={this.state.editClients}
            closeModal={this.closeModal}
            openModal={this.openModal}
            updateModal={this.state.updateModal}
          />
        </Col>
        <Container>
          <div>
            <Row>
              <Col md="3">
                <CreateClient
                  token={this.props.token}
                  fetch={this.fetchClients}
                />
              </Col>
              <Col md="9">
                <ClientTable
                  clientArray={this.state.clients}
                  fetch={this.fetchClients}
                  token={this.props.token}
                  editUpdateClient={this.editUpdateClient}
                  updateOn={this.updateOn}
                  createOrder={this.props.createOrder}
                  setCreateOrder={this.props.setCreateOrder}
                  openModal={this.openModal}
                />
              </Col>
              {this.state.updateActive ? (
                <ClientUpdate
                  editClients={this.state.editClients}
                  updateOff={this.updateOff}
                  token={this.props.token}
                  fetch={this.fetchClients}
                />
              ) : (
                <></>
              )}
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}

export default ClientIndex;
