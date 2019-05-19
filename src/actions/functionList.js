//TODO: I don't like the filename... to many files with the same name


// TODO move into a class and export methods to hide state
let refreshTime = 350000
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
            if (response && response.functions) {
              dispatch({type:'FUNCTION_LIST_LOAD', status:'SUCCESS', storeList: response.functions})
            }
        }).catch(error => {
          console.error(error)
          dispatch({type:'FUNCTION_LIST_LOAD', status:'FAILED', message: error.message})
        })
  }
}


// TODO: Switch to timer to allow flexible timeouts?
// As is, the timer can't change if we add a way to change it for the user.
export function startPollFunctions() {
  return dispatch => {
    intervalCounter++

    if(interval) return

    interval = setInterval(() => {
      dispatch(refreshFunctionList)
    }, refreshTime);
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