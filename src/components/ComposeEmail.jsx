import React from 'react'
import Sidebar from './misc/Sidebar'
import Main from './misc/Main'
import EmailComposePage from './misc/SendEmail'

const ComposeEmail = () => {
  return (
    <div className="flex h-screen">
      <div className="w-2/12 h-screen"><Sidebar /></div>
      <div className="w-10/12"><EmailComposePage /></div>
    </div>
  )
}

export default ComposeEmail;