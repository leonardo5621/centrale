import React from 'react'
import Copyright from './copyright';
import Typography from '@material-ui/core/Typography';
import homeStyle from './HomeStyle';

// Composant fonctionnel du footer des pages

export default function Footer() {
    const classes = homeStyle();
    return (
      <footer className={classes.footer}>
          
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Projet Site Internet EI3
          </Typography>
         {
         // <Copyright />
        }

        </footer>
    )
}
