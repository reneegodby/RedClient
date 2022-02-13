import APIURL from "../../helpers/environment";
import React from "react";
import SiteBar from "../Auth/SiteBar";
import CreateOrder from "./CreateOrder";
import OrderTable from "./OrderTable";
import OrderUpdate from "./OrderUpdate";
import { Container, Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface Props {
  token: string;
  clickLogout: any;
  tokenUpdate: any;
}

export interface Orders {
  orderId: string;
  typeOfOrder: string;
  quantity: string;
  dueDate: string;
  price: string;
  notes: string;
  image: string;
}

class OrderIndex extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.state = {
      orders: [],
      error: false,
      updateActive: false,
      editOrders: {},
    };
  }
  //Get all orders
  fetchOrders = () => {
    console.log("fetch Orders", this.props.token);
    
    fetch(`${APIURL}/orders`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${this.props.token}`,
      }),
    })
    .then((res) => res.json())
    .then((orderData) => {
      this.setState({ orders: orderData });
      console.log(orderData);
      })
      .catch((error) =>
      this.setState({
        error: true,
      })
      );
    };

    editUpdateOrder = (order: Orders) => {
    this.setState({
      editOrders: order,
    });
    console.log(this.state.editOrders);
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
    this.fetchOrders();
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
    console.log("OrderIndex render");
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
              <CreateOrder token={this.props.token} fetch={this.fetchOrders} />
            </Col>
            <Col md="9">
              <OrderTable
                orderArray={this.state.orders}
                fetch={this.fetchOrders}
                token={this.props.token}
                editUpdateOrder={this.editUpdateOrder}
                updateOn={this.updateOn}
              />
            </Col>
            {this.state.updateActive ? (
              <OrderUpdate
                editOrders={this.state.editOrders}
                updateOff={this.updateOff}
                token={this.props.token}
                fetch={this.fetchOrders}
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

export default OrderIndex;
