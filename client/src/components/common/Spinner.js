import spinner from './spinner.gif'
import React from 'react'

export default function Spinner() {
  return (
    <div>
      <img
       src={spinner} 
       alt="loading..."
       style={{width:'200px', margin: 'auto', display: 'block'}}
       />
    </div>
  )
}

