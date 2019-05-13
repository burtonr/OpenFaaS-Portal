const initial = {
  list:[],
  status: 'Initializing',
  cacheTime: Date.now() // TODO: Looking up best practice for this cache invalidation/reload
}

export default function functionStoreReducer (state = initial, action) {
  return state
}