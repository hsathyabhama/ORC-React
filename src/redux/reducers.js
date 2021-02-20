import InitialState from "./store"

const appReducer = (state = InitialState, action) => {
  const newState = {}
  Object.assign(newState, state)
  switch (action.type) {
    case 'UPDATE_USER_PARAMETER':
      newState.userParams =  action.payload
      return newState
    case 'UPDATE_REPORT_DATA':
      newState.reportData = action.data
      return newState
    default:
      return newState
  }
}

export default appReducer