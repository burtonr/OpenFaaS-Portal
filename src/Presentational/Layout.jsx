import React from "react";
import { Link } from "react-router-dom";
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
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Avatar } from "@material-ui/core";
import ofIcon from '../static/images/icon.png';
import EventSnackBar from "../Containers/EventSnackBar";


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



class Layout extends React.Component {
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

                {this.renderNav()}

            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                {this.props.children}
            </main>
            <EventSnackBar />
        </div>
      );
  }

  // Splitting out to render each item
  renderNavItem({to, text},idx) {

    //TODO: Do we need links that don't have `component={Link}` ?

    return (
      <ListItem button key={'link-'+idx} component={Link} to={to}>
        <ListItemIcon>
          <FormatListBulleted />
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    )
  }

  renderNav() {

    return (
      <List>
        <div>
          { this.props.navItems.map(this.renderNavItem.bind(this)) }
        </div>
    </List>
  )

  }
}

export default withStyles(styles)(Layout);
