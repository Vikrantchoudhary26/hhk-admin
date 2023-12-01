import React from 'react'
import { BiMenu } from 'react-icons/bi'
import Logo from '../../../assets/logo.png'
import './AdminTopbar.css';
const AdminTopbar = () => {
  return (
    <div className='topbar min-h-20 max-h-20 w-full flex  relative justify-end items-center border-b'>
      <div className='pr-5'>
        <div className='w-12 h-12 cursor-pointer'>
          <a href='/admin-dashboard'>
            <div>
              <img  src={Logo} className='h-full w-full' alt=" " />  </div>
          </a>

        </div>
      </div>
    </div>
  )
}

export default AdminTopbar