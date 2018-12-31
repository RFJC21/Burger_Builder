import React from "react";
import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredients/BurgerIngredient";
import { withRouter } from "react-router-dom";

const burger = props => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + 1} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  //colocar let em cima
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please add some ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default withRouter(burger);

//colocamos os igredientes
// e e preciso importar este comppionen no buegerbuilder
//we are receiving ingredients as props!!
//we have to convert this object into an array of the
//values of the ingredients
//Object.keys() extracts the keys of a given object and
//turns that into an array
//maps executes a function on each elemtns in the input
//array
//generic method to output ingredients
