import React from 'react'
import Form from '../Components/Form'

const Contact = () => {
  return (
    <div style={{
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: 'calc(90vh - 110px)', 
      justifyContent: 'center',
    }}>
      <Form/>
    </div>
  )
}

export default Contact