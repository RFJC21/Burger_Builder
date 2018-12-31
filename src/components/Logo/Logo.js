import React from "react";
import burgerLogo from "../../assets/images/burger-logo.png";
import classes from "./Logo.css";

//because the imagens doesnt have background,let create a css file
//we have to add it to our toolbar component

const logo = props => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt="Cabeca Logo" />
  </div>
);

export default logo;
