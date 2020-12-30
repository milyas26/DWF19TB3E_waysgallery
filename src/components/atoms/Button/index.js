// CSS
import './Button.css'

const Button = ({
  title,
  onClick,
  secondary,
  width,
  fontColor,
  padding,
  fontSize,
  backgroundColor,
}) => {
  const className = []
  if (secondary) className.push('btn-secondary')
  return (
    <button
      style={{
        width: width,
        color: fontColor,
        padding: padding,
        fontSize: fontSize,
        backgroundColor: backgroundColor,
      }}
      onClick={onClick}
      className={['button', className].join(' ')}
    >
      {title}
    </button>
  )
}

export default Button
