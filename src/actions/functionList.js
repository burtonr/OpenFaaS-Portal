//TODO: I don't like the filename... to many files with the same name

//TODO memoize? Does this need to be loaded every component load or just ever page load?
export function loadFunctionList() {
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
          dispatch({type:'FUNCTION_LIST_LOAD', status:'FAILED', error})
        })
  }
}

