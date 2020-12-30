import React from 'react'
import './ProgressBar.css'

const ProgressBar = ({ done }) => {
  return (
    <div style={{ height: '100px', width: `100%` }}>
      <div
        className="progress-done"
        style={{
          width: `${done}%`,
          backgroundColor: '#555',
          height: 100,
          paddingTop: 20,
          textAlign: 'center',
          color: '#fff',
          fontSize: 18,
          fontWeight: '600',
        }}
      >
        {done}%
      </div>
    </div>
  )
}

export default ProgressBar
