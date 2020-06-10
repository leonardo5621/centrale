import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
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
import useStyles from './FormStyle';
import Footer from './Footer';
import Box from '@material-ui/core/Box';

//Page de connection, il s'agit pas d'authentifier les utilisateurs
// Mais de simplement choisir un profil

export default function SignIn() {
    const classes = useStyles();

    // Variables de contrôle de choix
    const [users,setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({prenom:'None'});
    const dispatcher = useDispatch();

    // Fonction qui récupère les utilisateurs de la BDD
    useEffect(() => {
        const getUsers = async() => {
          const response = await axios.get("https://randomuser.me/api/?results=5");
        setUsers(response.data.results);
    };
    getUsers();
},[]);

      // Fonction responsable pour contrôle les champs du formulaire 
    const changeHandler = (event) => {
        let eventName = event.target.name;
        let eventValue = event.target.value;

        setSelectedUser({prenom:eventValue});
    }; 
  
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Choisissez votre profil
          </Typography>

          {/* Formulaire de choix de l'utilisateur, avec un seul champ */}

          <form className={classes.form} noValidate>

            {/*Champ de choix multiple parmi les utilisateurs */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              select
              value={selectedUser.prenom}
              fullWidth
              id="user"
              label="Utilisateur"
              name="user"
              autoComplete="user"
              autoFocus
              onChange={changeHandler}
            >
                {/* Options d'utilisateur disponibles */}
                {users.map((user) => {
                    let name = user.name.first;
                    return(<MenuItem value={name} key={name}>{name}</MenuItem>);
                })}

            </TextField>
            <LinkR to='/movieList'>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => {
                  dispatcher({
                    type:'LOGIN',
                    prenom: selectedUser.prenom
                  })
              }}
            
            >
              Confirmer
            </Button>

            </LinkR>
            <Grid container>

              {/* Création de Compte */}
              
              <Grid item>
                <Link href="#" variant="body2">
                  <Typography> Créez votre compte</Typography>
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>

        <Box mt={5}>
            <Footer />
        </Box>
      </Container>
    );
  }