import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { API, setAuthToken } from '../../../config/api'
import { AppContext } from '../../../context/appContext'
import Button from '../../atoms/Button'
import Gap from '../../atoms/Gap'
import Input from '../../atoms/Input'
import './FormLogin.css'

const FormLogin = (props) => {
  const [state, dispatch] = useContext(AppContext)
  const history = useHistory()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [invalidMessage, setInvalidMessage] = useState('')

  const { email, password } = formData

  const handleChangeText = (e) => {
    setInvalidMessage('')
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const body = JSON.stringify({ email, password })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const response = await API.post('/login', body, config)
      dispatch({
        type: 'LOGIN',
        payload: response.data.data.user,
      })

      setAuthToken(response.data.data.user.token)

      history.push('/home')
    } catch (err) {
      console.log(err)
      setInvalidMessage(err.response.data.error.message)
    }
  }

  return (
    <div className="login">
      <form>
        <h1 className="title">Login</h1>
        <div className="error-login">
          <span style={{ display: invalidMessage ? '' : 'none' }}>
            {invalidMessage}
          </span>
        </div>
        <Input
          id="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChangeText}
        />
        <Gap height={20} />
        <Input
          id="password"
          placeholder="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleChangeText}
        />
        <Gap height={30} />
        <Button
          title="Login"
          width="100%"
          fontColor="#fff"
          padding="10px 0"
          fontSize="20px"
          onClick={handleLogin}
        />
        <Gap height={10} />
        <p style={{ textAlign: 'left' }}>
          Don't have an account? Click{' '}
          <strong onClick={props.onClickRegister} style={{ cursor: 'pointer' }}>
            Here
          </strong>{' '}
        </p>
      </form>
    </div>
  )
}

export default FormLogin
