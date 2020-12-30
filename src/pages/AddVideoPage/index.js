// React Packages
import { Link, useHistory } from 'react-router-dom'
import { useState } from 'react'

// Components
import Button from '../../components/atoms/Button'
import Gap from '../../components/atoms/Gap'
import Input from '../../components/atoms/Input'
import InputFile from '../../components/atoms/InputFile'
import TextArea from '../../components/atoms/TextArea'
import MainComponent from '../../components/molecules/MainComponent'
import ProgressBar from '../../components/atoms/progressBar'

// Assets
import AttachIcon from '../../assets/icons/attach.svg'
import VideoIcon from '../../assets/icons/add_video_orange.svg'

// CSS
import './AddVideo.css'

// API
import { API } from '../../config/api'

const AddVideo = () => {
  const history = useHistory()
  const [isUploading, setIsUploading] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    thumbnail: '',
    description: '',
    video: '',
  })

  const { title, thumbnail, description, video } = formData

  const handleSubmit = async (e) => {
    e.preventDefault()

    const body = new FormData()
    body.append('title', title)
    body.append('thumbnail', thumbnail)
    body.append('description', description)
    body.append('video', video)

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }

    try {
      setIsUploading(true)
      const response = await API.post('/video', body, config)
      setIsUploading(false)
      history.push('/my-channel')
    } catch (err) {
      console.log(err)
    }
  }

  const handleChangeText = (e) => {
    const updateForm = { ...formData }
    updateForm[e.target.name] =
      e.target.type === 'file' ? e.target.files[0] : e.target.value
    setFormData(updateForm)
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
        isAddVideo
        updateSubscription={updateSubscriptions}
        subscriptions={subscriptions}
      />
      <div className="container-page">
        <div className="addd">
          <h2 className="add-video">Add Video</h2>
          <form action="">
            <div className="input-wrapper">
              <div className="input-title">
                <Input
                  placeholder="Add Title Video"
                  type="text"
                  name="title"
                  value={title}
                  onChange={handleChangeText}
                />
              </div>
              <div className="input-attach">
                <InputFile
                  height={55}
                  type="file"
                  label={thumbnail == 0 ? 'Attach Thumbnail' : thumbnail.name}
                  icon={AttachIcon}
                  name="thumbnail"
                  onChange={handleChangeText}
                />
              </div>
            </div>
            <TextArea
              placeholder="Description"
              height={177}
              type="text"
              name="description"
              onChange={handleChangeText}
            />
            <Gap height={12} />
            <div className="input-video">
              <InputFile
                height={55}
                type="file"
                label={video == 0 ? 'Upload Video' : video.name}
                icon={VideoIcon}
                name="video"
                onChange={handleChangeText}
              />
            </div>
            <Gap height={45} />
            <Button
              title="Upload"
              onClick={handleSubmit}
              isLoading={isUploading ? true : false}
              isDisabled={isUploading ? true : false}
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddVideo
