import React, {useState} from "react";
import "./HomePage.css";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import homeStyle from './HomeStyle';
import {Link as LinkR} from 'react-router-dom';
import Footer from './Footer';
import ToolBar from './ToolBar';
import axios from 'axios';
import { useSelector } from "react-redux";

//Page Principale de l'application

// Styles de la page
const useStyles = homeStyle;

const HomePage = () => {
  const classes = useStyles();

  //Utilisation de l'état global de l'application, par la labrerie Redux-React
  const prof = useSelector(state => state);

  //Test qui relie le front et le back

  const testApi = async() => {
        console.log('ici')
        //const M = await axios.post('https://cors-anywhere.herokuapp.com/q25rjhfzij.execute-api.eu-west-1.amazonaws.com/dev/getMovies');        
        //const M = await axios('https://kljmy0vuqk.execute-api.eu-west-1.amazonaws.com/dev/hello');
        axios.get('https://cors-anywhere.herokuapp.com/q25rjhfzij.execute-api.eu-west-1.amazonaws.com/dev/getMovies')
        .then((response) => {
          console.log(response);
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });
        //console.log(M);
  };

  testApi();



  return (
    <React.Fragment>
    <CssBaseline />

      {/*Toolbar en haut de la page*/}
    <ToolBar/>
 
    <main>
      {/* Introduction de l'application */}
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography component="h2" variant="h3" align="center" color="textPrimary" gutterBottom>
            Plateforme de Recommandation des Films
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Projet d'une plateforme de recommandation des films,développé pour l'enseignement
            d'intégration de la ST DataWeb à CentraleSupélec
          </Typography>
          <div className={classes.heroButtons}>

            {/* Container avec les boutons */}
            <Grid container spacing={2} justify="center">

              {/* Lien vers la page de connection */}
              <Grid item>

                <LinkR to="/connection">
                <Button variant="contained" color="primary">
                  Connectez-vous
                </Button>

                </LinkR>
                
              </Grid>
              <Grid item>

                {/*Lien vers le catalogue des films */}

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
