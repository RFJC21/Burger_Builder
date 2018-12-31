import React, { Component } from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

//i need to get some ingredients as props
//we have a problem: this is an object, not an array
//we could do it hardcoding, just acessing the props, but we are going
//to do it in a dynamic way
//object.key is used to transform the object into an array
//{{}}: outside is for duynamica content; the inner is a javascript object
// Object.keys(props.ingredients we are acessing the ingredoents props
class OrderSummary extends Component {
  //this  could be a funtional component, doesn need to be a class
  //one
  componentWillUpdate() {
    console.log("[OrderSummary] WillUpdate");
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
          {this.props.ingredients[igKey]}
        </li>
      );
    });

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          Total Price: <strong>{this.props.price.toFixed(2)} $</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelHandler}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinueHandler}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}
export default OrderSummary;
