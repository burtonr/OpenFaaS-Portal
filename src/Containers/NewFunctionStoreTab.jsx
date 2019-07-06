import React from 'react'
import {connect} from 'react-redux'
import { withStyles } from '@material-ui/core/styles';

import { loadStoreFunctions, deployStoreFunction } from '../actions/functionStore'
import { List, ListItem, ListItemAvatar, Avatar } from '@material-ui/core';

const styles = theme => ({
  
})

class NewFunctionStoreTab extends React.Component{


  //This should probably actually turn into "requestFunctionStoreLoad" and be lazy loaded
  componentDidMount() {
    this.props.loadStoreFunctions()
  }

  render() {
    return (
      <div>
        <List>
          {this.renderSearchLine()}
          {this.renderFilteredStore()}
        </List>
      </div>
    )
  }

  renderSearchLine() {
    return <ListItem>Search</ListItem>
  }

  filterFunc(func) {
    console.log(func)
    return true
  }

  renderFilteredStore() {
    return this.props.functions
      .filter(this.filterFunc.bind(this))
      .map(this.renderFunctionLine.bind(this))
  }

  renderFunctionLine(func, idx) {
    return (
      <ListItem>
        <ListItemAvatar >
          <Avatar src={func.icon}/>
        </ListItemAvatar>
        {func.title || 'func'}
      </ListItem>
    )
  }
}

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
)(withStyles(styles)(NewFunctionStoreTab))