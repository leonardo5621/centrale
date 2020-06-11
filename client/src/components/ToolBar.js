import React, {useState} from 'react'
import AppBar from '@material-ui/core/AppBar';
import CameraRollIcon from '@material-ui/icons/CameraRoll';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import homeStyle from './HomeStyle';
import Button from '@material-ui/core/Button';
import {Link as LinkR} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {useSelector, useDispatch} from 'react-redux';

//Composant fonctionnel de la barre en haut des pages


export default function ToolBar(props) {
    const classes = homeStyle();

    //Contrôle du petit onglet avec le prénom de l'utilisateur 
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    // Variables de Redux
    const profile = useSelector(state => state);
    const dispatch = useDispatch();

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleDec = () => {
        dispatch({
          type:'LOGIN',
          prenom:'none'
        });
    };

    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };

    return (
        <AppBar position="static">
          <Toolbar>

            {/*Icon en haut à gauche de la page */}
            <CameraRollIcon className={classes.icon} />
            <Typography variant="h6" color="inherit" className={classes.title}>
              Films
            </Typography>

            {/*Liens en haut à droite */}

            <LinkR to="/">
                <Button color="primary" variant="contained">Accueil</Button>
            </LinkR>
            <LinkR to="/movies/movieList">
                <Button color="default" variant="contained">Liste de Filmes</Button>
            </LinkR>


              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={handleMenu}

              >
                <AccountCircle />
              </IconButton>

              {/*Petit onglet qui affiche le prénom de l'utilisateur */}

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>{profile.prenom}</MenuItem>
                <LinkR to="/">
                  <MenuItem onClick={handleDec}>Déconnecter</MenuItem>
                </LinkR>
              </Menu>
            

          </Toolbar>
        </AppBar>
    )
}
