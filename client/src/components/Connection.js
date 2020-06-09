import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import {useDispatch} from 'react-redux';
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

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
    const classes = useStyles();
    const [users,setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({prenom:'None'});
    const dispatcher = useDispatch();


    useEffect(() => {
        const getUsers = async() => {
          const response = await axios.get("https://randomuser.me/api/?results=5");
        setUsers(response.data.results);
    };
    getUsers();
},[]);

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
          <form className={classes.form} noValidate>
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
              
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }