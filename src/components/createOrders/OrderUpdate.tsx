import APIURL from "../../helpers/environment";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Orders } from "./OrderIndex";
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

type OrderProps = {
  editOrders: Orders;
  token: string;
  fetch: () => void;
  updateOff: () => void;
};

type OrderState = {
  editTypeOfOrder: string;
  editQuantity: string;
  editDueDate: string;
  editPrice: string;
  editNotes: string;
  editImage: string;
  _isMounted: boolean;
};

class OrderUpdate extends React.Component<OrderProps, OrderState> {
  constructor(props: OrderProps) {
    super(props);
    this.state = {
      editTypeOfOrder: this.props.editOrders.typeOfOrder,
      editQuantity: this.props.editOrders.quantity,
      editDueDate: this.props.editOrders.dueDate,
      editPrice: this.props.editOrders.price,
      editNotes: this.props.editOrders.notes,
      editImage: this.props.editOrders.image,
      _isMounted: false,
    };
  }

  componentDidMount() {
    this.setState({
      _isMounted: true,
    });
  }

  updateOrder = () => {
    fetch(`${APIURL}/orders/update/${this.props.editOrders.orderId}`, {
      method: "PUT",
      body: JSON.stringify({
        orders: {
          typeOfOrder: this.state.editTypeOfOrder,
          quantity: this.state.editQuantity,
          dueDate: this.state.editDueDate,
          price: this.state.editPrice,
          notes: this.state.editNotes,
          image: this.state.editImage,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${this.props.token}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.props.fetch();
        this.props.updateOff();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <Modal className="modals" isOpen={true}>
        <ModalHeader className="title">Edit Order Information</ModalHeader>
        <ModalBody className="modals">
          <Form
            inline
            onSubmit={(e) => {
              e.preventDefault();
              this.updateOrder();
            }}
          >
            <FormGroup>
              <Label htmlFor="typeOfOrder">Type of Order: </Label>
              <Input
                name="typeOfOrder"
                value={this.state.editTypeOfOrder}
                onChange={(e) =>
                  this.setState({ editTypeOfOrder: e.target.value })
                }
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="quantity">Quantity: </Label>
              <Input
                name="quantity"
                value={this.state.editQuantity}
                onChange={(e) =>
                  this.setState({ editQuantity: e.target.value })
                }
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="dueDate">Due Date: </Label>
              <Input
                name="dueDate"
                value={this.state.editDueDate}
                onChange={(e) => this.setState({ editDueDate: e.target.value })}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="price">Price: </Label>
              <Input
                name="price"
                value={this.state.editPrice}
                onChange={(e) => this.setState({ editPrice: e.target.value })}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="notes">Notes: </Label>
              <Input
                name="notes"
                value={this.state.editNotes}
                onChange={(e) => this.setState({ editNotes: e.target.value })}
              ></Input>
            </FormGroup>
            {/* <FormGroup>
              <Label htmlFor="image">Image: </Label>
              <Input
                name="image"
                value={this.state.editImage}
                onChange={(e) => this.setState({ editImage: e.target.value })}
              ></Input>
            </FormGroup> */}
            <Button className="mainBtns" type="submit">
              Save
            </Button>
            <Button
              className="mainBtns"
              type="reset"
              onClick={this.props.updateOff}
            >
              Close
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

export default OrderUpdate;
