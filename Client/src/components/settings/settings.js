import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import {editMoney, editAllowance, editInterest} from "../../requests"

function Settings() {
  const [money, setMoney] = React.useState(0);
  const [allowance, setAllowance] = React.useState(0);
  const [interest, setInterest] = React.useState(0);

  const handleAddMoney = async () => {
    editMoney(money)
  }
  const handleAllowance = async () => {
    editAllowance(allowance)
  }
  const handleInterest = async () => {
    if (interest >= 0 && interest <= 1) {
      editInterest(interest)
    } else {
      alert("Interest must be between 0 and 1")
    }
  }


  return (
    <React.Fragment>
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
        Set allowance per month
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="set-interest"
            name="set-interest"
            label="Between 0 and 1"
            fullWidth
            autoComplete="0"
            type="number"
            onChange={(e) => setInterest(e.target.value)}
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
