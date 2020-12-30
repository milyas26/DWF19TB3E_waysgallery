// React Packages
import { Link, useHistory } from 'react-router-dom'

// Components
import Photo from '../../atoms/Photo'

// CSS
import './Profile.css'

const Profile = (props) => {
  const history = useHistory()

  const handleLoginFirst = () => {
    history.push('/')
  }

  const className = []
  if (props.state) className.push('button-subscribed')
  return (
    <div className="profile">
      <div className="user-profile">
        <Photo src={props.creator.photo} width={80} isCircle />
        <div className="channel-name">
          <h6>{props.creator.channelName}</h6>
          <p>{props.AllSubscribers} Subscribers</p>
        </div>
        {props.creator.id == localStorage.id ? (
          <div className="button-wrapper">
            <Link to={'/edit-channel'}>
              <button className="button btn-sm">Edit Channel</button>
            </Link>
          </div>
        ) : (
          <div className="button-wrapper">
            <Link to={props.to}>
              <button
                onClick={localStorage.id ? props.onClick : handleLoginFirst}
                className={['button btn-sm', className].join(' ')}
              >
                {props.title}
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
