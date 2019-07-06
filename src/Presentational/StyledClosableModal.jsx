import React from 'react';
import { withStyles, useStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AppBar, Toolbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'

const styles = theme => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  root: {
      flexGrow: 1,
  },
  functionCard: {
      borderRadius: '10px',
      height: '225px'
  },
  functionCardBody: {
      display: 'flex',
      flex: '1 0 auto',
      height: '175px',
      justifyContent: 'center'
  },
  functionCardActions: {
      justifyContent: 'space-between',
  },
  paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
  },
  icon: {
      maxWidth: '100px',
      margin: 'auto'
  },
  close: {
      padding: theme.spacing.unit / 2,
  }
});



class StyledClosableModal extends React.Component {


  render() {
    return (
    <Dialog
      fullWidth={true}
      maxWidth={'lg'}
      {...this.props}
      aria-labelledby="max-width-dialog-title"
    >
      <AppBar
        position="static" 
        color="primary"
      >
        <Toolbar>
          {this.props.title}
          <IconButton edge="end" color="inherit" onClick={this.props.handleClose}>
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <DialogContent>
        {this.props.children}
      </DialogContent>

      <DialogActions>
        <Button onClick={this.props.handleClose} color="secondary">
          {this.props.closeText || 'Close Dialog'}
        </Button>
        <Button onClick={this.props.handleClose} color="primary">
          {this.props.submitText || 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
    )
  }

}

export default withStyles(styles)(StyledClosableModal)