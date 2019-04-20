import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FormatListBulleted from '@material-ui/icons/FormatListBulleted';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import ShowChart from '@material-ui/icons/ShowChart';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import NoFunctions from "./NoFunctions";
import { Avatar } from "@material-ui/core";
import ofIcon from '../static/images/icon.png';
import FunctionList from "./FunctionList";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
        display: 'contents',
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },
    chartContainer: {
        marginLeft: -22,
    },
    tableContainer: {
        height: 320,
    },
    h5: {
        marginBottom: theme.spacing.unit * 2,
    },
    ofLogo: {
        height: 50,
        paddingRight: 10,
    },
});

class AppRouter extends React.Component {
    state = {
        open: true,
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        return (
            <Router>
                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar
                        position="absolute"
                        className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
                    >
                        <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.handleDrawerOpen}
                                className={classNames(
                                    classes.menuButton,
                                    this.state.open && classes.menuButtonHidden,
                                )}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                component={Link} to="/"
                                variant="h6"
                                color="inherit"
                                noWrap
                                className={classes.title}
                            >
                                <Avatar alt="OpenFaaS Logo" src={ofIcon} className={classNames(classes.ofLogo)} />  
                                OpenFaaS Portal
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                        classes={{
                            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                        }}
                        open={this.state.open}
                    >
                        <div className={classes.toolbarIcon}>
                            <IconButton onClick={this.handleDrawerClose}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </div>
                        <Divider />
                        <List>
                            <div>
                                <ListItem button key="Functions" component={Link} to="/functions">
                                <ListItemIcon>
                                    <FormatListBulleted />
                                </ListItemIcon>
                                <ListItemText primary="Functions" />
                                </ListItem>
                                <ListItem button>
                                <ListItemIcon>
                                    <AddShoppingCart />
                                </ListItemIcon>
                                <ListItemText primary="Store" />
                                </ListItem>
                                <ListItem button>
                                <ListItemIcon>
                                    <ShowChart />
                                </ListItemIcon>
                                <ListItemText primary="Metrics" />
                                </ListItem>
                            </div>
                        </List>
                    </Drawer>
                    <main className={classes.content}>
                        <div className={classes.appBarSpacer} />
                        <Route path="/" exact component={NoFunctions} />
                        <Route path="/functions" exact component={FunctionList} />
                    </main>
                </div>
            </Router>
        );
    }
}

AppRouter.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppRouter);
