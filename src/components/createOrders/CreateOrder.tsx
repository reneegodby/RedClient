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
import { Clients } from "../createClients/ClientIndex";
import { Navigate } from "react-router-dom";

type Props = {
  token: string;
  editClients: Clients;
  closeModal: () => void;
  openModal: () => void;
  updateModal: boolean;
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
      orderPg: false,
    };
    console.log(this.props.token);
  }

  //newOrder is changing the state of orderPg
  newOrder = () => {
    this.setState({
      orderPg: !this.state.orderPg,
    });
  }; //when true: it will navigate to order pg

  createOrder = () => {
    fetch(`${APIURL}/orders/order/${this.props.editClients.id}`, {
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
        this.props.closeModal();

        this.newOrder(); //sets state to navigate to orders
      })
      .catch((err) => {
        console.log(err);
      });
  };

  close = () => {
    this.props.closeModal();
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
      <Modal className="modals" isOpen={this.props.updateModal}>
        <ModalHeader className="title">Create Order</ModalHeader>
        <ModalBody className="modals">
          <Form
            inline
            onSubmit={(e) => {
              e.preventDefault();
              this.createOrder();
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
            {/* <FormGroup>
              <Label htmlFor="image">Image: </Label>
              <Input
                name="image"
                value={this.state.image}
                onChange={(e) => this.setState({ image: e.target.value })}
              >
                {" "}
              </Input>
            </FormGroup> */}
            <Button className="mainBtns" type="submit">Save</Button>
          </Form>
          <Button className="mainBtns" type="reset" onClick={this.close}>
            Close
          </Button>
        </ModalBody>
        {this.state.orderPg && <Navigate to="/orders" replace={true} />}
        {/* Navigate to order pg if order created successfully */}
      </Modal>
    );
  }
}

export default CreateOrder;
