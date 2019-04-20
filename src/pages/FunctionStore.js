import React from "react";
import { Grid, Typography, SnackbarContent } from "@material-ui/core";
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
import Snackbar from '@material-ui/core/Snackbar';
import green from '@material-ui/core/colors/green';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

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

const storeUrl = 'https://raw.githubusercontent.com/openfaas/store/master/functions.json';

class FunctionStore extends React.Component {
    state = {
        selectedFunc: {},
        functions: [],
        snackBar: false,
        snackBarSuccess: true
    };

    getFunctionStore = () => {
        let self = this;
        fetch(storeUrl)
            .then(res => res.json())
            .then(response => {
                if (response && response.functions) {
                    self.setState({
                        functions: response.functions
                    });
                }
            })
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ snackBar: false });
    };

    deployStoreFunction = (event, func) => {
        let postData = {
            image: func.images['x86_64'],
            service: func.name
        }

        let options = {
            method: "POST",
            credentials: 'include',
            body: JSON.stringify(postData)
        };

        let self = this;

        fetch('http://127.0.0.1:8080/system/functions', options)
            .then(res => res.text())
            .then(response => {
                console.log(response);
                if (response === '') {
                    self.setState({
                        snackBar: true,
                        snackBarSuccess: true,
                        snackBarMessage: 'Function: ' + func.name + ' deployed'
                    });
                } else {
                    self.setState({
                        snackBar: true,
                        snackBarSuccess: false,
                        snackBarMessage: response
                    });
                }
            })
    }

    componentDidMount() {
        this.getFunctionStore();
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={24} justify="center">
                    {this.state.functions.map(func => (
                        <Grid item sm={12} md={6} lg={4} xl={3} key={func.title}>
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
                                    <a href={func.repo_url} target="_blank">
                                        <Tooltip title="Source" placement="top" aria-label="source">
                                            <IconButton>
                                                <CodeIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </a>
                                    <Tooltip title="Deploy" placement="top" aria-label="deploy">
                                        <IconButton onClick={event => this.deployStoreFunction(event, func)}>
                                            <PlaylistAddIcon />
                                        </IconButton>
                                    </Tooltip>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.snackBar}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                >
                <SnackbarContent 
                    className={this.state.snackBarSuccess ? classes.snackSuccess : classes.snackError}
                    message={this.state.snackBarMessage}
                    />
                </Snackbar>
            </div>
        );
    }
}

FunctionStore.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FunctionStore);