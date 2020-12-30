// React Packages
import { useEffect, useState } from 'react'

// API
import { API } from '../../config/api'

// Components
import MainComponent from '../../components/molecules/MainComponent'
import Thumbnail from '../../components/molecules/Thumbnail'

const SubscribtionPage = () => {
  let [search, setSearch] = useState()

  const handleSearch = (e) => {
    let keyword = e.target.value

    setSearch((search = keyword))
  }
  const [videos, setVideos] = useState([])

  const fetchVideos = async () => {
    try {
      const response = await API.get('/subscribe')

      setVideos(response.data.data.subscribtion)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchVideos()
  }, [])

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

  const items = videos
    .sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt)
    })
    .filter((item) => {
      if (search == null) {
        return item
      } else if (item.title.toLowerCase().includes(search.toLowerCase())) {
        return item
      }
    })
    .map((item) => (
      <div className="thumbnail-wrapper" key={item.id}>
        <Thumbnail
          id={item.id}
          img={item.thumbnail}
          title={item.title}
          channel={item.channel.channelName}
          idChannel={item.channel.id}
          views={item.viewcount}
          comments={item.comments.length}
          date={item.createdAt}
        />
      </div>
    ))

  return (
    <div className="home">
      <MainComponent
        isSubscribed
        onChange={(e) => handleSearch(e)}
        updateSubscription={updateSubscriptions}
        subscriptions={subscriptions}
      />
      <div className="container-page">
        <div className="videos">
          <h2>SUBSCRIBED</h2>
          {
            <div>
              {items.length === 0 ? (
                <h2 className="subs-detail">You're Not Subscribe Anyone...</h2>
              ) : (
                <div className="thumbnail">{items}</div>
              )}
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default SubscribtionPage
