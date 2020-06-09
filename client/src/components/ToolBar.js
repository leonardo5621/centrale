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
import {useSelector} from 'react-redux';


export default function ToolBar(props) {
    const classes = homeStyle();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const profile = useSelector(state => state);

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };

    return (
        <AppBar position="static">
          <Toolbar>
            <CameraRollIcon className={classes.icon} />
            <Typography variant="h6" color="inherit" className={classes.title}>
              Films
            </Typography>

            <LinkR to="/">
                <Button color="primary" variant="contained">Accueil</Button>
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
              </Menu>
            

          </Toolbar>
        </AppBar>
    )
}
