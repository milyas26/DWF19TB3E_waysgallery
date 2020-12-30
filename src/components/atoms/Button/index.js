// CSS
import './Button.css'

const Button = ({
  title,
  isSmall,
  onClick,
  type,
  icon,
  isAddVideo,
  secondary,
  isLoading,
  isDisabled,
}) => {
  const className = []
  if (isSmall) className.push('btn-sm')
  if (type === 'add') {
    return (
      <div className="btn-add">
        <img src={icon} alt="icon" />
        <p
          className="add"
          onClick={onClick}
          style={{ color: isAddVideo ? '#ff7a00' : '#fff' }}
        >
          {title}
        </p>
      </div>
    )
  }

  if (isDisabled || isLoading) {
    if (isDisabled) className.push('disabled')
    return (
      <button
        className={['buttons', className].join(' ')}
        style={{ backgroundColor: '#555' }}
        disabled
      >
        {isLoading ? (
          <>
            <span
              className="spinner-border spinner-border-md mx-5"
              style={{ marginTop: -4 }}
            ></span>
          </>
        ) : (
          { title }
        )}
      </button>
    )
  }

  return (
    <button
      onClick={onClick}
      className={['button', className].join(' ')}
      style={{ backgroundColor: secondary ? '#555' : '' }}
    >
      {title}
    </button>
  )
}

export default Button
