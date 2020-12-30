// React Packages
import { Link } from 'react-router-dom'

// CSS
import './404.css'

const notFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h4>PAGE NOT FOUND!</h4>
      <Link to="/home">
        <button className="button-404">BACK TO HOME</button>
      </Link>
    </div>
  )
}

export default notFound
