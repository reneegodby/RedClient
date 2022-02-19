import APIURL from "../../helpers/environment";
import React from "react";
import { Button, Row } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Orders } from "./OrderIndex";

type OrderTableProps = {
  fetchOrders: () => void;
  orders: object[];
  token: string;
  editUpdateOrder: (order: Orders) => void;
  updateOn: () => void;
};

type OrderTableState = {
  isSpecific: boolean;
  searchArr: [];
  value: [];
  orderProps: {};
  _isMounted: boolean;
};

class OrderTable extends React.Component<OrderTableProps, OrderTableState> {
  constructor(props: OrderTableProps) {
    super(props);
    this.state = {
      isSpecific: false,
      searchArr: [],
      value: [],
      orderProps: this.props.orders,
      _isMounted: false,
    };
  }

  //Delete Order
  deleteOrder = (order: Orders) => {
    // console.log(order);

    fetch(`${APIURL}/orders/delete/${order.orderId}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${this.props.token}`,
      }),
    })
      .then(() => this.props.fetchOrders())
      .catch((err) => {
        // console.log(err);
      });
  };

  componentDidMount() {
    this.props.fetchOrders();
    this.setState({
      _isMounted: true,
    });
  }

  orderMapper = () => {
    // console.log("orderMapper");
    // console.log(this.props.orders);

    return this.props.orders?.map((order: any, index: number) => {
      return (
        <div>
          <table className="table">
            <thead>
              <tr key={index}>
                {/* <th>Client ID</th> */}
                <th>Client Name</th>
                <th>Type of Order </th>
                <th>Quantity</th>
                <th>Due Date</th>
                <th>Price</th>
                <th>Notes</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* <td>{index}</td> */}
                <td>
                  {order.client.firstName} {order.client.lastName}
                </td>
                <td>{order.typeOfOrder}</td>
                <td>{order.quantity}</td>
                <td>{order.dueDate}</td>
                <td>{order.price}</td>
                <td>{order.notes}</td>
                <td>{order.image}</td>
                <td>
                  <Button
                    className="actionBtns"
                    size="sm"
                    onClick={() => {
                      this.props.editUpdateOrder(order);
                      this.props.updateOn();
                    }}
                  >
                    Update
                  </Button>

                  <Button
                    className="actionBtns"
                    size="sm"
                    onClick={() => {
                      this.deleteOrder(order);
                    }}
                  >
                    Delete{" "}
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    });
  };

  render() {
    // console.log("table render");
    // console.log(this.state.orderProps);
    return (
      <div>
        <Row>{this.orderMapper()}</Row>
      </div>
    );
  }
}

export default OrderTable;
