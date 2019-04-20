import React from 'react';
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

const refreshListTimeout = 350000;

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
        functions: [],
        baseUrl: "http://127.0.0.1:8080/"
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

    pollFunctions = () => {
        let options = {
            method: "GET", 
            credentials: 'include'
        };

        let self = this;

        fetch('http://127.0.0.1:8080/system/functions', options)
            .then(res => res.json())
            .then(response => {
                if (response) {
                    self.setState({
                        functions: response
                    });
                }
            })
    }

    componentDidMount = () => {
        setInterval(() => {
            this.pollFunctions();    
        }, refreshListTimeout);
        this.pollFunctions();
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
                            {this.state.functions.map(func => (
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
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FunctionTable);
