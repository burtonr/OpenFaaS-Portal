//TODO: I don't like the filename... to many files with the same name

const storeUrl = 'https://raw.githubusercontent.com/openfaas/store/master/functions.json';

export function loadStore() {
  return dispatch => {
    dispatch({type:'STORE_LOAD', status:'PENDING'})
    fetch(storeUrl)
        .then(res => res.json())
        .then(response => {
            if (response && response.functions) {
                dispatch({type:'STORE_LOAD', status:'SUCCESS', storeList: response.functions})
            }
        })
  }
}