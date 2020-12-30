import { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../components/atoms/Button'
import Gap from '../../components/atoms/Gap'
import Input from '../../components/atoms/Input'
import { API, setAuthToken } from '../../config/api'
import { AppContext } from '../../context/appContext'
import './ForgotPassword.css'

const ForgotPassword = () => {
  const [isContinue, setIsContinue] = useState(false)
  const [channels, setChannels] = useState([])
  const history = useHistory()
  const [successMessage, setSuccessMessage] = useState(false)
  const [errorEmail, setErrorEmail] = useState(false)
  const [state, dispatch] = useContext(AppContext)

  const fetchChannel = async () => {
    try {
      const response = await API('/channels')

      setChannels(response.data.data.channels)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchChannel()
  }, [])

  //   EDIT PASSWORD
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const handleChangeText = (e) => {
    setErrorEmail(false)
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  let thisUser = ''
  const id = thisUser.id
  const handleContinue = (e) => {
    e.preventDefault()
    for (let i = 0; i < channels.length; i++) {
      if (channels[i].email === email) {
        thisUser = channels[i]
      }
    }
    thisUser.email === email ? setIsContinue(true) : setErrorEmail(true)
  }

  const updatePassword = async (e) => {
    e.preventDefault()
    const body = JSON.stringify({ email, password })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      const response = await API.patch(`/channel/${id}`, body, config)
      dispatch({
        type: 'LOGIN',
        payload: response.data.data.channel,
      })
      
      setAuthToken(response.data.data.channel.token)

      setSuccessMessage(true)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="reset">
      <div
        className="reset-password"
        style={{ display: successMessage ? 'none' : '' }}
      >
        <form>
          <h1 className="title">Reset Password</h1>
          <span
            style={{
              display: errorEmail ? '' : 'none',
              position: 'absolute',
              color: 'red',
              top: 85,
            }}
          >
            Email anda salah!
          </span>
          <div className="input-email">
            <Input
              id="email"
              placeholder="Input your email"
              name="email"
              value={email}
              onChange={handleChangeText}
              required
            />
            <Gap height={20} />
          </div>
          <div style={{ display: isContinue ? 'none' : '' }}>
            <Button title="Continue" onClick={handleContinue} />
          </div>
          <div
            className="input-password"
            style={{ display: isContinue ? '' : 'none' }}
          >
            <Input
              id="password"
              placeholder="Your new password"
              type="password"
              name="password"
              value={password}
              onChange={handleChangeText}
            />
            <Gap height={20} />
          </div>
          <div
            className="input-confirm-password"
            style={{ display: isContinue ? '' : 'none' }}
          >
            <Input
              id="confirmPassword"
              placeholder="Confirm new password"
              type="confirmPassword"
              name="confirmPassword"
            />
            <Gap height={30} />
          </div>
          <div
            className="button-reset"
            style={{ display: isContinue ? '' : 'none' }}
          >
            <Button title="Reset" onClick={updatePassword} />
          </div>
        </form>
      </div>
      <div
        className="success-message"
        style={{ display: successMessage ? '' : 'none' }}
      >
        <span>Changed Password Successfully</span>
        <Gap height={20} />
        <Button
          title="Bring me to Home"
          onClick={() => history.push('/home')}
        />
      </div>
    </div>
  )
}

export default ForgotPassword
