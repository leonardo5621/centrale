import React, {useState} from 'react'
import CameraIcon from '@material-ui/icons/Camera';
import useStyles from '../components/FormStyle';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {Link as LinkR} from 'react-router-dom';
import Footer from '../components/Footer';

function MovieCreate() {
    const classes = useStyles();
    const [movie, setMovie] = useState({Title:"", Genre:"", Length:"", Plot:"", Poster:""});

    const changeHandler = (event) => {

        let eventName = event.target.name;
        let eventValue = event.target.value;
        console.log(eventValue);
        let newState = {...movie};
        newState[eventName] = eventValue;

        setMovie(newState);
    }; 

    return (
        <Container component="main" maxWidth="xs">

        <CssBaseline />

        <div className={classes.paper}>

          <CameraIcon />

          <Typography component="h1" variant="h5">
            Ajouter un nouveau film
          </Typography>

          <form className={classes.form} noValidate>
            <TextField
              variant="outlined" margin="normal"
              required
              value={movie.Title}
              fullWidth
              id="title" label="Titre" name="Title"
              autoFocus autoComplete="Title" onChange={changeHandler}
            ></TextField>

            <TextField
              variant="outlined" margin="normal"
              required
              value={movie.Genre}
              fullWidth
              id="genre" label="Genre" name="Genre"
              autoFocus onChange={changeHandler}
            ></TextField>

            <TextField
              variant="outlined" margin="normal"
              required
              value={movie.Length}
              fullWidth
              id="length" label="Taille" name="Length"
              autoFocus onChange={changeHandler}
            ></TextField>

            <TextField
              variant="outlined" margin="normal"
              required
              value={movie.Plot}
              multiline
              fullWidth
              rowsMax={5}
              id="plot" label="Description" name="Plot"
              autoFocus onChange={changeHandler}
            ></TextField>

            <TextField
            fullWidth
              variant="outlined" margin="normal"
              value={movie.Poster}
              id="poster" label="Image(URL)" name="Poster"
              autoFocus onChange={changeHandler}
            ></TextField>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}          
            >
              Confirmer
            </Button>

            <Grid container>
              
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={3}>
            <Footer />
        </Box>
      </Container>

    )
}

export default MovieCreate
