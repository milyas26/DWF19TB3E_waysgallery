// CSS
import './Photo.css'

const Photo = ({ src, width, height, isCircle, onClick }) => {
  const className = []
  if (isCircle) className.push('circle')

  return (
    <div className={['photo', className].join(' ')} onClick={onClick}>
      <img
        style={{ width: width, height: height }}
        src={`http://localhost:5000/uploads/images/${src}`}
      />
    </div>
  )
}

export default Photo
