// CSS
import './TextArea.css'

const TextArea = ({ height, fontSize, ...rest }) => {
  return (
    <div>
      <textarea
        {...rest}
        className="text-area"
        style={{ height: height, fontSize: fontSize }}
      />
    </div>
  )
}

export default TextArea
