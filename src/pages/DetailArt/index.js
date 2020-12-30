import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Button from '../../components/atoms/Button'
import Gap from '../../components/atoms/Gap'
import Photo from '../../components/atoms/Photo'
import { API } from '../../config/api'
import './DetailArt.css'

const DetailArt = () => {
  const history = useHistory()
  const { id } = useParams()
  const [art, setArt] = useState()
  const [loading, setLoading] = useState(true)

  const fetchPost = async () => {
    try {
      setLoading(true)
      const response = await API(`/art/${id}`)

      setArt(response.data.data.art)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchPost()
  }, [])

  return (
    <div className="detail-art">
      <div className="back">
        <span onClick={() => history.goBack()}>
          <i class="fas fa-chevron-left"></i> Back
        </span>
      </div>
      <Gap height={10} />
      <div className="image">
        <Photo src={art && art.image} width={800} />
      </div>

      <Gap height={30} />
      <div className="buttons">
        <Button
          title="Download"
          backgroundColor="#0ACF83"
          fontColor="#fff"
          width={120}
        />
      </div>
    </div>
  )
}

export default DetailArt
