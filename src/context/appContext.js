// React Packages
import { createContext, useReducer } from 'react'

export const AppContext = createContext()

const initialState = {
  isLogin: false,
  isLoading: true,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'USER_LOADED':
      return {
        ...state,
        isLogin: true,
        isLoading: false,
      }
    case 'LOGIN':
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('id', action.payload.id)
      return {
        ...state,
        isLogin: true,
        isLoading: false,
      }
    case 'LOGOUT':
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      return {
        ...state,
        isLogin: false,
      }

    default:
      throw new Error()
  }
}

export const AppContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {props.children}
    </AppContext.Provider>
  )
}
