// React Packages
import { Route, Redirect } from 'react-router-dom'
import { useContext } from 'react'

// Context
import { AppContext } from '../../context/appContext'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [state] = useContext(AppContext)
  const { isLogin } = state

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  )
}

export default PrivateRoute
