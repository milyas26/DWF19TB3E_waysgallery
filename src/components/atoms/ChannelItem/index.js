// React Packages
import { Link, useHistory } from 'react-router-dom'

// Components
import Photo from '../Photo'

// CSS
import './ChannelItem.css'

const Channel = ({ item }) => {
  const history = useHistory()

  const handleClick = () => {
    history.push(`/content-creator/${item.id}`)
  }

  return (
    <Link
      onClick={handleClick}
      to={`/content-creator/${item.id}`}
      className="link-channel"
    >
      <div className="wrapper-channel-item">
        <Photo src={item.photo} isCircle width={50} />
        <div className="items">
          <div className="channel-items">
            <p>{item.channelName}</p>
          </div>
          <div className="stats">
            <p>{item.subscriber.length} Subscribers</p>
            <p>{item.videos.length} Videos</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Channel
