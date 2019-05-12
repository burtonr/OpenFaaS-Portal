import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NoFunctions from "./NoFunctions";
import FunctionList from "./FunctionList";
import FunctionStore from "./FunctionStore";
import Layout from "../Presentational/Layout";

const navItems = [
    {
        to: '/functions',
        text: 'Functions'
    },
    {
        to: '/store',
        text: 'Store'
    },
    {
        to: '/metrics',
        text: 'Metrics'
    },
]
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
                <Layout navItems={navItems} >
                    <Route path="/" exact component={NoFunctions} />
                    <Route path="/functions" exact component={FunctionList} />
                    <Route path="/store" exact component={FunctionStore} />
                </Layout>
            </Router>
        );
    }
}


export default AppRouter;
