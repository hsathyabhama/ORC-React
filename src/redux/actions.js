//mainPage
export const navigateMainPage = data => ({
  type: 'NAVIGATE_MAIN_PAGE',
  payload: data
})
//appState
export const updateAppState = path => ({
  type: 'UPDATE_APP_STATE',
  payload: path
})
// userName
export const updateUserName = data => ({
  type: 'USER_NAME',
  payload: data
})
export const updateUserParameter = userParams => ({
  type: 'UPDATE_USER_PARAMETER',
  payload: userParams
})

export const updateReportData = data => ({
  type: 'UPDATE_REPORT_DATA',
  payload: data
})
//chartData
export const updateChartData = data => ({
  type: 'CHART_DATA',
  payload: data
})
//paramConfig
export const updateParamConfig = data => ({
  type: 'PARAM_CONFIG',
  payload: data
})
//graphLimit
export const updategraphLimit = data => ({
  type: 'GRAPH_LIMIT',
  payload: data
})