//TODO: proxy this through the API?
const storeUrl = 'https://raw.githubusercontent.com/openfaas/store/master/functions.json';

//TODO memoize? Does this need to be loaded every component load or just ever page load?
export function loadStoreFunctions() {
  return dispatch => {
    dispatch({type:'STORE_LOAD', status:'PENDING'})

    fetch(storeUrl)
        .then(res => res.json())
        .then(response => {
            if (response && response.functions) {
                dispatch({type:'STORE_LOAD', status:'SUCCESS', storeList: response.functions})
            }
        }).catch(error => {
          console.error(error)
          dispatch({type:'STORE_LOAD', status:'FAILED', error})
        })
  }
}


export function deployStoreFunction(event, func) {
  return dispatch => {

    dispatch({
      type: 'FUNCTION_DEPLOY',
      status: 'PENDING',
      functionName:func.name
    })

    //TODO: x86 only?
    let postData = {
        image: func.images['x86_64'],
        service: func.name
    }

    let options = {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(postData)
    };

    fetch('/system/functions', options)
      .then(res => res.text())
      .then(response => {
          if (response === '') {
            dispatch({
              type: 'FUNCTION_DEPLOY',
              status: 'SUCCESS',
              functionName: func.name,
              message: 'Function '+ func.name + ' deployed!'
            })
          } else {
            dispatch({
              type: 'FUNCTION_DEPLOY',
              status: 'FAILED',
              error: response,
              functionName: func.name
            })
          }
      }).catch(error => {
        dispatch({
          type: 'FUNCTION_DEPLOY',
          status: 'FAILED',
          error: error.message,
          functionName: func.name
        })
      })
  }
}