// React Packages
import { useState, useEffect } from 'react'

// Components
import MainComponent from '../../components/molecules/MainComponent'
import Thumbnail from '../../components/molecules/Thumbnail'
import HomepageSkeleton from './homepageSkeleton'

// API
import { API } from '../../config/api'

const Home = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchVideos = async () => {
    try {
      setLoading(true)
      const response = await API('/videos')

      setVideos(response.data.data.videos)

      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchVideos()
  }, [])

  // Delete Video
  const handleDeleteVideo = async () => {
    try {
      const response = await API('/videos')
      setVideos(response.data.data.videos)
    } catch (err) {
      console.log(err)
    }
  }

  // Seach Feature
  let [search, setSearch] = useState()

  const handleSearch = (e) => {
    let keyword = e.target.value

    setSearch((search = keyword))
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
          onClickDeleteVideo={handleDeleteVideo}
        />
      </div>
    ))

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
        isHome
        onChange={(e) => handleSearch(e)}
        updateSubscription={updateSubscriptions}
        subscriptions={subscriptions}
      />
      <div className="container-page">
        <div className="videos">
          <h2>FOR YOUR PAGE</h2>
          {loading ? (
            <div>
              <HomepageSkeleton />
            </div>
          ) : (
            <div className="thumbnail">{items}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
