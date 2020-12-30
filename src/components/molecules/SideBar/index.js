// React Packages
import { Link, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'

// API
import { API } from '../../../config/api'

// Components
import Channel from '../../../components/atoms/Channel'
import SidebarMenu from '../../atoms/SidebarMenu'

// Assets
import brandIcon from '../../../assets/icons/brandIcon.svg'
import homeIconActive from '../../../assets/icons/home_orange.svg'
import homeInActive from '../../../assets/icons/home_white.svg'
import subscriptionIconInActive from '../../../assets/icons/subscription_white.svg'
import subscriptionIconActive from '../../../assets/icons/subscription_orange.svg'
import allChannelsActive from '../../../assets/icons/all-channels-active.png'
import allChannelsInActive from '../../../assets/icons/all-channels-inactive.png'

// CSS
import './Sidebar.css'

const SideBar = ({
  isHome,
  isSubscribed,
  isAllChannels,
  updateSubscription,
  subscriptions,
  onClick,
}) => {
  const subscription = subscriptions
  const newChannel = subscription.slice(0, 4)
  const [isShowMore, setIsShowMore] = useState(false)
  const channels = isShowMore ? subscriptions : newChannel
  const history = useHistory()

  const fetchChannel = async () => {
    try {
      updateSubscription()
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchChannel()
  }, [])

  const handleClick = () => {
    localStorage.id ? setIsShowMore(!isShowMore) : history.push('/')
  }

  return (
    <div className="sidebar-wrapper ">
      <Link to="/home">
        <img className="icon" src={brandIcon} alt="Brand Icon" />
      </Link>
      <SidebarMenu
        to="/home"
        icon={isHome ? homeIconActive : homeInActive}
        isActive={isHome ? true : false}
        label="Home"
      />
      <SidebarMenu
        to="/subscribed"
        icon={isSubscribed ? subscriptionIconActive : subscriptionIconInActive}
        isActive={isSubscribed ? true : false}
        label="Subscription"
      />
      <SidebarMenu
        to="/channels"
        icon={isAllChannels ? allChannelsActive : allChannelsInActive}
        isActive={isAllChannels ? true : false}
        label="All Channels"
      />

      <h3 style={{ display: localStorage.id ? '' : 'none' }}>Channels</h3>
      <div className="channel-sidebar-wrapper">
        {localStorage.id
          ? subscriptions &&
            channels.map((item) => (
              <Channel item={item} key={item.id} onClick={onClick} />
            ))
          : null}
      </div>
      <div
        style={{ display: localStorage.id ? '' : 'none' }}
        className="link-sidebar"
        onClick={handleClick}
      >
        <h4 className="show-more">{isShowMore ? 'Show Less' : 'Show More'}</h4>
      </div>
    </div>
  )
}

export default SideBar
