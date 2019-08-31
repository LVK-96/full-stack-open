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

export const showNotificationWithTimeout = (msg, time = 5) => {
  return dispatch => {
    dispatch(setNotification(msg))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 1000*time)
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
