import { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../components/atoms/Button'
import Gap from '../../components/atoms/Gap'
import iconPlus from '../../assets/icons/plus.svg'
import Input from '../../components/atoms/Input'
import TextArea from '../../components/atoms/TextArea'
import Navbar from '../../components/molecules/Navbar'
import './Upload.css'
import { API } from '../../config/api'

const Upload = () => {
  const history = useHistory()
  const [message, setMessage] = useState(null)

  const [imagePreview, setImagePreview] = useState()

  const hiddenFileInput = useRef(null)
  const handleClick = (e) => {
    hiddenFileInput.current.click()
  }

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: [],
  })

  const { title, description, image } = formData

  const handleChangeText = (e) => {
    const updateForm = { ...formData }
    updateForm[e.target.name] =
      e.target.type === 'file' ? e.target.files : e.target.value
    setFormData(updateForm)
    for (let i = 0; i < e.target.files && e.target.files.length; i++) {
      setImagePreview(URL.createObjectURL(e.target.files[i]))
    }
  }

  console.log(imagePreview)

  // HANDLE UPLOAD
  const uploadPost = async (e) => {
    e.preventDefault()

    const body = new FormData()
    body.append('title', title)
    body.append('description', description)
    Array.from(image).forEach((image) => {
      body.append('image', image)
    })

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }

    try {
      const response = await API.post('/post', body, config)
      setMessage(response.data.message)

      setFormData({
        title: '',
        description: '',
      })
      setTimeout(() => {
        setMessage(null)
      }, 2000)
      history.push('/home')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="container upload">
      <Navbar />
      <div className="content-upload">
        <div className="edit-profile">
          <div className="left">
            <div className="kotak-file" onClick={handleClick}>
              <label>
                <i class="fas fa-cloud-upload-alt"></i>
                <Gap height={20} />
                <div className="text">
                  <span style={{ color: '#2FC4B2' }}>Browse </span>
                  to choose a file
                </div>
              </label>
              <input
                id="image"
                name="image"
                multiple
                ref={hiddenFileInput}
                type="file"
                style={{ display: 'none' }}
                onChange={handleChangeText}
              />
            </div>
            <Gap height={20} />
            <div className="upload-wrapper">
              <img src={iconPlus} alt="" />
              <img src={iconPlus} alt="" />
              <img src={iconPlus} alt="" />
              <img src={iconPlus} alt="" />
            </div>
          </div>
          <div className="right">
            <div className="right-wrapper">
              <div className="input-text">
                <Input
                  placeholder="Title"
                  fontSize={14}
                  name="title"
                  onChange={handleChangeText}
                />
              </div>
              <Gap height={30} />
              <div className="input-text">
                <TextArea
                  placeholder="Description"
                  fontSize={14}
                  height={200}
                  name="description"
                  onChange={handleChangeText}
                />
              </div>
              <Gap height={48} />
              <div className="buttons">
                <Button
                  title="Cancel"
                  secondary
                  onClick={() => history.push('/profile')}
                />
                <Gap width={20} />
                <Button title="Post" onClick={uploadPost} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="message-wrapper"
        style={{ display: message === null ? 'none' : '' }}
        onClick={() => setMessage(null)}
      >
        <div className="wrapper"></div>
        <div className="message">
          <span>{message}</span>
        </div>
      </div>
    </div>
  )
}

export default Upload
