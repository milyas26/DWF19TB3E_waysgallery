// React Packages
import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'

// Components
import Input from '../../atoms/Input'
import Gap from '../../atoms/Gap'
import Button from '../../atoms/Button'

// CSS
import './FormRegister.css'
import { AppContext } from '../../../context/appContext'
import { API, setAuthToken } from '../../../config/api'

const FormRegister = (props) => {
  const [state, dispatch] = useContext(AppContext)
  const [invalidMessage, setInvalidMessage] = useState('')
  const history = useHistory()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
  })

  const { email, password, fullName } = formData

  const handleChangeText = (e) => {
    setInvalidMessage('')
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    try {
      const body = JSON.stringify({ email, password, fullName })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const response = await API.post('/register', body, config)
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
    <div className="register">
      <form>
        <h1 className="title">Register</h1>
        <div className="error-register">
          <span style={{ display: invalidMessage ? '' : 'none' }}>
            {invalidMessage} <i className="fas fa-times"></i>
          </span>
        </div>
        <Input
          id="email"
          placeholder="Email"
          name="email"
          onChange={handleChangeText}
          value={email}
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
        <Gap height={20} />
        <Input
          id="fullName"
          placeholder="Full Name"
          name="fullName"
          value={fullName}
          onChange={handleChangeText}
        />
        <Gap height={30} />
        <Button
          title="Sign Up"
          width="100%"
          fontColor="#fff"
          padding="10px 0"
          fontSize="20px"
          onClick={handleRegister}
        />
        <Gap height={10} />
        <p style={{ textAlign: 'left' }}>
          Already have an account? Click{' '}
          <strong onClick={props.onClickLogin} style={{ cursor: 'pointer' }}>
            Here
          </strong>{' '}
        </p>
      </form>
    </div>
  )
}

export default FormRegister
