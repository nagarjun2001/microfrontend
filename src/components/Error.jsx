import React from 'react'
import errorimg from '../images/Error.png'

function Error() {
  return (
    <div className='flex justify-center align-center'>
      <img src={errorimg} alt="404 Not found" />
    </div>
  )
}

export default Error
