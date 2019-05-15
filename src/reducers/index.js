import { combineReducers } from 'redux'

import {functionStoreReducer, functionDeployReducer} from './functionStore'


export default combineReducers({functionStore: functionStoreReducer, functionDeploy: functionDeployReducer})

const emptyObject = {
  status: 'Initializing',
  cacheTime: Date.now() // TODO: Looking up best practice for this cache invalidation/reload
}

export const initialState = {
  functionStore: Object.assign({list:[{}]},emptyObject),
  metrics: Object.assign({list:[]},emptyObject)
}