import { useHistory } from 'react-router-dom'
import { API } from '../../../config/api'
import './ThumbnailWatchLater.css'

const WatchLaterThumbnail = ({
  views,
  comments,
  date,
  title,
  img,
  id,
  onClickRemoveList,
}) => {
  const history = useHistory()

  const myDate = new Date(date).toLocaleDateString()

  // DELETE LIST
  const deleteList = async () => {
    try {
      const response = await API.delete(`/delete-watchlater/${id}`)

      onClickRemoveList()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="watch-later">
      <div
        className="photo-thumb"
        onClick={() => history.push(`/detail-video/${id}`)}
      >
        <img src={img} />
      </div>
      <div className="desc">
        <div className="title">
          <p onClick={() => history.push(`/detail-video/${id}`)}>{title}</p>
          <div className="stats">
            <div className="icon views">
              <i className="fas fa-eye"></i>
              <span>{views}</span>
            </div>
            <div className="icon comment-icon">
              <i className="far fa-comment"></i>
              <span>{comments}</span>
            </div>
            <div className="icon dates">
              <i className="far fa-clock"></i>
              <span>{myDate}</span>
            </div>
            <div className="icon icon-later" onClick={deleteList}>
              <i className="fas fa-trash-alt"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WatchLaterThumbnail
