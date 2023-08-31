import React from 'react'
import Header from '../header'

const DefaultComponents = ({children}) => {
  return (
    <>
        <Header />
        {children}
    </>
  )
}

export default DefaultComponents