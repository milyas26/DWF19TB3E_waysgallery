// CSS
import './Input.css'

const Input = ({
  id,
  height,
  onChange,
  name,
  type,
  value,
  placeholder,
  fontSize,
}) => {
  return (
    <div className="input-wrapper">
      <input
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        className="input"
        style={{ height: height, fontSize: fontSize }}
        name={name}
        type={type}
        value={value}
        required
      />
    </div>
  )
}

export default Input
