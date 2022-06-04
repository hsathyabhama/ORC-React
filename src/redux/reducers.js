import InitialState from "./store"

const appReducer = (state = InitialState, action) => {
  const newState = {}
  Object.assign(newState, state)
  switch (action.type) {
    case 'NAVIGATE_MAIN_PAGE':
      newState.mainPage = action.payload ? action.payload : "dashboardPage"
      return newState
    //appState
    case 'UPDATE_APP_STATE':
      newState.appState = action.payload ? action.payload : 'login'
      return newState
    //userName
    case 'USER_NAME':
      newState.userName = action.payload ? action.payload : []
      return newState
    //userParams
    case 'UPDATE_USER_PARAMETER':
      newState.userParams =  action.payload
      return newState
    //reportData  
    case 'UPDATE_REPORT_DATA':
      newState.reportData = action.payload
      return newState
    //chartData    
    case 'CHART_DATA':
      newState.chartData = action.payload
      return newState
    //paramConfig
    case 'PARAM_CONFIG':
      newState.paramConfig = action.payload 
      return newState      
    //graphLimit
    case 'GRAPH_LIMIT':
      newState.graphLimit = action.payload 
      return newState
    default:
      return newState
  }
}

export default appReducer