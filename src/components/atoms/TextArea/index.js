// CSS
import './TextArea.css'

const TextArea = ({ height, ...rest }) => {
  return (
    <div>
      <textarea {...rest} className="text-area" style={{ height: height }} />
    </div>
  )
}

export default TextArea
