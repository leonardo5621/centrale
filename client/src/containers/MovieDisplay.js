import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import MovieCard from '../components/movies/MovieCard';
import MovieRate from '../components/movies/MovieRate';
import ToolBar from '../components/ToolBar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import homeStyle from '../components/HomeStyle';
import { Container, Button } from '@material-ui/core';
import Footer from '../components/Footer';
import axios from 'axios';

export default function MovieDisplay({match}) {
    const [openRateCard, setRateCard] = useState(false);
    const [state, setState] = useState({}); 
    const classes = homeStyle();
    let rateCard;

    useEffect(() => {
    const getMovie = async () => {
        let iD = match.params.movieID;
        axios.get('https://cors-anywhere.herokuapp.com/q25rjhfzij.execute-api.eu-west-1.amazonaws.com/dev/moviedetails/'+iD)
        .then((response) => {
          setState(response.data);
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });

    }

    getMovie();

    }, [])


    const changeDisplay= () => {
            setRateCard(!openRateCard);
    }

    if(openRateCard){
        rateCard = (
            <Grid container spacing={4} alignItems="center" justify="center">
                <MovieCard Title={state.name} Poster={state.picture} Realizer={state.realizer} />
                <MovieRate Title={state.name} Rated={false}/>

            </Grid>
            
        );

    } else{
        rateCard = (
            <Grid container spacing={4} alignItems="center" justify="center">
                <MovieCard Title={state.name} Poster={state.picture} Realizer={state.realizer}/>
                
            </Grid>
        );
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <ToolBar />

            <main>
                <div className={classes.heroContent}>
                    <Container maxwidth="sm">

                    <Typography component="h2" variant="h3" align="center" color="textPrimary" gutterBottom>
                        Détails du Filme
                    </Typography>

                    </Container>
                </div>

                <Container className={classes.cardGrid} maxWidth="md">
                        {rateCard}                        
                  
                </Container>

                <Grid container alignItems="center" justify="center">
                    <div style={{paddingBottom:'3%'}}>
                    <Button
                    variant ="contained" color="secondary" onClick={changeDisplay}>
                        Noter le Film
                    </Button>
                    </div>
                   
                </Grid>


            </main>

            <Footer/>

        </React.Fragment>
        
    )
}
