import React, {useState} from "react";
import "./HomePage.css";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import homeStyle from './HomeStyle';
import {Link as LinkR} from 'react-router-dom';
import Copyright from './copyright';
import Footer from './Footer';
import ToolBar from './ToolBar';
import axios from 'axios';
import { useSelector } from "react-redux";



const useStyles = homeStyle;

const HomePage = () => {
  //const [profile, setProfile] = useState({prenom:'none'})
  const classes = useStyles();

  const prof = useSelector(state => state);

  const testApi = async() => {
        console.log('ici')
        const M = await axios('https://cors-anywhere.herokuapp.com/kljmy0vuqk.execute-api.eu-west-1.amazonaws.com/dev/hello');        
        //const M = await axios('https://kljmy0vuqk.execute-api.eu-west-1.amazonaws.com/dev/hello');
        console.log(M);
  };

  testApi();



  return (
    <React.Fragment>
    <CssBaseline />

    <ToolBar/>
 
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

                <LinkR to="/movieList">
                <Button variant="outlined" color="primary">
                  Découvrez le catalogue
                </Button>  
                </LinkR>
               
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
     
    </main>

    {/* Footer */}
      <Footer />
    </React.Fragment>
  );
};

export default HomePage;
