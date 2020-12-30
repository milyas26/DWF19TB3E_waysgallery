// CSS
import { useState } from 'react'
import './InputDate.css'

const InputDate = ({
  id,
  height,
  onChange,
  name,
  value,
  placeholder,
  fontSize,
}) => {
  const [isDate, setIsDate] = useState(false)
  return (
    <div className="input-wrapper">
      <input
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        className="input"
        style={{ height: height, fontSize: fontSize }}
        name={name}
        value={value}
        required
        type={isDate ? 'date' : 'text'}
        onFocus={() => setIsDate(true)}
        onBlur={() => setIsDate(false)}
      />
    </div>
  )
}

export default InputDate
