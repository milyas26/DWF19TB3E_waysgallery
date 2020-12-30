// React Packages
import IconPlus from '../../../assets/icons/plus.svg'

// CSS
import './InputFile.css'

const InputFile = ({ src, width, height }) => {
  return (
    <div className="kotak-wrapper">
      <div
        className="kotak-file-input"
        style={{ height: height, width: width }}
      >
        <img src={src ? src : IconPlus} />
      </div>
    </div>
  )
}

export default InputFile
