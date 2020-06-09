import React from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import homeStyle from '../HomeStyle';


export default function MovieCard(props) {

    const classes = homeStyle();
    const sizeMd = props.size? props.size:6;

    return (
                <Grid item key={props.Title} xs={12} sm={6} md={sizeMd}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={props.Poster}
                      title={props.Title}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {props.Title}
                      </Typography>
                      <Typography>
                        {props.Plot}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      {/* <Button size="small" color="primary"
                       onClick={() => {
                         dispatcher({
                           type:'MOVIE'   
                         })
                       }}>
                        
                      </Button> */}
                      
                    </CardActions>
                  </Card>
                </Grid>
          
    )
}
