export function functionStoreReducer (state = {}, action) {

  if(action.type ==='STORE_LOAD') {
    if(action.status === 'SUCCESS' ) 
      return Object.assign({}, state, {list:action.storeList, status: action.status, error: null})

    if(action.status !== 'SUCCESS' ) 
      return Object.assign({}, state, {status: action.status, error: action.error})
  }
  return state
}


// TODO: move status to a global "status" reducer instead of deploy action. 
// This current method will get hard to rationalize quickly
export function functionDeployReducer (state = {}, action) {

  if(action.type ==='FUNCTION_DEPLOY'){ 
    if(action.status === 'SUCCESS' ) 
      return Object.assign({}, state, {status: action.status, error: null, message: 'Function: ' + action.functionName + ' deployed'})


    if(action.status !== 'SUCCESS' ) 
      return Object.assign({}, state, {status: action.status, error: action.error, message: null})
  }
  return state
}