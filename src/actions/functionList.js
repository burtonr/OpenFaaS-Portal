
// TODO move into a class and export methods to hide state
let refreshTime = 5*1000
let interval = null

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

    if (interval) return

    interval = setInterval(() => {
      refreshFunctionList()(dispatch)
    }, refreshTime);
    refreshFunctionList()(dispatch)

  }
}

export function stopPollFunctions() {
  return dispatch => {
    if (!interval) return

    clearInterval(interval)
    interval = null
  }
}

