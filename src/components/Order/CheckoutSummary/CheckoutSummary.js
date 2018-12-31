import React from "react";
import classes from "./CheckoutSummary.css";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

const checkoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <hi> We hope it tastes well!</hi>
      <div className={classes.Box}>
        {/*box to preview the burger*/}
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.checkoutCancelled}>
        <strong>CANCEL</strong>
      </Button>
      <Button btnType="Success" clicked={props.checkoutContinued}>
        <strong>CONTINUE</strong>
      </Button>
    </div>
  );
};

export default checkoutSummary;
