import React, {useState} from 'react'
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
    const [movie, setMovie] = useState({name:"", year:"", realizer:"", actors:"", picture:"", description : ""});

    const postMovie = async () => {
      if(movie.name){
        axios.post('https://cors-anywhere.herokuapp.com/q25rjhfzij.execute-api.eu-west-1.amazonaws.com/dev/addMovie',movie)
        .catch(error => {
            console.log(error)
        });
      }
       
    };
    
    const changeHandler = (event) => {

        let eventName = event.target.name;
        let eventValue = event.target.value;
        if (eventName === 'actors'){
          eventValue = eventValue.split(',');
        }
        let newState = {...movie};
        newState[eventName] = eventValue;

        setMovie(newState);
    }; 

    return (
        <Container component="main" maxWidth="xs">

        <CssBaseline />

        <div className={classes.paper}>


          <Typography component="h1" variant="h5">
            Ajouter un nouveau film
          </Typography>

          {/* <form className={classes.form} noValidate> */}
            <TextField
              variant="outlined" margin="normal"
              required
              value={movie.name}
              fullWidth
              id="title" label="Titre" name="name"
              autoFocus autoComplete="Title" onChange={changeHandler}
            ></TextField>

            <TextField
              variant="outlined" margin="normal"
              required
              value={movie.realizer}
              fullWidth
              id="genre" label="Réalisateur" name="realizer"
              autoFocus onChange={changeHandler}
            ></TextField>

            <TextField
              variant="outlined" margin="normal"
              required
              value={movie.acteurs}
              fullWidth
              id="length" label="Acteurs(séparez avec des virgules)" name="actors"
              autoFocus onChange={changeHandler}
            ></TextField>

            <TextField
              variant="outlined" margin="normal"
              required
              value={movie.year}
              multiline
              fullWidth
              rowsMax={5}
              id="plot" label="Année" name="year"
              autoFocus onChange={changeHandler}
            ></TextField>

           


            <TextField
            fullWidth
              variant="outlined" margin="normal"
              value={movie.Poster}
              id="poster" label="Image(URL)" name="picture"
              autoFocus onChange={changeHandler}
            ></TextField>

            <TextField
              variant="outlined" margin="normal"
              required
              value={movie.description}
              multiline
              rows={3}
              fullWidth
              rowsMax={5}
              id="description" label="Description" name="description"
              autoFocus onChange={changeHandler}
            ></TextField>


            <LinkR style={{textDecoration:'none'}} to="/movies/movieList">
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}  
                onClick={postMovie}        
              >
                Ajouter
                </Button>
            </LinkR>

            
        </div>
        <LinkR to={'/'}  style={{textDecoration:'none'}}>
            <p style={{textAlign:'center'}}>retour</p>
        </LinkR>
        <Box mt={3}>
            <Footer />
        </Box>
      </Container>

    )
}

export default MovieCreate
