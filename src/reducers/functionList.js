// Should and action be on the list

export function functionListReducer (state = {}, action) {

  if(action.type ==='FUNCTION_LIST_LOAD' & action.status === 'SUCCESS' ) 
    return Object.assign({}, state, { list: action.functionList, status: action.status })

  if(action.type ==='FUNCTION_LIST_LOAD' & action.status !== 'SUCCESS' ) 
    return Object.assign({}, state, { status: action.status })


  if(action.type ==='FUNCTION_ADDED' & action.status !== 'SUCCESS' ) 
    return Object.assign({}, state, { list:[ {name:'NEW'}, ...state.list], status: action.status })
  
  return state
}