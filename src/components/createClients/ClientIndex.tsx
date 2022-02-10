import React from "react";
import SiteBar from "../Auth/SiteBar";
import CreateClient from "./CreateClient";
import ClientTable from "./ClientTable";
import { Container, Row, Col } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

interface Props {
  token: string;
  clickLogout: any;
  tokenUpdate: any;
}

export interface Clients {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  notes: string;
}

class ClientIndex extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.state = {
      clients: [],
      error: false,
      // updateActive: false,
      // postToUpdate: {}
    };
  }

  componentDidMount() {
    this.fetchClients();
  }
  //Get all clients
  fetchClients = () => {
    console.log("fetch Clients", this.props.token);
    fetch(`http://localhost:5001/clients`, {
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

  //   updateClient = (client: Clients) => {
  //     this.setState({
  //         updateClient: client,
  //     })
  //     console.log(this.state.updateClient);
  // }

  // updateOn = () => {
  //     this.setState({
  //         updateActive: true
  //     })
  // }

  // updateOff = () => {
  //     this.setState({
  //         updateActive: false
  //     })
  // }

  // setClient = (searchItem: string) => {
  //     let filtered = this.state.clients.filter((i:Clients) => i.firstName.includes(searchItem))
  //     this.setState({clients: filtered})
  // }
  render() {
    console.log("ClientIndex render");
    console.log(this.state)
    return (
      <div>
        <SiteBar
          clickLogout={this.props.clickLogout}
          tokenUpdate={this.props.tokenUpdate}
        />
        <Container>
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
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ClientIndex;
