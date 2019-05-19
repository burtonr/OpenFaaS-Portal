import React from "react";
import {connect} from 'react-redux'
import { Grid, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from '@material-ui/core/IconButton';
import CodeIcon from '@material-ui/icons/Code';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import Tooltip from '@material-ui/core/Tooltip';
import OFLogo from '../static/images/icon.png';
import green from '@material-ui/core/colors/green';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { loadStoreFunctions, deployStoreFunction } from '../actions/functionStore'

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

class FunctionStore extends React.Component {
    state = {
        selectedFunc: {}
    };

    handleClose = (event, reason) => {
        console.log(event,reason)
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ snackBar: false });
    }

    componentDidMount() {
        this.props.loadStoreFunctions()
    }

    render() {
        const { classes, functions } = this.props

        // todo
        return (
            <div className={classes.root}>
                <Grid container spacing={24} justify="center">
                    {this.renderFunctionList(functions)}
                </Grid>
            </div>
        );
    }

    renderFunctionList(functionList) {
        return functionList.map(this.renderFunctionCard.bind(this))
    }

    renderFunctionCard(func,idx) {
        //TODO: again, global theme
        const { classes } = this.props

        return (
            <Grid item sm={12} md={6} lg={4} xl={3} key={'func-'+idx}>
                <Card className={classes.functionCard}>
                    <CardActionArea className={classes.functionCardBody}>
                        <CardMedia
                            className={classes.icon}
                            component="img"
                            alt={func.title}
                            height="auto"
                            image={func.icon ? func.icon : ''}
                            src={func.icon ? '' : OFLogo}
                            title={func.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {func.title}
                            </Typography>
                            <Typography component="p">{func.description}</Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions className={classes.functionCardActions}>
                        <a href={func.repo_url} target="_blank" rel="noopener noreferrer">
                            <Tooltip title="Source" placement="top" aria-label="source">
                                <IconButton>
                                    <CodeIcon />
                                </IconButton>
                            </Tooltip>
                        </a>
                        <Tooltip title="Deploy" placement="top" aria-label="deploy">
                            <IconButton onClick={event => this.props.deployStoreFunction(event, func)}>
                                <PlaylistAddIcon />
                            </IconButton>
                        </Tooltip>
                    </CardActions>
                </Card>
            </Grid>
        )
    }
}

FunctionStore.propTypes = {
    classes: PropTypes.object.isRequired,
    functions: PropTypes.array.isRequired
};

//TODO: snackbar should probably be top level to go with the new global state. 
// Then a timer could cycle through a FIFO list of notifications every 30 seconds or so.
const mapStateToProps = (state, ownProps) => ({
    functions: state.functionStore.list
})
  
const mapDispatchToProps = { 
    loadStoreFunctions,
    deployStoreFunction,
}
  
// TODO: split presentation and data...
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(FunctionStore))