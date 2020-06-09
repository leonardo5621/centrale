import React,{useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import MovieCard from '../components/MovieCard';
import ToolBar from '../components/ToolBar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import homeStyle from '../components/HomeStyle';
import { Container } from '@material-ui/core';

export default function MovieDisplay() {
    const state = useSelector(state => state);
    const classes = homeStyle();

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

                <MovieCard Title={state.movie.Title} Poster={state.movie.Poster} Plot={state.movie.Plot} />

            </main>

            <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
    
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Projet Site Internet EI3
          </Typography>
            </footer>
        </React.Fragment>
        
    )
}
