import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog(props) {

    const {open,close} = props
    const [username,setUsername] = React.useState(null) ; 
  return (
    <div>
      
      <Dialog open={open} onClose={close} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Ajout d'utilisateur</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Nom d'utilisateur
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Pseudo"
            onChange={event => setUsername(event.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => close(null)} color="primary">
            Annuler
          </Button>
          <Button onClick={() => close(username)} color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}