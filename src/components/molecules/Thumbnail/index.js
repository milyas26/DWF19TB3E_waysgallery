import { Card } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const Thumbnail = ({ item }) => {
  const history = useHistory()

  const handleDetail = () => {
    history.push(`/detail-post/${item.id}`)
  }
  return (
    <div className="cards">
      <Card style={{ width: '270px' }} onClick={handleDetail}>
        <Card.Img
          variant="top"
          src={`http://localhost:5000/uploads/images/${
            item.photos[0] && item.photos[0].image
          }`}
        />
      </Card>
    </div>
  )
}

export default Thumbnail
