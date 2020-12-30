// React Packages
import { useEffect, useState } from 'react'

// API
import { API } from '../../../config/api'

// Components
import Thumbnail from '../Thumbnail'

const MyVideos = ({ user }) => {
  const [videos, setVideos] = useState([])

  const fetchVideos = async () => {
    try {
      const response = await API(`/channel/${user}`)

      setVideos(response.data.data.channel.videos)
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
      const response = await API(`/channel/${user}`)
      setVideos(response.data.data.channel.videos)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="videos">
      <div className="thumbnail">
        {videos.map((item) => (
          <div className="thumbnail-wrapper" key={item.id}>
            <Thumbnail
              id={item.id}
              idChannel={user}
              img={item.thumbnail}
              title={item.title}
              views={item.viewcount}
              date={item.createdAt}
              comments={item.comments.length}
              onClickDeleteVideo={handleDeleteVideo}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyVideos
