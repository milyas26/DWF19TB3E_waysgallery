// React Packages
import { useHistory } from 'react-router-dom'

// Components
import Button from '../../components/atoms/Button'
import Gap from '../../components/atoms/Gap'
import Input from '../../components/atoms/Input'
import InputFile from '../../components/atoms/InputFile'
import TextArea from '../../components/atoms/TextArea'
import MainComponent from '../../components/molecules/MainComponent'

// Assets
import Photo from '../../assets/icons/photo.svg'

// CSS
import './EditChannel.css'
import { useEffect, useState } from 'react'

// API
import { API } from '../../config/api'

const EditChannel = () => {
  const history = useHistory()
  const [channel, setChannel] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({
    channelName: '',
    description: '',
    thumbnail: '',
    photo: '',
  })

  const fetchChannel = async () => {
    try {
      const channel = await API(`/channel/${localStorage.id}`)
      setChannel(channel.data.data.channel)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchChannel()
  }, [])

  const { channelName, description, thumbnail, photo } = formData

  const handleSubmit = async (e) => {
    e.preventDefault()

    const body = new FormData()
    body.append('channelName', channelName)
    body.append('thumbnail', thumbnail)
    body.append('description', description)
    body.append('photo', photo)

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }

    try {
      setIsUploading(true)
      const response = await API.put('/edit-channel', body, config)
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
        updateSubscription={updateSubscriptions}
        subscriptions={subscriptions}
      />
      <div className="container-page">
        <h2 className="edit-channel">Edit Channel</h2>
        <div className="input-wrapper">
          <div className="input-title">
            <Input
              placeholder="Channel Name"
              value={channelName === '' ? channel.channelName : channelName}
              onChange={handleChangeText}
              name="channelName"
            />
          </div>
          <div className="input-attach">
            <InputFile
              height={55}
              label={thumbnail === '' ? 'Upload Thumbnail' : thumbnail.name}
              icon={Photo}
              onChange={handleChangeText}
              name="thumbnail"
              type="file"
            />
          </div>
        </div>
        <TextArea
          placeholder="Description"
          onChange={handleChangeText}
          value={description === '' ? channel.description : description}
          name="description"
          height={177}
        />
        <Gap height={12} />
        <div className="input-video">
          <InputFile
            height={55}
            label={photo === '' ? 'Upload Photo' : photo.name}
            icon={Photo}
            onChange={handleChangeText}
            name="photo"
            type="file"
          />
        </div>
        <Gap height={45} />
        <Button
          title="Save"
          onClick={handleSubmit}
          isLoading={isUploading ? true : false}
          isDisabled={isUploading ? true : false}
        />
      </div>
    </div>
  )
}

export default EditChannel
