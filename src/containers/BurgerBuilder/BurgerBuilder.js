import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
//import buildControls from "../../components/Burger/BuildControls/BuildControls";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
//import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";

//constant with the total price: because it is a global
//variable, write with CAPS!
//outside the Class
const INGREDIENT_PRICES = {
  salad: 0.4,
  cheese: 0.5,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  // uma maneira, nao a mais moderna

  // constructor(props){
  //   super(props);
  //   this.state={...}

  // }

  //definir o state
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    //estado do botao check out
    purchasable: false,
    purchasing: false,
    loading: false
  };

  //new method:
  //cria copia dos ingredients in the state
  //const sum=Object.keys(ingredients) is an array of string entries
  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  //method handler to add ingredient, it needs to know the type
  //first we need to know the old count
  // ...this.state is a ES6 spread operator, that distributes
  // the properties of the old state into the nerw object we
  //are creating here
  //to add value to the basket, we need to have a mapping
  //of which ingredients costs what
  //IMPORTANTE:
  //in the end we need to hook the addIngredientHandler to
  //the more button in our buildcontrols.js,and buildControls
  //and in the BuildControl.js
  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    //tenho de atualizar o state...
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  //new method to know it the purchaseble button is clicked
  //normal method
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  //method to close the backdrop
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    //alert("You continue!");
    // //.json is just for firebase!
    // //post is to store data in the backend
    // this.setState({ loading: true });
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: "Rui",
    //     address: {
    //       street: "Alverca"
    //     },
    //     deliveryMethod: "fastest"
    //   }
    // };
    // axios
    //   .post("/orders.json", order)
    //   .then(response => {
    //     this.setState({ laoding: false, purchasing: false });
    //   })
    //   .catch(error => {
    //     this.setState({ laoding: false, purchasing: false });
    //   });
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push("price=" + this.state.totalPrice);
    const queryString = queryParams.join("&");

    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
  };

  //method to remove ingredient, it needs to know the type
  //problema quando fica menos que zero...
  //temos de fazer um if
  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    //se for menor que zero... nothing happens!
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    //tenho de atualizar o state...
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  render() {
    //se for menor que zero, fazer o disable do botao
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    //spinner
    let orderSummary = (
      <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        purchaseCancelHandler={this.purchaseCancelHandler}
        purchaseContinueHandler={this.purchaseContinueHandler}
      />
    );

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>

        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
          price={this.state.totalPrice}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;

//this.state initializes the state
//what should be inside the state?
//I want to have the ingredients object where the keys
//are the names of the ingredients, and the values is
//the amount
