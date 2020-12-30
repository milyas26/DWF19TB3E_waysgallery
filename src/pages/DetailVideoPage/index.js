// React Packages
import ReactPlayer from 'react-player'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

// API
import { API } from '../../config/api'

// Components
import Button from '../../components/atoms/Button'
import Comments from '../../components/atoms/Comments'
import Photo from '../../components/atoms/Photo'
import MainComponent from '../../components/molecules/MainComponent'
import Thumbnail from '../../components/molecules/Thumbnail'

// Assets
import viewIcon from '../../assets/icons/view.svg'
import dateIcon from '../../assets/icons/refresh.svg'
import TextArea from '../../components/atoms/TextArea'
import commentIcon from '../../assets/icons/speech-bubble.png'

// CSS
import './DetailVideo.css'

const DetailVideoPage = () => {
  let { id } = useParams()
  const [user, setUser] = useState([])
  const [videos, setVideos] = useState([])
  const [video, setVideo] = useState([])
  const [comments, setComments] = useState([])
  const [commentsLength, setCommentsLength] = useState(0)
  const [viewers, setViewers] = useState(0)

  const fetchVideo = async (e) => {
    try {
      const video = await API(`/video/${id}`)
      const viewCount = await API.patch(`/video/${id}`)
      setViewers(viewCount.data.data.video.viewcount)
      const videos = await API(`/videos`)
      setVideo(video.data.data.video)
      setVideos(videos.data.data.videos)
      setComments(video.data.data.video.comments)
      setCommentsLength(video.data.data.video.comments.length)

      const user = await API(`channel/${localStorage.id}`)
      setUser(user.data.data.channel)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchVideo()
  }, [])

  const myDate = new Date(video.createdAt).toLocaleDateString()

  // POST COMMENT
  const [formData, setFormData] = useState({
    comment: '',
  })

  const { comment } = formData

  const handleChangeText = (e) => {
    setFormData({ [e.target.name]: e.target.value })
  }

  const handleComment = async (e) => {
    e.preventDefault()

    try {
      const body = JSON.stringify({ comment })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const response =
        comment === ''
          ? null
          : await API.post(`/video/${id}/comment`, body, config)
      const newComment = response.data.data.comment

      comment === ''
        ? alert('Tulis komentar terlebih dahulu!')
        : setComments([newComment, ...comments])

      setFormData({
        comment: '',
      })

      const video = await API(`/video/${id}`)
      setCommentsLength(video.data.data.video.comments.length)
    } catch (err) {
      console.log(err)
      alert('Isi komentar terlebih dahulu!')
    }
  }

  // Delete Comment

  const updateComment = async () => {
    try {
      const newComments = await API(`/video/${video.id}`)
      setComments(newComments.data.data.video.comments)
      setCommentsLength(newComments.data.data.video.comments.length)
    } catch (err) {
      console.log(err)
    }
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
      <div className="container-page">
        <div className="detail-video">
          <div className="details">
            <ReactPlayer width="100%" controls url={video.video} />
            <h3>{video.title}</h3>
            <Link
              to={`/content-creator/${video.channel?.id}`}
              className="link-thumbnail"
            >
              <div className="channel-prof">
                <Photo src={video.channel?.photo} isCircle width={30} />
                <h5>{video.channel?.channelName}</h5>
              </div>
            </Link>
            <p>{video.description}</p>
            <div className="stats">
              <div className="views">
                <img src={viewIcon} alt="views" />
                <span>{viewers}</span>
              </div>
              <div className="comment-icon">
                <img src={commentIcon} alt="comments" />
                <span>{commentsLength}</span>
              </div>
              <div className="dates">
                <img src={dateIcon} alt="Date" />
                <span>{myDate}</span>
              </div>
            </div>
            <div className="comment-section">
              <form>
                <div className="comment">
                  <Photo
                    src={
                      localStorage.id
                        ? user.photo
                        : 'uploads/images/default-photo.png'
                    }
                    width={45}
                    isCircle
                  />

                  <div className="textarea">
                    <TextArea
                      placeholder="Comment..."
                      name="comment"
                      onChange={handleChangeText}
                      value={comment}
                    />
                  </div>
                </div>
                <div className="button-wrapper">
                  <Button isSmall title="Post" onClick={handleComment} />
                </div>
              </form>
              {comments
                .sort((a, b) => {
                  return new Date(b.createdAt) - new Date(a.createdAt)
                })
                .map((item) => (
                  <Comments
                    videoId={video.id}
                    item={item}
                    key={item.id}
                    image={item.channel?.photo}
                    channel={item.channel.channelName}
                    idChannel={item.channel.id}
                    text={item.comment}
                    date={item.createdAt}
                    updateComments={updateComment}
                  />
                ))}
            </div>
          </div>
          <div className="recomendation">
            <h4>RECOMENDATION</h4>
            <div className="videos">
              <div className="thumbnail recomendation">
                {videos
                  // .sort(() => Math.random() - 0.5)
                  .slice(0, 5)
                  .sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt)
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
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailVideoPage
