// React Packages
import { Link } from 'react-router-dom'

// CSS
import './SidebarMenu.css'

const SidebarMenu = ({ icon, label, isActive, onClick, to }) => {
  const className = []
  if (isActive) className.push('active')
  return (
    <Link to={to} className="link-sidebar-menu" onClick={onClick}>
      <div className="wrapper-menu">
        <img src={icon} alt="Home Icon" style={{ width: 24, height: 24 }} />
        <p className={['label', className].join(' ')}>{label}</p>
      </div>
    </Link>
  )
}

export default SidebarMenu
