import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

function NoFunctions() {
    return (
        <Grid container justify="center" direction="column" alignItems="center">
            <p>
                You have no functions in OpenFaaS.
                <br />
                Start by deploying a new function.
            </p>
            <Button variant="contained" color="primary">
                Deploy New Function
            </Button>
            <p>
                Or use faas-cli to build and deploy functions:
            </p>
            <code>$ curl -sSl https://cli.openfaas.com | sudo sh</code>
        </Grid>
    );
}

export default NoFunctions;