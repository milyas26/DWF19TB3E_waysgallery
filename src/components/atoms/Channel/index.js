// React Packages
import { Link, useHistory } from 'react-router-dom'

// Components
import Photo from '../Photo'

// CSS
import './Channel.css'

const Channel = ({ item, onClick }) => {
  const history = useHistory()

  const handleClick = () => {
    history.push(`/content-creator/${item && item.id}`)
    window.location.reload()
    // onClick()
  }

  return (
    <Link
      onClick={handleClick}
      to={`/content-creator/${item.id}`}
      className="link-channel"
    >
      <div className="channel-sidebar">
        <Photo className="img" src={item.photo} width={38} isCircle />
        <p>{item.channelName}</p>
      </div>
    </Link>
  )
}

export default Channel
