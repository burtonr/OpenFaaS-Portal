import React from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';


import {startPollFunctions, stopPollFunctions } from '../actions/functionList'

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
      },
});

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

class FunctionTable extends React.Component {
    state = {
        open: false,
        selectedFunc: {},
        functions: []
    };

    functionClicked = (event, row) => {
        this.setState({
            open: true,
            selectedFunc: row,
        });
    };

    handleClose = () => {
            this.setState({ open: false });
    }


    componentDidMount = () => {
        this.props.startPollFunctions()
    }
    componentWillUnmount = () => {
        this.props.stopPollFunctions()
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="left">Image</TableCell>
                                <TableCell align="left">URL</TableCell>
                                <TableCell align="left">Process</TableCell>
                                <TableCell align="right">Replicas</TableCell>
                                <TableCell align="right">Invocations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.functions.map(func => (
                                <TableRow key={func.name} hover onClick={event => this.functionClicked(event, func)}>
                                    <TableCell component="th" scope="row">
                                        {func.name}
                                    </TableCell>
                                    <TableCell align="right">{func.image}</TableCell>
                                    <TableCell align="left">{this.state.baseUrl}function/{func.name}</TableCell>
                                    <TableCell align="left">{func.envProcess}</TableCell>
                                    <TableCell align="right">{func.replicas}</TableCell>
                                    <TableCell align="right">{func.invocationCount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
                {// TODO: Abstract Modals into presentational container?
                }
                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        <Typography variant="h6" id="modal-title">
                            {this.state.selectedFunc.name}
                    </Typography>
                        <Typography variant="subtitle1" id="simple-modal-description">
                            {this.state.selectedFunc.image}
                    </Typography>
                    </div>
                </Modal>
            </div>
        );
    }
}

FunctionTable.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
    functions: state.functionList.list
})
  
const mapDispatchToProps = { 
    startPollFunctions,
    stopPollFunctions
}
  
// TODO: split presentation and data...
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(FunctionTable))
