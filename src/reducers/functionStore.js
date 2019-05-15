export default function functionStoreReducer (state = {}, action) {

  if(action.type=='STORE_LOAD' & action.status =='SUCCESS' ) 
    return Object.assign({}, state, {list:action.storeList, status: action.status})


  if(action.type=='STORE_LOAD' & action.status !='SUCCESS' ) 
    return Object.assign({}, state, {status: action.status})
  
  return state
}