import React from 'react'
import Sidebar from './misc/Sidebar'
import Main from './misc/Main'
import {ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  return (
    <div class="flex h-screen">
  
      <div class="w-2/12 h-screen"><Sidebar /></div>
      <div class="w-10/12"><Main /></div>
      <ToastContainer/>
    </div>
  )
}

export default Dashboard