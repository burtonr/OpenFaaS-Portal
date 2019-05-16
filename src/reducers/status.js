// This holds a queue for any status messages that the user is concerned about

/** Each Event will have
 * 
 *   {
 *     time: moment.now(),
 *     status: enum( SUCCESS, PENDING, FAILED )
 *     message: String
 *     source: action.type
 *   }
 * 
 *  */ 

import moment from 'moment'

function addEvent(oldState, status, message, source) {

  return [...oldState, {
    time: moment(),
    status,
    message,
    source
  }]
}

function statusFilter(event) {
  return event.time.isAfter(moment('30 seconds ago'))
}

export function statusQueueReducer (state = [], action) {

  // Trim all events up until certain time ago
  if(action.type === 'TRIM_EVENT_TIMER')
    return state.filter(statusFilter)

  if(action.type === 'REMOVE_EVENT')
    return state.splice(action.idx + 1, 1)
  
  // TODO: Should we show everything? Or just failed? Or any event with 'messages'
  if(action.status === 'FAILED')
    return addEvent(state, action.status, action.message || action.error, action.type)

  return state
}