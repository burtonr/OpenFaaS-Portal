
// TODO move into a class and export methods to hide state
let refreshTime = 5*1000
let interval = null

let intervalCounter = 0

export function refreshFunctionList() {
  return dispatch => {
    dispatch({type:'FUNCTION_LIST_LOAD', status:'PENDING'})
    fetch('/system/functions',
    {
        method: "GET", 
        credentials: 'include'
    })
        .then(res => res.json())
        .then(response => {
            if (response) {
              dispatch({type:'FUNCTION_LIST_LOAD', status:'SUCCESS', functionList: response})
            }
        }).catch(error => {
          console.error(error)
          dispatch({type:'FUNCTION_LIST_LOAD', status:'FAILED', message: error.message})
        })
  }
}

export function startPollFunctions() {
  return dispatch => {

    intervalCounter++
    if(interval) return

    interval = setInterval(() => {
      refreshFunctionList()(dispatch)
    }, refreshTime);
    refreshFunctionList()(dispatch)

  }
}


// Do we need this and the counter? I added it because the pattern is simple enough. 
export function stopPollFunctions() {
  return () => {
    intervalCounter--

    if(intervalCounter) return

    clearInterval(interval)
  }
}