import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import {editMoney, editAllowance, editInterest} from "../../requests"
import SimpleBackdrop from "./passwordCard";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Backdrop } from "@material-ui/core";
import { useState, useEffect } from "react";
import { validateSession_id } from "../../requests";
import Alert from "@material-ui/lab/Alert"



const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    width: "100%",
    height: "100%"
  }
}));


function Settings() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [date, setDate] = useState("")
  const [money, setMoney] = React.useState(0);
  const [allowance, setAllowance] = React.useState(0);
  const [interest, setInterest] = React.useState(0);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [param, setParam] = React.useState(0)
  const [pw, setPw] = React.useState(0)
  const [pwError, setPwError] = React.useState(false)

  validateSession_id().then((r) => {setInterest(r.interest); 
                                    setUsername(r.username); 
                                    setMoney(r.money); 
                                    setEmail(r.email); 
                                    setAllowance(r.allowance);
                                    setDate(r.date)  
                                    console.log("the final values are", username, email, money, interest)})

  const handleAddMoney = async () => {
    setParam(0);
    setOpen(!open);
  }
  const handleAllowance = async () => {
    setParam(1);
    setOpen(!open);
  }
  const handleInterest = async () => {
    setParam(2);
    if (interest >= 0 && interest <= 1) {
      setOpen(!open);
    } else {
      alert("Interest must be between 0 and 1")
    }
  }

  return (
    <React.Fragment>
      <Backdrop
        className={classes.backdrop}
        open={open}
        onClick={() => {
          //setOpen(false);
        }}
      >
        <div style={{right: 8, bottom: 8, float: "right"}}>
          <Card className={classes.card}>
              <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Enter Password to continue
                  </Typography>
                  <TextField 
                    required
                    variant="outlined"
                    type="password"
                    onChange={(e) => setPw(e.target.value)}
                  />
              </CardContent>
              <CardActions>
                <Button size="small" 
                        onClick={async () => {
                          if (param == 0) {
                            var res = editMoney(money, email, pw)
                            if (res) {
                              setPwError(true)
                            }
                          } else if (param == 1) {
                            var res = editAllowance(allowance, email, pw)
                            if (res) {
                              setPwError(true)
                            }
                          } else if (param == 2) {
                            var res = editInterest(interest, email, pw)
                            if (res) {
                              setPwError(true)
                            }
                          }
                        }}
                >
                  Enter
                </Button>
                <Button size="small" onClick={() => setOpen(false)}>Cancel</Button>
              </CardActions>
          </Card>
          <Alert 
              severity="error" 
              variant="filled" 
              style={{ right: "8", bottom: "8", float: "right", width: "100%", visibility: pwError ? "visible" : "hidden" }} 
              onClose={() => {setPwError(false)}}>
                Incorrect Password
          </Alert>
        </div>
      </Backdrop>
      <Typography variant="h6" gutterBottom>
        Add money
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="add-money"
            name="add-money"
            label="Amount ($)"
            fullWidth
            autoComplete="add-money"
            type="number"
            onChange={(e) => setMoney(e.target.value)}
          />
        </Grid>
      </Grid>
      <br />
      <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleAddMoney}>
        Save
      </Button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <Typography variant="h6" gutterBottom>
        Set allowance per month
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="set-allowance"
            name="set-allowance"
            label="Amount ($)"
            fullWidth
            autoComplete="add-money"
            type="number"
            onChange={(e) => setAllowance(e.target.value)}
          />
        </Grid>
      </Grid>
      <br />
      <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleAllowance}>
        Save
      </Button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <Typography variant="h6" gutterBottom>
        Set Interest per month
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="set-interest"
            name="set-interest"
            label="Between 0 and 100"
            fullWidth
            autoComplete="0"
            type="number"
            onChange={(e) => setInterest(e.target.value / 100)}
          />
        </Grid>
      </Grid>
      <br />
      <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleInterest}>
        Save
      </Button>
    </React.Fragment>
  );
}

export default Settings;
