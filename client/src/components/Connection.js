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
import AddIcon from '@material-ui/icons/Add';
import { IconButton } from '@material-ui/core';
import NewUserDialog from './NewUserDialog'
//Page de connection, il s'agit pas d'authentifier les utilisateurs
// Mais de simplement choisir un profil

export default function SignIn() {
    const classes = useStyles();

    // Variables de contrôle de choix
    const [users,setUsers] = useState([]);
    const [addingNewUser,setAddingUser] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const dispatcher = useDispatch();

    // Fonction qui récupère les utilisateurs de la BDD
    useEffect(() => {
        const getUsers = async() => {
        const response = await axios.get("https://cors-anywhere.herokuapp.com/q25rjhfzij.execute-api.eu-west-1.amazonaws.com/dev/getUsers");
        //console.log('response',response)
        setUsers(response.data);
    };
    getUsers();
},[]);

    const onClose = (username) => {
        if(!username){
          setAddingUser(false) ; 
          return ;
        }
        var isAlreadyUsed = false ; 
        var i = 0 ;
        while (i < users.length && !isAlreadyUsed) {
          console.log('users[i]',users[i])
          isAlreadyUsed =(users[i].name.toLowerCase() == username.toLowerCase()) ; 
          i++ ; 
        }
        
        if(!isAlreadyUsed){
          setUsers([{name : username},...users]) ; 
          alert('Utilisateur ajouté') ;
          setAddingUser(false) ; 
          axios.post("https://cors-anywhere.herokuapp.com/q25rjhfzij.execute-api.eu-west-1.amazonaws.com/dev/addUser",{name : username});
        }
        else {
          alert('Identifiant déjà utilisé')
        }
        

    }
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
            <div style={{display : 'flex', flexDirection:'row'}}>
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
                    let userName = user.name;
                    if( typeof userName === 'string'){
                      return(<MenuItem value={userName} key={userName}>{userName}</MenuItem>);

                    }
                })}

              </TextField>
              <div style={{marginLeft:5, verticalAlign:'center', display:'flex', alignItems:'center'}}>
                <IconButton onClick={()=> setAddingUser(true)} aria-label="addUser" style={{backgroundColor:'#3f51b5', color:'#fff'}} className={classes.margin}>
                  <AddIcon fontSize="small" />
                </IconButton>
              </div>
            </div>
            <LinkR to={selectedUser.prenom ? 'movies/movieList' : '#'}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => {
                if(selectedUser.prenom){
                  dispatcher({
                    type:'LOGIN',
                    prenom: selectedUser.prenom
                  })
                }
              }}
            
            >
              Confirmer
            </Button>

            </LinkR>
          </form>
        </div>
        <NewUserDialog close={onClose} open={addingNewUser}/>
        <Box mt={5}>
            <Footer />
        </Box>
      </Container>
    );
  }