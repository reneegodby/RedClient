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

class ClientIndex extends React.Component<ClientIndexProps, any> {
  constructor(props: ClientIndexProps) {
    super(props);
    this.state = {
      clients: [],
      error: false,
      updateActive: false,
      editClients: {},
    };
  }

  //Get all clients
  fetchClients = () => {
    console.log("fetch Clients", this.props.token);

    fetch(`${APIURL}/clients`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${this.props.token}`,
      }),
    })
      .then((res) => res.json())
      .then((clientData) => {
        this.setState({ clients: clientData });
        console.log(clientData);
      })
      .catch((error) =>
        this.setState({
          error: true,
        })
      );
  };

  
  editUpdateClient = (client: Clients) => {
    this.setState({
      editClients: client,
    });
    console.log(this.state.editClients);
  };

    openModal = () =>{
    this.setState({
      updateModal: true,
    })
  }

  closeModal = () =>{
    this.setState({
      updateModal: false,
    })
  }

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
  }

  componentWillUnmount() {
    this.setState({
      _isMounted: false,
    });
  }
  render() {
    console.log("ClientIndex render");
    console.log(this.state);
    return (
      <div>
        <SiteBar
          clickLogout={this.props.clickLogout}
          tokenUpdate={this.props.tokenUpdate}
        />
        <Container>
          <Row>
          <Col md="3">
              <CreateOrder
                token={this.props.token}
              />
            </Col>
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
        </Container>
      </div>
    );
  }
}

export default ClientIndex;
