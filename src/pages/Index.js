import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NoFunctions from "./NoFunctions";
import FunctionList from "./FunctionList";
import FunctionStore from "./FunctionStore";
import Layout from "../Presentational/Layout";

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';


import rootReducer, {initialState} from '../reducers/index.js'

const store = createStore(rootReducer, initialState, applyMiddleware(thunk))

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
    render() {
        return (
          <Provider store={store}>
            <Router>
                <Layout navItems={navItems} >
                    <Route path="/" exact component={NoFunctions} />
                    <Route path="/functions" exact component={FunctionList} />
                    <Route path="/store" exact component={FunctionStore} />
                </Layout>
            </Router>
          </Provider>
        );
    }
}


export default AppRouter;
