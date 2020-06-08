import React from "react";
import logo from "./logo.svg";
import "./HomePage.css";
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import CameraRollIcon from '@material-ui/icons/CameraRoll';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import homeStyle from './HomeStyle';
import {Link as LinkR} from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = homeStyle;

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];


const HomePage = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
    <CssBaseline />
    <AppBar position="relative">
      <Toolbar>
        <CameraRollIcon className={classes.icon} />
        <Typography variant="h6" color="inherit" noWrap>
          Films
        </Typography>
      </Toolbar>
    </AppBar>
    <main>
      {/* Hero unit */}
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography component="h2" variant="h3" align="center" color="textPrimary" gutterBottom>
            Plateforme de Recommandation des Filmes
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Something short and leading about the collection below—its contents, the creator, etc.
            Make it short and sweet, but not too short so folks don&apos;t simply skip over it
            entirely.
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>

                <LinkR to="/connection">
                <Button variant="contained" color="primary">
                  Connectez-vous
                </Button>

                </LinkR>
                
              </Grid>
              <Grid item>
                <Button variant="outlined" color="primary">
                  Découvrez le catalogue
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      {/* <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image="https://source.unsplash.com/random"
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Heading
                  </Typography>
                  <Typography>
                    This is a media card. You can use this section to describe the content.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    View
                  </Button>
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container> */}
    </main>

    {/* Footer */}
    <footer className={classes.footer}>
      <Typography variant="h6" align="center" gutterBottom>

      </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        Projet Site Internet EI3
      </Typography>
      <Copyright />
    </footer>
    {/* End footer */}
    </React.Fragment>
  );
};

export default HomePage;
