// React Packages
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// Components
import { API } from '../../config/api'
import MainComponent from '../../components/molecules/MainComponent'
import CreatorVideos from '../../components/molecules/CreatorVideos'
import Profile from '../../components/molecules/Profile'
import MyDescription from '../../components/molecules/MyVideos/Description'
import ContentCreatorSkeleton from './ContentCreatorSkeleton'

// CSS
import './ContentCreator.css'

const ContentCreator = () => {
  let [isSubscribed, setIsSubscribed] = useState(true)
  const [subscribers, setSubscribers] = useState(0)
  const [loading, setLoading] = useState(true)
  const [creator, setCreator] = useState('')
  const [subscriptions, setSubscriptions] = useState('')

  let { id } = useParams()

  const fetchChannel = async () => {
    try {
      setLoading(true)
      const channel = await API(`/channel/${id}`)
      setCreator(channel.data.data.channel)
      setLoading(false)
      setIsSubscribed(false)
      setSubscribers(channel.data.data.channel.subscriber.length)

      const subscriberId = await API(`/subscriber/${id}`)
      subscriberId.data.data.subscriber === null
        ? setIsSubscribed(false)
        : setIsSubscribed(true)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchChannel()
  }, [])

  // MOVE TO OTHER CREATOR PAGE
  const handleCreatorPage = async (e) => {
    try {
      setLoading(true)
      const channel = await API(`/channel/${id}`)
      setCreator(channel.data.data.channel)
      setLoading(false)
      setIsSubscribed(false)
      setSubscribers(
        channel.data.data.channel &&
          channel.data.data.channel.subscriber.length,
      )

      const subscriberId = await API(`/subscriber/${id}`)
      subscriberId.data.data.subscriber === null
        ? setIsSubscribed(false)
        : setIsSubscribed(true)
    } catch (err) {
      console.log(err)
    }
  }

  // UPDATE SUBSCRIPTIONS
  const updateSubscriptions = async () => {
    try {
      const channel = await API(`/subscribtion`)
      setSubscriptions(channel.data.data.subscribtion)
    } catch (err) {
      console.log(err)
    }
  }

  const subscribe = async () => {
    try {
      await API.post(`/subscribe/${id}`)
      setIsSubscribed((isSubscribed = !isSubscribed))
      const channel = await API(`/channel/${id}`)
      setSubscribers(channel.data.data.channel.subscriber.length)
      updateSubscriptions()
    } catch (err) {
      console.log(err)
    }
  }
  const unSubscribe = async () => {
    try {
      await API.delete(`/subscribe/${id}`)
      setIsSubscribed((isSubscribed = !isSubscribed))
      const channel = await API(`/channel/${id}`)
      setSubscribers(channel.data.data.channel.subscriber.length)
      updateSubscriptions()
    } catch (err) {
      console.log(err)
    }
  }

  let [isDescription, setIsDescription] = useState(false)
  const handleVideo = () => {
    setIsDescription((isDescription = !isDescription))
  }
  const handleDescription = () => {
    setIsDescription((isDescription = !isDescription))
  }

  return (
    <div className="home">
      <MainComponent
        updateSubscription={updateSubscriptions}
        subscriptions={subscriptions}
        onClick={handleCreatorPage}
      />
      {loading ? (
        <div className="container-page">
          <ContentCreatorSkeleton />
        </div>
      ) : (
        <div className="container-page">
          <div className="content-creator">
            <div className="image-wrapper">
              <img src={creator.thumbnail} alt="" />
            </div>

            <div className="link-profile">
              <Profile
                onClick={isSubscribed ? unSubscribe : subscribe}
                state={isSubscribed}
                title={!isSubscribed ? 'Subscribe' : 'Unsubscribe'}
                creator={creator}
                AllSubscribers={subscribers}
              />
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
              <CreatorVideos user={id} />
            ) : (
              <MyDescription user={creator} />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ContentCreator
