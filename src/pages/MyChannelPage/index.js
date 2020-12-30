// React Packages
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// API
import { API } from '../../config/api'

// Components
import Photo from '../../components/atoms/Photo'
import MainComponent from '../../components/molecules/MainComponent'
import MyVideos from '../../components/molecules/MyVideos'
import MyDescription from '../../components/molecules/MyVideos/Description'
import ContentCreatorSkeleton from '../ContentCreatorPage/ContentCreatorSkeleton'

// CSS
import './MyChannel.css'

const MyChannel = () => {
  const [user, setUser] = useState('')
  const [loading, setLoading] = useState(true)
  const id = localStorage.id

  const fetchChannel = async () => {
    try {
      setLoading(true)
      const channel = await API(`/channel/${id}`)

      setUser(channel.data.data.channel)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchChannel()
  }, [])

  let [isDescription, setIsDescription] = useState(false)
  const handleVideo = () => {
    setIsDescription((isDescription = !isDescription))
  }
  const handleDescription = () => {
    setIsDescription((isDescription = !isDescription))
  }

  // UPDATE SUBSCRIPTIONS
  const [subscriptions, setSubscriptions] = useState('')
  const updateSubscriptions = async () => {
    try {
      const channel = await API(`/subscribtion`)
      setSubscriptions(channel.data.data.subscribtion)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="home">
      <MainComponent
        updateSubscription={updateSubscriptions}
        subscriptions={subscriptions}
      />
      {loading ? (
        <ContentCreatorSkeleton />
      ) : (
        <div className="container-page">
          <div className="channel-wrapper">
            <div className="image-wrapper">
              <img src={user.thumbnail} alt="thumbnail" />
            </div>

            <div className="profile">
              <div className="user-profile">
                <Photo src={user.photo} width={80} isCircle />
                <div className="channel-name">
                  <h6>{user.channelName}</h6>
                  <p>{user.subscriber.length} Subscriber</p>
                </div>
                <div className="button-wrapper">
                  <Link to={'/edit-channel'}>
                    <button className="button btn-sm">Edit Channel</button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="link-profile-wrapper">
              <div className="link-profile" onClick={handleVideo}>
                <span className={!isDescription ? 'active' : ''}>Video</span>
              </div>
              <div className="link-profile" onClick={handleDescription}>
                <span className={isDescription ? 'active' : ''}>
                  Description Channel
                </span>
              </div>
            </div>
            {!isDescription ? (
              <MyVideos user={id} />
            ) : (
              <MyDescription user={user} />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default MyChannel
