import './MyVideos.css'

const Description = ({ user }) => {
  return (
    <div className="description">
      <p>{user.description}</p>
    </div>
  )
}

export default Description
