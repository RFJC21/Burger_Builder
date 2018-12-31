import React from "react";
import classes from "./Button.css";

//we want to output props.children to use my own button like a
//normal button and wrap the content which should go inside
//with my custom button element
//in the className, we have to pass a string: because i always
//wanto to assign the button class conditionally
//we have an array of strings, but adding.join(" ") it becomes
//a string
//when the button is clicked, so we have to execute some methods
//in the order summary component, and the order summary is used
// in the bb, so we have to pass 2 properties there

const button = props => (
  <button
    className={[classes.Button, classes[props.btnType]].join(" ")}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default button;
