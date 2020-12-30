import { useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Button from '../../components/atoms/Button'
import Gap from '../../components/atoms/Gap'
import iconPlus from '../../assets/icons/plus.svg'
import TextArea from '../../components/atoms/TextArea'
import Navbar from '../../components/molecules/Navbar'
import './SendProject.css'
import { API } from '../../config/api'

const SendProject = () => {
  const history = useHistory()
  const { id } = useParams()
  const [message, setMessage] = useState(null)

  const hiddenFileInput = useRef(null)
  const handleClick = (e) => {
    hiddenFileInput.current.click()
  }

  const [formData, setFormData] = useState({
    description: '',
    image: [],
  })

  const { description, image } = formData

  const handleChangeText = (e) => {
    const updateForm = { ...formData }
    updateForm[e.target.name] =
      e.target.type === 'file' ? e.target.files : e.target.value
    setFormData(updateForm)
  }

  console.log(formData)

  // HANDLE UPLOAD
  const uploadProject = async (e) => {
    e.preventDefault()

    const body = new FormData()
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
      const response = await API.post(`/project/${id}`, body, config)
      setMessage('Success Deliver Your Project')

      setFormData({
        description: '',
        image: '',
      })
      setTimeout(() => {
        setMessage(null)
      }, 2000)
      history.goBack()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="container">
      <Navbar />
      <div className="send-project">
        <div className="edit-profile">
          <div className="left">
            <div className="kotak-file" onClick={handleClick}>
              <label>
                <i class="fas fa-cloud-upload-alt"></i>
                <Gap height={20} />
                <div className="text">
                  <span style={{ color: '#2FC4B2' }}>Browse </span>
                  to choose a project
                </div>
              </label>
              <input
                id="image"
                name="image"
                ref={hiddenFileInput}
                type="file"
                style={{ display: 'none' }}
                onChange={handleChangeText}
                multiple
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
                  width={120}
                  onClick={() => history.push('/profile')}
                />
                <Gap width={20} />
                <Button
                  title="Send Project"
                  width={120}
                  onClick={uploadProject}
                />
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

export default SendProject
