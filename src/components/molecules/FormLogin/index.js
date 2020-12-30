// React Packages
import { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AppContext } from '../../../context/appContext'

// Components
import Button from '../../atoms/Button'
import Gap from '../../atoms/Gap'
import Input from '../../atoms/Input'

// API
import { API, setAuthToken } from '../../../config/api'

// CSS
import './FormLogin.css'

const FormLogin = () => {
  const [state, dispatch] = useContext(AppContext)
  const history = useHistory()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [invalidMessage, setInvalidMessage] = useState('')
  const [isLogin, setIsLogin] = useState(false)

  const { email, password } = formData

  const handleChangeText = (e) => {
    setInvalidMessage('')
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      setIsLogin(true)
      const body = JSON.stringify({ email, password })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const response = await API.post('/login', body, config)

      dispatch({
        type: 'LOGIN',
        payload: response.data.data.channel,
      })

      setAuthToken(response.data.data.channel.token)
      setIsLogin(false)
      history.push('/home')
    } catch (err) {
      console.log(err)
      setInvalidMessage(err.response.data.error.message)
      setIsLogin(false)
    }
  }

  return (
    <div className="login">
      <form>
        <h1 className="title">Sign In</h1>
        <div className="error-login">
          <span style={{ display: invalidMessage ? '' : 'none' }}>
            {invalidMessage}
          </span>
        </div>
        <Input
          id="email"
          onChange={handleChangeText}
          placeholder="Email"
          value={email}
          name="email"
          required
        />
        <Gap height={20} />
        <Input
          id="password"
          onChange={handleChangeText}
          placeholder="Password"
          type="password"
          value={password}
          name="password"
          required
        />
        <Gap height={10} />
        <div className="forgot-password">
          <Link to="/reset-password" className="link-reset-password">
            <span>Forgot your password?</span>
          </Link>
        </div>
        <Gap height={30} />
        <Button
          title="Sign In"
          onClick={handleLogin}
          isLoading={isLogin ? true : false}
          isDisabled={isLogin ? true : false}
        />
      </form>
    </div>
  )
}

export default FormLogin
