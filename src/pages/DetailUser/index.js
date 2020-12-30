import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Button from '../../components/atoms/Button'
import Gap from '../../components/atoms/Gap'
import Photo from '../../components/atoms/Photo'
import ThumbnailArt from '../../components/molecules/ThumbnailArt'
import Navbar from '../../components/molecules/Navbar'
import { API } from '../../config/api'
import './DetailUser.css'

const DetailUser = () => {
  const [creator, setCreator] = useState([])
  const [latestPost, setLatestPost] = useState([])
  const [arts, setArts] = useState([])
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const history = useHistory()
  let [isFollowing, setIsFollowing] = useState(true)

  const fetchPost = async () => {
    try {
      setLoading(true)
      const response = await API(`/user/${id}`)

      setCreator(response.data.data.user)
      setArts(response.data.data.user && response.data.data.user.arts)

      setLatestPost(
        response.data.data.user &&
          response.data.data.user.posts
            .sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt)
            })
            .slice(0, 1),
      )

      setLoading(false)

      const followingId = await API(`/following/${id}`)
      followingId.data.data.follower === null
        ? setIsFollowing(false)
        : setIsFollowing(true)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchPost()
  }, [])

  const imageLatest = latestPost[0] ? latestPost[0].photos[0].image : null

  // FOLLOW
  const follow = async () => {
    try {
      await API.post(`/follow/${id}`)
      const followingId = await API(`/following/${id}`)
      setIsFollowing(true)
    } catch (err) {
      console.log(err)
    }
  }

  // UNFOLLOW
  const unfollow = async () => {
    try {
      await API.delete(`/follow/${id}`)
      const followingId = await API(`/following/${id}`)

      setIsFollowing(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleFollow = () => {
    isFollowing ? unfollow() : follow()
  }

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
            <div
              className="buttons"
              style={{ display: localStorage.id === id ? 'none' : '' }}
            >
              <Button
                title={isFollowing ? 'Unfollow' : 'Follow'}
                secondary
                onClick={
                  localStorage.id ? handleFollow : () => history.push(`/`)
                }
              />
              <Gap width={24} />
              <Button
                title="Hire"
                onClick={() =>
                  history.push(localStorage.id ? `/hire/${creator.id}` : `/`)
                }
              />
            </div>

            <div
              className="buttons"
              style={{ display: localStorage.id === id ? '' : 'none' }}
            >
              <Button
                title="Edit Profile"
                width={130}
                onClick={() => history.push(`/edit-profile`)}
              />
            </div>
          </div>

          <div className="right">
            <div className="image">
              <Photo
                width={550}
                height={400}
                src={latestPost ? imageLatest : localStorage.avatar}
              />
            </div>
          </div>
          <div className="kotak"></div>
        </div>

        <div className="posts">
          <h3>{creator.fullName}'s Works</h3>

          <div className="cards">{items}</div>
        </div>
      </div>
    </div>
  )
}

export default DetailUser
