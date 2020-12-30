import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Dropzone, { useDropzone } from 'react-dropzone'
import Button from '../../components/atoms/Button'
import Gap from '../../components/atoms/Gap'
import Input from '../../components/atoms/Input'
import Navbar from '../../components/molecules/Navbar'
import { API, setAuthToken } from '../../config/api'
import { AppContext } from '../../context/appContext'
import './EditProfile.css'

const EditProfile = () => {
  // PREVIEW AVATAR
  const [avatarPreview, setAvatarPreview] = useState()
  const [creator, setCreator] = useState([])
  const [files, setFiles] = useState([])

  const [state, dispatch] = useContext(AppContext)

  const fetchPost = async () => {
    try {
      const response = await API(`/user`)

      setCreator(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchPost()
  }, [])

  const hiddenFileInput = useRef(null)
  const handleClick = (e) => {
    hiddenFileInput.current.click()
  }

  const history = useHistory()

  const [formData, setFormData] = useState({
    fullName: '',
    greeting: '',
    avatar: '',
  })

  const [image, setImage] = useState()

  const { fullName, greeting, avatar } = formData

  const handleChangeText = (e) => {
    e.preventDefault()
    const updateForm = { ...formData }
    updateForm[e.target.name] =
      e.target.type === 'file' ? e.target.files[0] : e.target.value
    setFormData(updateForm)
    // setAvatarPreview(URL.createObjectURL(e.target.files[0]))
  }

  // POST ART
  const uploadArt = async (e) => {
    const body = new FormData()
    body.append('image', image)

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }

    try {
      const response = await API.post('/art', body, config)
    } catch (err) {
      console.log(err)
    }
  }

  // EDIT PROFILE
  const updateProfile = async (e) => {
    e.preventDefault()

    const body = new FormData()
    body.append('fullName', fullName)
    body.append('greeting', greeting)
    body.append('avatar', avatar)

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }

    try {
      const response = await API.patch('/user', body, config)
      history.push('/profile')

      dispatch({
        type: 'LOGIN',
        payload: response.data.data.user,
      })
    } catch (err) {
      console.log(err)
    }
  }

  console.log(formData)
  console.log(image)

  // DROPZONE
  const thumbsContainer = {
    display: 'flex',
    position: 'absolute',
    height: 420,
    width: 550,
    top: -10,
  }

  const thumb = {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 2,
    marginBottom: 8,
    marginRight: 8,
    padding: 4,
    overflow: 'hidden',
  }

  const thumbInner = {
    display: 'flex',
    minWidth: 0,
  }

  const img = {
    display: 'block',
    width: 'auto',
    height: '100%',
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setImage(acceptedFiles)
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(acceptedFiles, {
            preview: URL.createObjectURL(file),
          }),
        ),
      )
      uploadArt()
    },
  })

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ))

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview))
    },
    [files],
  )

  return (
    <div className="container order">
      <Navbar />
      <div className="content">
        <div className="edit-profile">
          <div className="left">
            <section>
              <div {...getRootProps({ className: 'dropzone' })}>
                <div className="kotak-file">
                  <input {...getInputProps()} />
                  <label>
                    <span style={{ color: '#2FC4B2' }}>Upload </span>
                    Your Best Art
                  </label>
                  <aside style={thumbsContainer}>{thumbs}</aside>
                </div>
              </div>
            </section>
          </div>
          <div className="right">
            <div className="right-wrapper">
              <div className="avatar-file" onClick={handleClick}>
                <label>
                  <i class="fas fa-camera"></i>
                </label>
                <input
                  id="avatar"
                  name="avatar"
                  onChange={handleChangeText}
                  type="file"
                  ref={hiddenFileInput}
                  style={{ display: 'none' }}
                />
                <img
                  style={{
                    position: 'absolute',
                    width: 150,
                    height: 150,
                    borderRadius: '50%',
                    marginTop: -4,
                    border: '3px solid #000',
                    display: avatarPreview ? '' : 'none',
                  }}
                  alt=""
                  id="avatarPreview"
                  src={avatarPreview}
                />
              </div>
              <Gap height={40} />
              <div className="input-text">
                <Input
                  placeholder="Full Name"
                  fontSize={14}
                  name="fullName"
                  value={fullName}
                  onChange={handleChangeText}
                />
              </div>
              <Gap height={16} />
              <div className="input-text">
                <Input
                  placeholder="Greeting"
                  fontSize={14}
                  name="greeting"
                  value={greeting}
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
                <Button title="Save" onClick={updateProfile} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
