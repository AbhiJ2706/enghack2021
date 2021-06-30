import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";

const useStyles = makeStyles({
  savingsContext: {
    flex: 1,
  },
});

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
const date = mm + '/' + dd + '/' + yyyy;

function Savings(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Your Savings</Title>
      <br />
      <Typography component="p" variant="h3">
        {"$" + props.pesos.toFixed(2)}
      </Typography>
      <br />
      <br />
      <Typography color="textSecondary" className={classes.savingsContext}>
        {"Last change on " + date}
      </Typography>
    </React.Fragment>
  );
}

export default Savings;
