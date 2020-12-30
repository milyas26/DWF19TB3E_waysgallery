// React Packages
import { useContext, useState } from 'react'

// Components
import Input from '../../atoms/Input'
import Gap from '../../atoms/Gap'
import Button from '../../atoms/Button'
import TextArea from '../../atoms/TextArea'

// CSS
import './FormRegister.css'
import { AppContext } from '../../../context/appContext'
import { useHistory } from 'react-router-dom'
import { API, setAuthToken } from '../../../config/api'

const FormRegister = (props) => {
  const [state, dispatch] = useContext(AppContext)
  const history = useHistory()
  const [invalidMessage, setInvalidMessage] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    channelName: '',
    description: '',
  })
  const [isRegister, setIsRegister] = useState(false)

  const { email, password, channelName, description } = formData

  const handleChangeText = (e) => {
    setInvalidMessage('')
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    try {
      setIsRegister(true)
      const body = JSON.stringify({ email, password, channelName, description })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const response = await API.post('/register', body, config)

      dispatch({
        type: 'LOGIN',
        payload: response.data.data.channel,
      })

      setAuthToken(response.data.data.channel.token)
      setIsRegister(false)
      history.push('/home')
    } catch (err) {
      console.log(err)
      setInvalidMessage(err.response.data.error.message)
      setIsRegister(false)
    }
  }

  return (
    <div className="register">
      <form>
        <h1 className="title">Sign Up</h1>
        <div className="error-register">
          <span style={{ display: invalidMessage ? '' : 'none' }}>
            {invalidMessage} <i className="fas fa-times"></i>
          </span>
        </div>
        <Input
          id="email"
          onChange={handleChangeText}
          placeholder="Email"
          name="email"
          value={email}
        />
        <Gap height={20} />
        <Input
          id="password"
          onChange={handleChangeText}
          placeholder="Password"
          type="password"
          name="password"
          value={password}
        />
        <Gap height={20} />
        <Input
          id="namaChannel"
          onChange={handleChangeText}
          placeholder="Name Channel"
          name="channelName"
          value={channelName}
        />
        <Gap height={20} />
        <TextArea
          id="descriptionChannel"
          onChange={handleChangeText}
          placeholder="Description Channel"
          name="description"
          value={description}
        />
        <Gap height={30} />
        <Button
          title="Sign Up"
          onClick={handleRegister}
          isLoading={isRegister ? true : false}
          isDisabled={isRegister ? true : false}
        />
      </form>
    </div>
  )
}

export default FormRegister
