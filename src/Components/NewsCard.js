import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    height: "calc(100% - 42px)",
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

function NewsCard(props) {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;

  var newName = "";

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Word of the Day
        </Typography>
        <Typography variant="h5" component="h2">
          be
          {bull}
          nev
          {bull}o{bull}
          lent
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions className="card_actions">
        <div>
          <input
            placeholder="CHANGE USERNAME"
            id="change_name_input"
            onChange={e => {
              newName = e.target.value;
            }}
          />
        </div>
      </CardActions>
    </Card>
  );
}

NewsCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NewsCard);
