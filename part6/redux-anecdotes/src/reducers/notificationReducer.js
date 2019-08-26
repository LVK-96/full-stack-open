const initialState = null

export const setNotification = (msg) => {
  return {
    type: 'SET_NOTIFICATION',
    msg: msg
  }
}

export const removeNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION'
  }
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.msg

    case 'HIDE_NOTIFICATION':
      return initialState
    
    default:
      return state
  }
}

export default notificationReducer
