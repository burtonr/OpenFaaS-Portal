export function functionStoreReducer (state = {}, action) {

  if(action.type ==='STORE_LOAD') {
    if(action.status === 'SUCCESS' ) 
      return Object.assign({}, state, {list:action.storeList, status: action.status, error: null})

    if(action.status !== 'SUCCESS' ) 
      return Object.assign({}, state, {status: action.status, error: action.error})
  }
  return state
}