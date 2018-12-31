import React from "react";
import classes from "./Backdrop.css";

//se houver modal, retorna o backdrop
//ao clicar tem de sair... onClick aqui; acrescrntar props to
// the Modal Component, and a method in Burger Builder
const backdrop = props =>
  props.show ? (
    <div className={classes.Backdrop} onClick={props.clicked} />
  ) : null;

export default backdrop;
