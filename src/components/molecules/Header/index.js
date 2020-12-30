// React Packages
import { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap'

// Context
import { AppContext } from '../../../context/appContext'

// Components
import Input from '../../atoms/Input'
import Button from '../../atoms/Button'
import Photo from '../../atoms/Photo'

// Assets
import addVideoLight from '../../../assets/icons/add_video_white.svg'
import addVideoActive from '../../../assets/icons/add_video_orange.svg'
import UserIcon from '../../../assets/icons/user_white.svg'
import LoginIcon from '../../../assets/icons/logout_white.svg'
import LogoutIcon from '../../../assets/icons/logout_red.svg'

// CSS
import './Header.css'

// API
import { API } from '../../../config/api'

const Header = ({ isAddVideo, onChange }) => {
  const [state, dispatch] = useContext(AppContext)
  const [user, setUser] = useState([])

  const fetchUser = async () => {
    try {
      const user = await API(`channel/${localStorage.id}`)

      setUser(user.data.data.channel)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const handleLogout = () => {
    dispatch({
      type: 'LOGOUT',
    })
  }
  return (
    <div className="header fixed-top">
      <div className="search">
        <Input placeholder="Search ..." height={40} onChange={onChange} />
      </div>
      {localStorage.id ? (
        <div className="user">
          <Link to="/add-video" className="link-add-video">
            <Button
              type="add"
              icon={isAddVideo ? addVideoActive : addVideoLight}
              title="Add Video"
              isAddVideo={isAddVideo}
            />
          </Link>

          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" className="dropdown-toggle">
              <Photo src={localStorage.id && user.photo} width={38} isCircle />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/my-channel">
                <div className="icon">
                  <i class="fas fa-user"></i>
                </div>
                <div className="label">
                  <span>My Channel</span>
                </div>
              </Dropdown.Item>

              <Dropdown.Item as={Link} to="/watch-later">
                <div className="icon">
                  <i class="fas fa-list"></i>
                </div>
                <div className="label">
                  <span>Watch Later</span>
                </div>
              </Dropdown.Item>

              <Dropdown.Item as={Link} to={'/home'} onClick={handleLogout}>
                <i
                  class="fas fa-sign-out-alt"
                  style={{
                    color: 'red',
                    fontWeight: '600',
                  }}
                ></i>
                <span
                  style={{
                    color: 'red',
                    fontWeight: '600',
                  }}
                >
                  Logout
                </span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ) : (
        <Link to="/" className="login-button-link">
          <div className="login-button">
            <img src={LoginIcon} />
            <h6>Login</h6>
          </div>
        </Link>
      )}
    </div>
  )
}

export default Header
