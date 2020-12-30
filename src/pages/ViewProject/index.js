import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../../components/atoms/Button'
import Gap from '../../components/atoms/Gap'
import Photo from '../../components/atoms/Photo'
import Navbar from '../../components/molecules/Navbar'
import { API } from '../../config/api'
import './ViewProject.css'

const ViewProject = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [project, setProject] = useState([])
  const [isSuccess, setIsSuccess] = useState(false)
  let [mainImage, setMainImage] = useState(null)
  const fetchPost = async () => {
    try {
      setLoading(true)
      const response = await API(`/project/${id}`)

      setProject(response.data.data.project)

      if (response.data.data.project.hire.status === 'Success') {
        setIsSuccess(true)
      } else {
        setIsSuccess(false)
      }
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchPost()
  }, [])

  console.log(project)

  // APPROVE PROJECT
  const approveProject = async () => {
    try {
      await API.patch(`/success-project/${project.hire && project.hire.id}`)
      setIsSuccess(true)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="container view-project">
      <Navbar />

      <Gap height={50} />
      <div className="content-project">
        <div className="left">
          <Photo
            src={
              mainImage === null
                ? project.photos && project.photos[0].image
                : mainImage
            }
            alt=""
          />

          <div className="images">
            {project.photos &&
              project.photos.map((photo) => (
                <Photo
                  src={photo.image}
                  alt=""
                  onClick={() => setMainImage(photo.image)}
                />
              ))}
          </div>
        </div>

        <div className="right">
          <p>{project.description}</p>

          <Gap height={50} />
          <div
            className="buttons"
            style={{
              display: isSuccess ? 'none' : '',
            }}
          >
            <Button title="Ask Revision" width={120} />
            <Gap width={20} />
            <Button
              onClick={approveProject}
              title="Approve"
              width={120}
              backgroundColor="#FF9900"
            />
          </div>
          <div
            className="status"
            style={{
              color: '#00E016',
              fontWeight: 600,
              fontSize: 20,
              textAlign: 'end',
              display: isSuccess ? '' : 'none',
            }}
          >
            <span>
              Transaction Completed! <i class="fas fa-check"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewProject
