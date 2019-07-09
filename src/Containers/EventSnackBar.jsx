import React from "react";
import {connect} from 'react-redux'

import { SnackbarContent } from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import green from '@material-ui/core/colors/green';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


// TODO: these should be moved into a global theme...
// The component name is MuiThemeProvider IIRC (no internet while writing this)
const styles = theme => ({
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
  },
  snackError: {
      backgroundColor: theme.palette.error.dark,
  },
  snackSuccess: {
      backgroundColor: green[600],
  }
});

class EventSnackBar extends React.Component {

  handleClose = (idx, event, reason) => {
      console.log(idx, event, reason)
      if (reason === 'clickaway') {
          return;
      }

      this.props.closeEvent(idx)
  }

  render() {
      const { classes } = this.props

      return (
          <div className={classes.root}>
              {this.renderSnackbars()}
          </div>
      );
  }

  renderSnackbars() {
    const { classes } = this.props
    return this.props.events.map((e, idx)=> (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={this.props.events.length > 0}
        autoHideDuration={3000}
        onClose={this.handleClose.bind(this, idx)}
        key={'sb-'+idx}
        style={{bottom: idx * 52}} // 48 for each plus 4 padding
      >
        <SnackbarContent 
          className={e.status === 'FAILED' ? classes.snackError : classes.snackSuccess}
          message={e.message}
          />
      </Snackbar>
    ))
  }

}

EventSnackBar.propTypes = {
  classes: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired
};

//TODO: snackbar should probably be top level to go with the new global state. 
// Then a timer could cycle through a FIFO list of notifications every 30 seconds or so.
const mapStateToProps = (state, ownProps) => ({
  events: state.statusList,
})

const mapDispatchToProps = {
  closeEvent:(idx) => {
    return (dispatch) => {
      console.log(idx, dispatch)
      dispatch({
        type: 'REMOVE_EVENT',
        idx
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EventSnackBar))