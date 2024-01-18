import React from 'react'
import Header from '../component/Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../component/Footer/Footer'

export default function Layout() {
  return (
    <div className='space-y-6'>
        <Header />
        <Outlet />
        <Footer />
    </div>
  )
}
