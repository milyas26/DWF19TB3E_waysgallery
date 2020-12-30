// React Packages
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { API } from '../../../config/api'
import Button from '../Button'
import Input from '../Input'

// Components
import Photo from '../Photo'
import Gap from '../Gap'

// CSS
import './Comments.css'

const Comments = ({
  item,
  image,
  text,
  channel,
  idChannel,
  date,
  updateComments,
  videoId,
}) => {
  const commentDate = new Date(date).toLocaleDateString()

  let [isShown, setIsShown] = useState(false)
  let [isEdit, setIsEdit] = useState(false)

  const handleDropDown = () => {
    setIsShown((isShown = !isShown))
  }

  const handleEdit = () => {
    setIsEdit((isEdit = !isEdit))
  }

  // DELETE COMMENT
  const handleDelete = async () => {
    const response = await API.delete(`/video/${videoId}/comment/${item.id}`)
    updateComments()
  }

  // UPDATE COMMENT
  const [formData, setFormData] = useState({
    comment: '',
  })

  const { comment } = formData

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const updateComment = async (e) => {
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
          : await API.patch(
              `/video/${videoId}/comment/${item.id}`,
              body,
              config,
            )
      setIsEdit(false)
      updateComments()
    } catch (err) {
      console.log(err)
      alert('Edit comment first!!')
    }
  }

  const cancel = (e) => {
    e.preventDefault()
    setIsEdit(false)
  }

  return (
    <div className="comments">
      <Link to={`/content-creator/${idChannel}`} className="comment-link">
        <Photo src={image} width={45} isCircle />
      </Link>
      <div className="comment-detail">
        <div className="channel-name">
          <div className="link">
            <Link to={`/content-creator/${idChannel}`} className="comment-link">
              <p className="comment-channel">{channel}</p>
            </Link>
          </div>
          {item.channel.id == localStorage.id && (
            <div
              className="option"
              onClick={handleDropDown}
              style={{ display: isEdit ? 'none' : '' }}
            >
              <p>.</p>
              <p>.</p>
              <p>.</p>
              <div
                className="dropdown"
                style={{ display: isShown ? 'flex' : 'none' }}
              >
                <span className="delete" onClick={handleDelete}>
                  <i className="fas fa-trash-alt"></i> Delete
                </span>
                <span onClick={handleEdit}>
                  {' '}
                  <i className="fas fa-pencil-alt"></i> Edit
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="comment-wrapper">
          <p className="comment-item" style={{ display: isEdit ? 'none' : '' }}>
            {text}
          </p>
          <p className="comment-date" style={{ display: isEdit ? 'none' : '' }}>
            {commentDate}
          </p>
        </div>
        {item.channel.id == localStorage.id && (
          <div style={{ display: isEdit ? '' : 'none' }}>
            <form>
              <Input
                id="comment"
                placeholder="Edit Comment..."
                onChange={handleChange}
                name="comment"
                fontSize={14}
                value={comment === '' ? text : comment}
              />
              <div className="button-wrapper">
                <Button isSmall title="Cancel" onClick={cancel} />
                <Gap width={20} />
                <Button isSmall title="Edit" onClick={updateComment} />
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default Comments
