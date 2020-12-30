import logo from '../../assets/Illustrations/Logo.png'
import landingIllustration from '../../assets/Illustrations/landingIllustration.png'
import Vector1 from '../../assets/Illustrations/Vector 1.png'
import Vector2 from '../../assets/Illustrations/Vector 2.png'
import Vector3 from '../../assets/Illustrations/Vector 3.png'
import Button from '../../components/atoms/Button'
import Gap from '../../components/atoms/Gap'
import './Landing.css'
import FormLogin from '../../components/molecules/FormLogin'
import FormRegister from '../../components/molecules/FormRegister'
import { useState } from 'react'

const Landing = () => {
  const [login, setLogin] = useState(false)
  const [register, setRegister] = useState(false)
  const [modal, setModal] = useState(false)

  const handleLogin = () => {
    setLogin(true)
    setRegister(false)
  }

  const handleRegister = () => {
    setLogin(false)
    setRegister(true)
    setModal(true)
  }

  const handleCloseModal = () => {
    setRegister(false)
    setLogin(false)
    setModal(true)
  }
  return (
    <div className="container landing-page">
      <div className="left">
        <img src={logo} alt="logo" onClick={handleCloseModal} />
        <div className="description">
          <h3 onClick={handleCloseModal}>show your work to inspire everyone</h3>
          <p onClick={handleCloseModal}>
            Ways Exhibition is a website design creators gather to share their
            work with other creators
          </p>
        </div>
        <div className="buttons">
          <Button title="Join Now" onClick={handleRegister} />
          <Gap width={18} />
          <Button title="Login" secondary onClick={handleLogin} />
        </div>
      </div>

      <div className="right">
        <img src={landingIllustration} alt="" onClick={handleCloseModal} />
      </div>

      {/* MODALS */}
      <div className="modal-landing">
        <div className="modal-login" style={{ display: login ? '' : 'none' }}>
          <FormLogin onClickRegister={handleRegister} />
        </div>
        <div
          className="modal-register"
          style={{ display: register ? '' : 'none' }}
        >
          <FormRegister onClickLogin={handleLogin} />
        </div>
      </div>
      <div className="images">
        <img src={Vector1} alt="" className="vector1" />
        <img src={Vector2} alt="" className="vector2" />
        <img src={Vector3} alt="" className="vector3" />
      </div>
    </div>
  )
}

export default Landing
