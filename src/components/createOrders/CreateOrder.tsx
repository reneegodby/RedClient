import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";

type Props = {
  token: string;
  fetch: () => void;
};

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
    };
    console.log(this.props.token);
  }

  handleSubmit = () => {
    console.log(
      this.state.typeOfOrder,
      this.state.quantity,
      this.state.dueDate,
      this.state.price,
      this.state.notes,
      this.state.image
    );
    fetch("http://localhost:5001/orders/order/cd6c2097-5dc0-4998-92be-c31ecb4f795c", {
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
        this.props.fetch();
      });
  };

  render() {
    return (
      <div>
        <h2>Order Information</h2>
        <Form
          inline
          onSubmit={(e) => {
            e.preventDefault();
            this.handleSubmit();
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
      </div>
    );
  }
}

export default CreateOrder;
