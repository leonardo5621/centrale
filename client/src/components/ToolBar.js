import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import CameraRollIcon from '@material-ui/icons/CameraRoll';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import homeStyle from './HomeStyle';
import Button from '@material-ui/core/Button';
import {Link as LinkR} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';




const useStyles = homeStyle;


export default function ToolBar() {
    const classes = useStyles();

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
            

          </Toolbar>
        </AppBar>
    )
}
