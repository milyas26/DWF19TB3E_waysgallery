import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Button from '../../components/atoms/Button'
import Gap from '../../components/atoms/Gap'
import Photo from '../../components/atoms/Photo'
import Navbar from '../../components/molecules/Navbar'
import { API } from '../../config/api'
import './DetailPost.css'

const DetailPost = () => {
  const [post, setPost] = useState([])
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const history = useHistory()
  let [isFollowing, setIsFollowing] = useState(true)
  let [mainImage, setMainImage] = useState(null)

  console.log(mainImage)

  const fetchPost = async () => {
    try {
      setLoading(true)
      const response = await API(`/post/${id}`)

      setPost(response.data.data.post)
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

  return (
    <div className="container profile">
      <Navbar />
      <div className="content">
        <div className="details-post">
          <div className="profile">
            <div className="name">
              <div
                className="photo"
                onClick={() =>
                  history.push(`/detail-user/${post.user && post.user.id}`)
                }
                style={{ cursor: 'pointer' }}
              >
                <Photo src={post.user && post.user.avatar} />
              </div>

              <div className="tags">
                <h6>{post.title}</h6>
                <span
                  onClick={() =>
                    history.push(`/detail-user/${post.user && post.user.id}`)
                  }
                  style={{ cursor: 'pointer' }}
                >
                  {post.user && post.user.fullName}
                </span>
              </div>
            </div>
            <div
              className="buttons"
              style={{
                display:
                  post.user && post.user.id == localStorage.id ? 'none' : '',
              }}
            >
              <Button
                title={isFollowing ? 'Unfollow' : 'Follow'}
                secondary
                onClick={
                  localStorage.id ? handleFollow : () => history.push(`/`)
                }
              />
              <Gap width={20} />
              <Button
                title="Hire"
                onClick={() =>
                  history.push(
                    localStorage.id
                      ? `/hire/${post.user && post.user.id}`
                      : `/`,
                  )
                }
              />
            </div>
            <div
              className="buttons"
              style={{
                display:
                  post.user && post.user.id == localStorage.id ? '' : 'none',
              }}
            >
              <Button
                title="My Profile"
                secondary
                onClick={() => history.push('/profile')}
              />
            </div>
          </div>

          <div className="image">
            <Photo
              src={
                mainImage === null
                  ? post.photos && post.photos[0].image
                  : mainImage
              }
              alt=""
            />
          </div>

          <div className="images">
            {post.photos &&
              post.photos.map((photo) => (
                <Photo
                  src={photo.image}
                  alt=""
                  onClick={() => setMainImage(photo.image)}
                />
              ))}
          </div>

          <div className="detail-post">
            <h4>
              Say Hello <span> {post.user && post.user.email}</span>
            </h4>
            <p>{post.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailPost
