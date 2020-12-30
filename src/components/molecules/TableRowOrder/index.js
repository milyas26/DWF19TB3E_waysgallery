import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../atoms/Button'
import Gap from '../../atoms/Gap'
import NumberFormat from 'react-number-format'
import './TableRow.css'

const TableRowOrder = ({ data, index }) => {
  const history = useHistory()

  // SHOW POPUP
  const [isPopup, setIsPopup] = useState(false)
  const handlePopup = () => {
    setIsPopup(true)
  }

  console.log(data.status)

  const idProject = data.Project && data.Project.id

  // CONDITIONAL RENDERING ACTIONS
  let color = ''
  let action = ''

  if (data.status === 'Waiting Accept') {
    color = '#FF9900'
    action = (
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
      ></i>
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
    color = '#E83939'
    action = (
      <span>
        <i
          class="fas fa-hourglass-start"
          style={{
            color: color,
            fontSize: 12,
          }}
        ></i>{' '}
        Please wait...
      </span>
    )
  } else if (data.status === 'Project Is Complete') {
    color = '#0ACF83'
    action = (
      <span
        onClick={() => history.push(`/view-project/${idProject}`)}
        style={{
          cursor: 'pointer',
          padding: '4px 20px',
          backgroundColor: color,
          borderRadius: '10px',
          color: '#fff',
          margin: '5px',
        }}
      >
        View Project
      </span>
    )
  }

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{data.orderTo && data.orderTo[0].fullName}</td>
        <td>
          <p onClick={handlePopup} style={{ cursor: 'pointer' }}>
            {data.title}
          </p>{' '}
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

          <span
            onClick={() => history.push(`/view-project/${idProject}`)}
            style={{
              cursor: 'pointer',
              padding: '4px 20px',
              backgroundColor: color,
              borderRadius: '10px',
              color: '#fff',
              margin: '5px',
              display: data.status === 'Success' ? '' : 'none',
            }}
          >
            View Project
          </span>

          <div className="buttons">
            <Button
              title="Close"
              backgroundColor="#FF0742"
              width={80}
              fontSize={13}
              fontColor="#fff"
              padding={10}
              onClick={() => setIsPopup(false)}
            />
            <Gap width={20} />
          </div>
        </div>
      </div>
    </>
  )
}

export default TableRowOrder
