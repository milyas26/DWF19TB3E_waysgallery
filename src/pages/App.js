import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useEffect, useContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import notFound from '../pages/404'
import Landing from '../pages/Landing'
import Home from '../pages/Home'
import Following from '../pages/Following'
import Profile from '../pages/Profile'
import Order from '../pages/Order'
import Offer from '../pages/Offer'
import Upload from '../pages/Upload'
import Hire from '../pages/Hire'
import DetailPost from '../pages/DetailPost'
import DetailUser from '../pages/DetailUser'
import DetailArt from '../pages/DetailArt'
import EditProfile from '../pages/EditProfile'
import SendProject from '../pages/SendProject'
import ViewProject from '../pages/ViewProject'
import { API, setAuthToken } from '../config/api'
import { AppContext } from '../context/appContext'
import PrivateRoute from '../components/Routes/privateRoute'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  const [state, dispatch] = useContext(AppContext)

  const loadUser = async () => {
    try {
      const response = await API('/check-auth')

      dispatch({
        type: 'USER_LOADED',
        payload: response.data.data.user,
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    loadUser()
  }, [])
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/home" component={Home} />
          <PrivateRoute exact path="/following" component={Following} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/order" component={Order} />
          <PrivateRoute exact path="/offer" component={Offer} />
          <PrivateRoute exact path="/upload" component={Upload} />
          <PrivateRoute
            exact
            path="/send-project/:id"
            component={SendProject}
          />
          <PrivateRoute
            exact
            path="/view-project/:id"
            component={ViewProject}
          />
          <PrivateRoute exact path="/hire/:id" component={Hire} />
          <Route exact path="/detail-post/:id" component={DetailPost} />
          <Route exact path="/detail-user/:id" component={DetailUser} />
          <Route exact path="/detail-art/:id" component={DetailArt} />
          <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          <Route component={notFound} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
