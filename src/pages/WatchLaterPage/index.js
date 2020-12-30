import React, { useEffect, useState } from 'react'
import MainComponent from '../../components/molecules/MainComponent'
import ThumbnailWatchLater from '../../components/molecules/ThumbnailWatchLater'
import { API } from '../../config/api'

const WatchLater = () => {
  // FETCH WATCH LATER
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchVideos = async () => {
    try {
      setLoading(true)
      const response = await API('/watch-laters')

      setVideos(response.data.data.videos)

      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchVideos()
  }, [])

  // RESET LIST
  const resetList = async () => {
    try {
      setLoading(true)
      const response = await API('/watch-laters')
      setVideos(response.data.data.videos)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  // SORT & MAP
  const items = videos
    .sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt)
    })
    .map((item) => (
      <div className="thumbnail-wrapper" key={item.id}>
        <ThumbnailWatchLater
          id={item.id}
          img={item.thumbnail}
          views={item.viewcount}
          comments={item.comments}
          date={item.createdAt}
          title={item.title}
          onClickRemoveList={resetList}
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
        updateSubscription={updateSubscriptions}
        subscriptions={subscriptions}
      />
      <div className="container-page">
        <h2>Watch Later</h2>
        <div className="contains">{items}</div>
      </div>
    </div>
  )
}

export default WatchLater
