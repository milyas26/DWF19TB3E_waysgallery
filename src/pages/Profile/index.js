import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../components/atoms/Button'
import Photo from '../../components/atoms/Photo'
import ThumbnailArt from '../../components/molecules/ThumbnailArt'
import Navbar from '../../components/molecules/Navbar'
import { API } from '../../config/api'
import './Profile.css'

const DetailUser = () => {
  const [creator, setCreator] = useState([])
  const [latestPost, setLatestPost] = useState([])
  const [arts, setArts] = useState([])
  const [loading, setLoading] = useState(true)
  const history = useHistory()

  const fetchPost = async () => {
    try {
      setLoading(true)
      const response = await API(`/user`)

      setCreator(response.data.data)
      setArts(response.data.data && response.data.data.arts)
      setLatestPost(
        response.data.data &&
          response.data.data.posts
            .sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt)
            })
            .slice(0, 1),
      )
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchPost()
  }, [])

  const imageLatest = latestPost[0] ? latestPost[0].photos[0].image : null

  const items = arts.map((item) => (
    <div className="thumbnail-wrapper" key={item.id}>
      <ThumbnailArt item={item} />
    </div>
  ))

  return (
    <div className="container order">
      <Navbar />
      <div className="content">
        <div className="arts">
          <div className="left">
            <div className="photo">
              <Photo src={creator.avatar} isCircle width={100} height={100} />
            </div>
            <span>{creator.fullName}</span>
            <p>{creator.greeting}</p>
            <div className="buttons">
              <Button
                title="Edit Profile"
                width={130}
                onClick={() => history.push(`/edit-profile`)}
              />
            </div>
          </div>

          <div className="right">
            <div className="image">
              <Photo src={latestPost ? imageLatest : localStorage.avatar} />
            </div>
          </div>
          <div className="kotak"></div>
        </div>

        <div className="posts">
          <h3>My Works</h3>

          <div className="cards">{items}</div>
        </div>
      </div>
    </div>
  )
}

export default DetailUser
