import { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Button from '../../components/atoms/Button'
import Gap from '../../components/atoms/Gap'
import Input from '../../components/atoms/Input'
import InputDate from '../../components/atoms/InputDate'
import TextArea from '../../components/atoms/TextArea'
import Navbar from '../../components/molecules/Navbar'
import { API } from '../../config/api'
import NumberFormat from 'react-number-format'
import './Hire.css'

const Hire = () => {
  const history = useHistory()
  const { id } = useParams()
  const [message, setMessage] = useState(null)

  const handleChangeText = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    price: '',
  })

  const { title, description, startDate, endDate, price } = formData

  console.log(formData)
  console.log(id)

  const addHire = async (e) => {
    e.preventDefault()

    try {
      const body = JSON.stringify({
        title,
        description,
        startDate,
        endDate,
        price,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const response = await API.post(`/hire/${id}`, body, config)
      setMessage(response.data.message)

      setFormData({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        price: '',
      })
      setTimeout(() => {
        setMessage(null)
      }, 2000)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="container hire">
      <Navbar />
      <div className="content">
        <Gap height={40} />
        <div className="hire-wrapper">
          <Input
            id="title"
            placeholder="Title"
            name="title"
            value={title}
            onChange={handleChangeText}
          />
          <Gap height={20} />
          <TextArea
            id="description"
            placeholder="Description job"
            name="description"
            value={description}
            onChange={handleChangeText}
          />
          <Gap height={10} />
          <div className="date-time">
            <div className="date">
              <InputDate
                placeholder="Start Project"
                id="startDate"
                name="startDate"
                value={startDate}
                type="date"
                onChange={handleChangeText}
              />
            </div>
            <Gap width={50} />
            <div className="date">
              <InputDate
                placeholder="End Project"
                id="endDate"
                type="date"
                value={endDate}
                name="endDate"
                onChange={handleChangeText}
              />
            </div>
          </div>
          <Gap height={20} />
          <Input
            placeholder="Price"
            id="price"
            type="number"
            name="price"
            value={price}
            onChange={handleChangeText}
          />
          <Gap height={20} />

          <div className="buttons">
            <Button
              title="Cancel"
              secondary
              onClick={() => history.push('/home')}
            />
            <Gap width={20} />
            <Button title="Bidding" onClick={addHire} />
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

export default Hire
