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
});

let id = 0;
function createData(name, image, url, envProcess, replicas, invocationCount) {
    id += 1;
    return { id, name, image, url, envProcess, replicas, invocationCount };
}

const rows = [
    createData('cows', 'alexellis2/ascii-cows-openfaas:0.1', 'http://127.0.0.1:8080/function/cows', 'node show_cows.js', 1, 14),
    createData('figlet', 'functions/figlet:0.9.6', 'http://127.0.0.1:8080/function/figlet', '', 1, 3),
    createData('hubstats', 'functions/hubstats:latest', 'http://127.0.0.1:8080/function/hubstats', '', 1, 1),
    createData('inception', 'alexellis/inception:2019-02-17', 'http://127.0.0.1:8080/function/inception', 'python3 index.py', 1, 2),
    createData('sentimentanalysis', 'functions/sentimentanalysis:latest', 'http://127.0.0.1:8080/function/sentimentanalysis', '', 4, 1),
];

function rand() {
    return Math.round(Math.random() * 20) - 10;
  } 

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
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

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Image</TableCell>
                                <TableCell align="right">URL</TableCell>
                                <TableCell align="right">Process</TableCell>
                                <TableCell align="right">Replicas</TableCell>
                                <TableCell align="right">Invocations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow key={row.id} hover onClick={event => this.functionClicked(event, row)}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.image}</TableCell>
                                    <TableCell align="right">{row.url}</TableCell>
                                    <TableCell align="right">{row.envProcess}</TableCell>
                                    <TableCell align="right">{row.replicas}</TableCell>
                                    <TableCell align="right">{row.invocationCount}</TableCell>
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
                            this.state.selectedFunc.name
                    </Typography>
                        <Typography variant="subtitle1" id="simple-modal-description">
                            this.state.selectedFunc.image
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
