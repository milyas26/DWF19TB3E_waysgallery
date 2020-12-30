import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useEffect, useContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AppContext } from '../context/appContext'
import PrivateRoute from '../components/Routes/privateRoute'
import HomePage from './Homepage'
import Landing from './Landing'
import SubscribedPage from './SubscribtionPage'
import MyChannelPage from './MyChannelPage'
import DetailVideoPage from './DetailVideoPage'
import ContentCreatorPage from './ContentCreatorPage'
import AddVideo from './AddVideoPage'
import EditChannel from './EditChannel'
import notFound from './404'
import ChannelsPage from './ChannelsPage'
import WatchLaterPage from './WatchLaterPage'
import EditVideoPage from './EditVideoPage'
import ForgotPassword from './ForgotPasswordPage'
import { API, setAuthToken } from '../config/api'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  const [state, dispatch] = useContext(AppContext)

  const loadUser = async () => {
    try {
      const response = await API('/check-auth')

      dispatch({
        type: 'USER_LOADED',
        payload: response.data.data.channel,
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
          <Route exact path="/home" component={HomePage} />
          <PrivateRoute exact path="/subscribed" component={SubscribedPage} />
          <PrivateRoute exact path="/my-channel" component={MyChannelPage} />
          <Route exact path="/detail-video/:id" component={DetailVideoPage} />
          <Route
            exact
            path="/content-creator/:id"
            component={ContentCreatorPage}
          />
          <PrivateRoute exact path="/add-video" component={AddVideo} />
          <PrivateRoute
            exact
            path="/edit-video/:id"
            component={EditVideoPage}
          />
          <PrivateRoute exact path="/edit-channel" component={EditChannel} />
          <PrivateRoute exact path="/watch-later" component={WatchLaterPage} />
          <Route exact path="/channels" component={ChannelsPage} />
          <Route exact path="/reset-password" component={ForgotPassword} />
          <Route component={notFound} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
