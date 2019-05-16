import { combineReducers } from 'redux'

import {functionStoreReducer, functionDeployReducer} from './functionStore'
import {functionListReducer} from './functionList'


export default combineReducers({
  functionStore: functionStoreReducer, 
  functionDeploy: functionDeployReducer,
  functionList: functionListReducer
})

const emptyObject = {
  status: 'Initializing',
  cacheTime: Date.now() // TODO: Looking up best practice for this cache invalidation/reload
}

export const initialState = {
  functionStore: Object.assign({list:[{}]},emptyObject),
  functionList: Object.assign({list:[]},emptyObject)
}