import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const StyledLinearProgress = withStyles({
  root: {
    width: "100%",
    height: 20,
    borderRadius: 9,
  },
  bar: {
    borderRadius: 9,
  },
})(LinearProgress);

const useStyles = makeStyles({
  allowanceContext: {
    flex: 1,
  },
});

var achievementsCap;


function scaleProgress(progressToScale) {
  console.log((100 * progressToScale) / achievementsCap);
  return (100 * progressToScale) / achievementsCap;
}

function ProgressBar(props) {
  const classes = useStyles();
  const achievementsProgress = props.progress < 200 ? props.progress : 200;
  if (achievementsProgress < 10) {
    achievementsCap = 10;
  } else if (achievementsProgress < 25) {
    achievementsCap = 25;
  } else if (achievementsProgress < 50) {
    achievementsCap = 50;
  } else if (achievementsProgress < 100) {
    achievementsCap = 100;
  } else {
    achievementsCap = 200;
  }
  return (
    <div>
      <StyledLinearProgress
        variant="determinate"
        value={scaleProgress(achievementsProgress)}
      />
      <Grid container justify="space-between">
        <Grid item>$0</Grid>
        <Grid item>{"$" + achievementsCap}</Grid>
      </Grid>

      <br />
      <br />
      <Typography color="textSecondary" className={classes.allowanceContext}>
        {"You are " +
          scaleProgress(achievementsProgress).toFixed(2) +
          "% of the way there to achieve the next tier of products!"}
      </Typography>
    </div>
  );
}

export default ProgressBar;
