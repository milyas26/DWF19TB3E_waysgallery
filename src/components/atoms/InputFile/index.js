// React Packages
import { useRef } from 'react'

// CSS
import './InputFile.css'

const InputFile = ({ label, icon, onChange, type, name }) => {
  const hiddenFileInput = useRef(null)
  const handleClick = (e) => {
    hiddenFileInput.current.click()
  }
  return (
    <div className="input-file-wrapper">
      <div className="input-file">
        <label htmlFor="" onClick={handleClick}>
          {label}
        </label>
        <input
          type={type}
          name={name}
          className="input"
          ref={hiddenFileInput}
          onChange={onChange}
        />
        <img src={icon} alt="" />
      </div>
    </div>
  )
}

export default InputFile
