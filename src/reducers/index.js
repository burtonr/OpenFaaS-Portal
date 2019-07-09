import { combineReducers } from 'redux'

import {functionStoreReducer} from './functionStore'
import {functionListReducer} from './functionList'
import {statusQueueReducer} from './status'


export default combineReducers({
  functionStore: functionStoreReducer, 
  functionList: functionListReducer,
  statusList:statusQueueReducer
})

const emptyObject = {
  status: 'Initializing',
  cacheTime: Date.now() // TODO: Looking up best practice for this cache invalidation/reload
}

export const initialState = {
  functionStore: Object.assign({list:[{}]},emptyObject),
  functionList: Object.assign({list:[]},emptyObject),
  statusList: []
}