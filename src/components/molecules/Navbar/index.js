import { useContext, useState } from 'react'
import Logo from '../../../assets/Illustrations/Logo.png'
import LoginIcon from '../../../assets/icons/logout_white.svg'
import Button from '../../atoms/Button'
import { AppContext } from '../../../context/appContext'
import './Navbar.css'
import { Link, useHistory } from 'react-router-dom'
import Photo from '../../atoms/Photo'

const Navbar = () => {
  const [state, dispatch] = useContext(AppContext)
  let [showDropdown, setShowDropdown] = useState(false)
  const history = useHistory()

  const handleDropdown = () => {
    setShowDropdown((showDropdown = !showDropdown))
  }

  const handleLogout = () => {
    dispatch({
      type: 'LOGOUT',
    })
    setShowDropdown((showDropdown = !showDropdown))
  }

  // Fetch User
  // const fetchUser = async () => {
  //   try {
  //     const user = await API(`user/${localStorage.id}`)

  //     setUser(user.data.data)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // useEffect(() => {
  //   fetchUser()
  // }, [])

  return (
    <div className="header">
      <div className="logo">
        <img src={Logo} alt="logo" onClick={() => history.push('/home')} />
      </div>

      {localStorage.id ? (
        <div className="right-header">
          <div className="img">
            <Button title="Upload" onClick={() => history.push('/upload')} />
            <div onClick={handleDropdown}>
              <Photo src={localStorage && localStorage.avatar} />
            </div>
          </div>
        </div>
      ) : (
        <Link to="/" className="login-button-link">
          <div className="login-button">
            <i className="fa fa-user"></i>
            <h6>Login</h6>
          </div>
        </Link>
      )}

      {/* MODAL USER */}
      <div
        className="dropdown-user"
        style={{ display: showDropdown ? '' : 'none' }}
      >
        <span onClick={() => history.push('/profile')}>
          <i className="fa fa-user"></i> Profile
        </span>
        <span onClick={() => history.push('/order')}>
          <i className="fa fa-receipt"></i> Order
        </span>
        <span onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </span>
      </div>
    </div>
  )
}

export default Navbar
