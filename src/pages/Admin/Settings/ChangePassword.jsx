// import React, { useEffect, useState } from 'react'
// import { BiDownload, BiEdit, BiPlus, BiTrash,BiXCircle } from 'react-icons/bi';
// import Img from '../../../assets/cat2.jpg';
// import { AdminAllCategory, AdminAllCategoryParent, AdminDeleteCategoryOrders } from '../../../actions/Admin/AdminAction';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import AdminSidebar from '../../../components/Admin/SideBar/AdminSidebar';
// import AdminTopbar from '../../../components/Admin/TopBar/AdminTopbar';
// import { adminUpdate, adminUpdateAvatar } from '../../../actions/User/UserAction';
// import {ToastContainer,toast} from 'react-toastify';

import AdminTopbar from '../../../components/Admin/TopBar/AdminTopbar';

import React, { useState } from 'react';
import SideBar from '../../../components/Admin/SideBar/AdminSidebar';
import { BiSolidBell, BiX, BiMenu, BiLeftArrowAlt } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const errorToast = (msg) => {
    toast(`${msg}`, { position: toast.POSITION.TOP_CENTER });
  };

  const auth = useSelector((state) => state.user);

  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      errorToast("Passwords don't match!");
    }
  };

  const [hamburger, setHamburger] = useState(false);
  const toggleHamburger = () => {
    setHamburger(!hamburger);
  };

  const navigate = useNavigate();

  return (
    <div>
     <AdminTopbar />
      <div className='flex'>
        <SideBar name={"changepass"} show={hamburger} />

        <div className='flex flex-col w-full h-screen justify-start items-center sm:pl-10 sm:pr-5 pr-5 pl-5'>
          {/* PROFILE HEADER  */}
          <div className='flex justify-between w-full pt-3 pb-3 items-center'>
            <div className='flex justify-between items-center w-full h-full'>
              <div className='flex sm:hidden z-50 pl-5' onClick={toggleHamburger}>
                {hamburger ? <BiX size={23} /> : <BiMenu size={23} />}
              </div>
              {/* <div className='hidden sm:block' onClick={() => { navigate('/') }}>
                <BiLeftArrowAlt size={28} />
              </div> */}
              <div className='flex justify-center items-center flex-row-reverse'>
                {/* <div className='h-10 w-10 rounded-full flex items-center justify-center mr-4 bg-[#1a1a1d12]'>
                  <BiSolidBell size={20} color='gray' />
                </div> */}
                <div className='flex rounded-md'>
                  <div className='flex flex-col text-xs font-semibold mr-2'>
                    <p>{auth?.user?.fullname}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* PROFILE HEADER  */}

          {/* MODAL  */}
          <div className='w-full h-[500px] flex items-center justify-center'>
            <form
              className='border border-[#4a4a5318] shadow-xl w-[600px] h-[330px] sm:h-[390px] rounded-2xl flex flex-col sm:pl-20 sm:pr-20 pl-5 pr-5'
              onSubmit={onSubmitHandler}
            >
              <div className='w-full text-pink font-dmsans text-lg sm:text-[27px] h-24 flex items-center'>
                Change Password
              </div>
              <input
                type='password'
                placeholder='Old Password'
                className='border border-gray rounded-full font-dmsans sm:text-sm pl-5 text-xs h-9 sm:h-12 mb-4'
                onChange={(e) => {
                  setOldPassword(e.target.value);
                }}
              />
              <input
                type='password'
                placeholder='New Password'
                className='border border-gray rounded-full font-dmsans sm:text-sm text-xs pl-5 h-9 sm:h-12 mb-4'
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
              <input
                type='password'
                placeholder='Confirm Password'
                className='border border-gray rounded-full font-dmsans text-xs sm:text-sm pl-5 h-9 sm:h-12 mb-4'
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              <button
                className='w-full rounded-full h-9 sm:h-12 bg-darkred text-white font-dmsans text-sm'
                type='submit'
              >
                Change Password
              </button>
            </form>
          </div>
          {/* MODAL  */}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ChangePassword;
