import { Card } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import './CardArt.css'

const ThumbnailArt = ({ item }) => {
  const history = useHistory()

  const handleArt = () => {
    history.push(`/detail-art/${item.id}`)
  }
  return (
    <div className="cards">
      <Card style={{ width: '270px' }} onClick={handleArt}>
        <Card.Img
          variant="top"
          src={`http://localhost:5000/uploads/images/${item.image}`}
        />
      </Card>

      {/* <div className="popup-wrapper-art">
        <div className="wrapper-art"></div>
        <div className="pop-up-art">
          <Photo src={item.image} width={600} />
        </div>
      </div> */}
    </div>
  )
}

export default ThumbnailArt
