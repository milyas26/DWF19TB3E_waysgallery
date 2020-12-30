import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { API } from '../../../config/api'
import Button from '../../atoms/Button'
import Gap from '../../atoms/Gap'
import NumberFormat from 'react-number-format'
import './TableRow.css'

const TableRowOffer = ({ data, index, updateTable }) => {
  const history = useHistory()
  const [isPopup, setIsPopup] = useState(false)

  const handlePopup = () => {
    setIsPopup(true)
  }

  // APPROVE PROJECT
  const approveProject = async () => {
    try {
      await API.patch(`/approve-project/${data.id}`)
      updateTable()
    } catch (err) {
      console.log(err)
    }
  }

  // CANCEL PROJECT
  const cancelProject = async () => {
    try {
      await API.patch(`/cancel-project/${data.id}`)
      updateTable()
    } catch (err) {
      console.log(err)
    }
  }

  let color = ''
  let action = ''

  if (data.status === 'Waiting Accept') {
    color = '#FF9900'
    action = (
      <>
        <span
          style={{
            cursor: 'pointer',
            padding: '4px 20px',
            backgroundColor: '#E83939',
            borderRadius: '10px',
            color: '#fff',
            margin: '5px',
          }}
          onClick={cancelProject}
        >
          Cancel
        </span>

        <span
          style={{
            cursor: 'pointer',
            padding: '4px 20px',
            backgroundColor: '#0ACF83',
            borderRadius: '10px',
            color: '#fff',
            margin: '5px',
          }}
          onClick={approveProject}
        >
          Approve
        </span>
      </>
    )
  } else if (data.status === 'Success') {
    color = '#78A85A'
    action = (
      <i
        class="fas fa-check"
        style={{
          color: '#fff',
          width: 20,
          height: 20,
          borderRadius: 50,
          backgroundColor: color,
          paddingTop: 4,
        }}
      ></i>
    )
  } else if (data.status === 'Project Is Complete') {
    color = '#0ACF83'
    action = (
      <span style={{ color: color, fontWeight: 600 }}>
        <i
          class="fas fa-hourglass-start"
          style={{
            color: '#fff',
            fontSize: 12,
            backgroundColor: color,
            borderRadius: 50,
            width: 20,
            height: 20,
            paddingTop: 4,
          }}
        ></i>{' '}
        Waiting for Approve...
      </span>
    )
  } else if (data.status === 'Cancel') {
    color = '#E83939'
    action = (
      <i
        class="fas fa-times"
        style={{
          color: '#fff',
          backgroundColor: color,
          width: 20,
          height: 20,
          borderRadius: 50,
          paddingTop: 4,
        }}
      ></i>
    )
  } else if (data.status === 'Waiting Approved Project') {
    color = '#0ACF83'
    action = (
      <span
        onClick={() => history.push(`/send-project/${data.id}`)}
        style={{
          cursor: 'pointer',
          padding: '4px 20px',
          backgroundColor: color,
          borderRadius: '10px',
          color: '#fff',
          margin: '5px',
        }}
      >
        Send Project
      </span>
    )
  }

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{data.orderBy && data.orderBy[0].fullName}</td>
        <td>
          <p onClick={handlePopup} style={{ cursor: 'pointer' }}>
            {data.title}
          </p>
        </td>
        <td>{data.startDate}</td>
        <td>{data.endDate}</td>
        <td style={{ color: color }}>{data.status}</td>
        <td>{action}</td>
      </tr>

      <div className="popup-wrapper" style={{ display: isPopup ? '' : 'none' }}>
        <div
          className="wrapper"
          onClick={() => setIsPopup(false)}
          style={{ display: isPopup ? '' : 'none' }}
        ></div>
        <div className="pop-up">
          <h6>Title : {data.title}</h6>
          <Gap height={10} />
          <p>Description : {data.description}</p>
          <Gap height={20} />
          <p className="price">
            Price :{' '}
            <NumberFormat
              value={data.price}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'Rp. '}
            />
          </p>

          <div className="buttons">
            <Button
              title="Cancel"
              backgroundColor="#FF0742"
              width={80}
              fontSize={13}
              fontColor="#fff"
              padding={10}
              onClick={cancelProject}
            />
            <Gap width={20} />
            <Button
              title="Approve"
              backgroundColor="#0ACF83"
              width={80}
              fontSize={13}
              fontColor="#fff"
              padding={10}
              onClick={approveProject}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default TableRowOffer
