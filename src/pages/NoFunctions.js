import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import StyledClosableModal from '../Presentational/StyledClosableModal';
import NewFunctionForm from '../Presentational/NewFunctionForm';

class NoFunctions extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      newFunction:null
    }
  }

  startNewFunction() {
    this.setState({newFunction:{}})
  }

  closeNewFunction() {
    this.setState({newFunction:null})
  }

  deployNewFunction() {
    this.setState({newFunction:null})
  }

  handleFunctionChange(newFunction) {
    this.setState({newFunction})
  }
 
  render() {
     
    return (
        <Grid container justify="center" direction="column" alignItems="center">
            <p>
                You have no functions in OpenFaaS.
                <br />
                Start by deploying a new function.
            </p>
            <Button variant="contained" color="primary" onClick={this.startNewFunction.bind(this)}>
                Deploy New Function
            </Button>
            <p>
                Or use faas-cli to build and deploy functions:
            </p>
            <code>$ curl -sSl https://cli.openfaas.com | sudo sh</code>
            <StyledClosableModal 
              open={this.state.newFunction != null}
              handleClose={this.closeNewFunction.bind(this)}
              title={'Deploy New Function'}
              submitText={'Deploy'}
            >
                <NewFunctionForm 
                  function={this.state.function}
                  handleFunctionChange={this.handleFunctionChange.bind(this)}
                />
            </StyledClosableModal>
        </Grid>
    );   
  }
}

export default NoFunctions;