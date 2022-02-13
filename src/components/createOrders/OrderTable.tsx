import APIURL from "../../helpers/environment";
import React from "react";
import { Button, Table, Row } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Orders } from "./OrderIndex";

type Props = {
  fetch: () => void;
  orderArray: object[];
  token: string;
  editUpdateOrder: (order: Orders) => void;
  updateOn: () => void;
};

class OrderTable extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isSpecific: false,
      searchArr: [],
      value: [],
      orderProps: this.props.orderArray,
    };
  }

  //Delete Order
  deleteOrder = (order: Orders) => {
    console.log(order);
    // fetch(`http://localhost:5001/orders/delete/${order}`, {
    fetch(`${APIURL}/orders/delete/${order}`, {
      /*Heroku */ method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${this.props.token}`,
      }),
    }).then(() => this.props.fetch());
  };

  componentDidMount() {
    this.props.fetch();
  }

  orderMapper = () => {
    console.log("orderMapper");
    console.log(this.props.orderArray);

    return this.props.orderArray.map((order: any, index: number) => {
      index += 1;
      return (
        <Table bordered responsive striped>
          <thead>
            <tr key={index}>
              <th>Client ID</th>
              <th>Client Name</th>
              <th>Type of Order </th>
              <th>Quantity</th>
              <th>Due Date</th>
              <th>Price</th>
              <th>Notes</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{index}</td>
              <td>
                {order.client.firstName} {order.client.lastName}
              </td>

              <td>{order.typeOfOrder}</td>
              <td>{order.quantity}</td>
              <td>{order.dueDate}</td>
              <td>{order.price}</td>
              <td>{order.notes}</td>
              <td>{order.image}</td>

              <Button
                size="sm"
                onClick={() => {
                  this.props.editUpdateOrder(order);
                  this.props.updateOn();
                }}
              >
                Update
              </Button>

              <Button
                size="sm"
                onClick={() => {
                  this.deleteOrder(order);
                }}
              >
                Delete{" "}
              </Button>

              
              
            </tr>
          </tbody>
        </Table>
      );
    });
  };

  render() {
    console.log("table render");
    console.log(this.state.orderProps);
    return (
      <div>
        <Row>{this.orderMapper()}</Row>
      </div>
    );
  }
}

export default OrderTable;
