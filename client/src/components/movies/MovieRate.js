import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function OutlinedCard(props) {
  const [rating, setRating] = useState(0);
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const rateHandler = (event) => {
    let eventValue = event.target.value;
    setRating(eventValue);
  }
  const profile = useSelector(state => state);

  const sendRate = () => {
    const {uuid} = props ;
    axios.post('https://q25rjhfzij.execute-api.eu-west-1.amazonaws.com/dev/addRating',{
      rate : rating,
      movieId : uuid,
      userId : profile.user.name
    })
    console.log('profile.prenom',profile)
    alert('Note ajoutée')
  }

  let rated;
  if (props.Rated){
      rated = ""; 
  } else{
      rated = "Vous n'avez pas encore noté ce film";
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Notez le Film Choisi
        </Typography>
        <Typography variant="h5" component="h2">
          {props.Title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {rated}
        </Typography>
        <Typography variant="body2" component="p">
          Note Moyenne: 4.5/5.0. <br/>
          Parmi {30} notes
        </Typography>
        <Rating readOnly name="read-rate" value={4.5} precision={0.5}/>

        <Typography component="legend">
          Donnez votre avis
        </Typography>
        <Rating precision={0.5} name="rate" value={rating} onChange={rateHandler}/>
      </CardContent>
      <CardActions>
        <Button disabled={!profile.user || !profile.user.name} onClick={sendRate} size="small">Noter</Button>
      </CardActions>
    </Card>
  );
}
