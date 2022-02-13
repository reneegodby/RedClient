import APIURL from "../../helpers/environment";
import React from "react";
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
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate } from "react-router-dom";

type Props = {
  token: string;
};

export interface CreateOrdersState {
  typeOfOrder: string;
  quantity: string;
  dueDate: string;
  price: string;
  notes: string;
  image: string;
  createOrder: string;
  setCreateOrder: () => void;
}
class CreateOrder extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.state = {
      typeOfOrder: "",
      quantity: "",
      dueDate: "",
      price: "",
      notes: "",
      image: "",
      // createOrder: "",
      // setCreateOrder: (createOrder: string),
    };
    console.log(this.props.token);
  }

  //newOrder is changing the state of orderPg
  newOrder = () => {
    this.setState({
      orderPg: !this.state.orderPg,
    });
  }; //when true: it will navigate to order pg

  handleSubmit = () => {
    console.log(
      this.state.typeOfOrder,
      this.state.quantity,
      this.state.dueDate,
      this.state.price,
      this.state.notes,
      this.state.image
    );

    fetch(`${APIURL}/orders/order`, {
      method: "POST",
      body: JSON.stringify({
        orders: {
          typeOfOrder: this.state.typeOfOrder,
          quantity: this.state.quantity,
          dueDate: this.state.dueDate,
          price: this.state.price,
          notes: this.state.notes,
          image: this.state.image,
        },
      }),

      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${this.props.token}`,
      }),
    })
      .then((res) => {
        res.json();
        console.log(res);
      })
      .then((orderData) => {
        console.log(orderData);
        this.setState({
          typeOfOrder: "",
          quantity: "",
          dueDate: "",
          price: "",
          notes: "",
          image: "",
        });
        this.newOrder(); //will create new order
      });
  };

  componentDidMount() {
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
    return (
      <Modal isOpen={true}>
        <ModalHeader>Create Order</ModalHeader>
        <ModalBody>
          <Form
            inline
            onSubmit={(e) => {
              e.preventDefault();
              // this.createOrder();
            }}
          >
            <FormGroup>
              <Label htmlFor="typeOfOrder">Type of Order: </Label>
              <Input
                name="typeOfOrder"
                value={this.state.typeOfOrder}
                onChange={(e) => this.setState({ typeOfOrder: e.target.value })}
              >
                {" "}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="quantity">Quantity: </Label>
              <Input
                name="quantity"
                value={this.state.quantity}
                onChange={(e) => this.setState({ quantity: e.target.value })}
              >
                {" "}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="dueDate">Due Date: </Label>
              <Input
                name="dueDate"
                value={this.state.dueDate}
                onChange={(e) => this.setState({ dueDate: e.target.value })}
              >
                {" "}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="price">Price: </Label>
              <Input
                name="price"
                value={this.state.price}
                onChange={(e) => this.setState({ price: e.target.value })}
              >
                {" "}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="notes">Notes: </Label>
              <Input
                name="notes"
                value={this.state.notes}
                onChange={(e) => this.setState({ notes: e.target.value })}
              >
                {" "}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="image">Image: </Label>
              <Input
                name="image"
                value={this.state.image}
                onChange={(e) => this.setState({ image: e.target.value })}
              >
                {" "}
              </Input>
            </FormGroup>
            <Button type="submit">Save</Button>
          </Form>
        </ModalBody>
        {this.state.orderPg && <Navigate to="/orders" replace={true} />}
        {/* Navigate to order pg if order created successfully */}
      </Modal>
    );
  }
}

export default CreateOrder;
