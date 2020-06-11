import React,{useState} from 'react';
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

export default function MovieDisplay() {
    const [openRateCard, setRateCard] = useState(false);
    const state = useSelector(state => state);
    const classes = homeStyle();
    let rateCard;

    const changeDisplay= () => {
            setRateCard(!openRateCard);
    }

    if(openRateCard){
        rateCard = (
            <Grid container spacing={4} alignItems="center" justify="center">
                <MovieCard Title={state.movie.name} Poster={state.movie.picture} Realizer={state.movie.realizer} />
                <MovieRate Title={state.movie.name} Rated={false}/>

            </Grid>
            
        );

    } else{
        rateCard = (
            <Grid container spacing={4} alignItems="center" justify="center">
                <MovieCard Title={state.movie.name} Poster={state.movie.picture} Realizer={state.movie.realizer}/>
                
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
