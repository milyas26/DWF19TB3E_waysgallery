// Components
import Header from '../Header'
import SideBar from '../SideBar'

// CSS
import './MainComponent.css'

const MainComponent = ({
  isHome,
  isSubscribed,
  isAllChannels,
  isAddVideo,
  onChange,
  updateSubscription,
  subscriptions,
  onClick,
}) => {
  return (
    <div className="main">
      <div className="sidebar">
        <SideBar
          isHome={isHome}
          isSubscribed={isSubscribed}
          isAllChannels={isAllChannels}
          updateSubscription={updateSubscription}
          subscriptions={subscriptions}
          onClick={onClick}
        />
      </div>

      <div className="right">
        <Header isAddVideo={isAddVideo} onChange={onChange} />
      </div>
    </div>
  )
}

export default MainComponent
