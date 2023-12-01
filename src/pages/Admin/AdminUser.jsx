import React from 'react'
import AdminSidebar from '../../components/Admin/SideBar/AdminSidebar';
import AdminTopbar from '../../components/Admin/TopBar/AdminTopbar';
import { BiDownload, BiEdit, BiEditAlt, BiMenu, BiPlus, BiTrash } from 'react-icons/bi';
import Img from '../../assets/cat2.jpg';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AdminAllProducts, AdminGetUserInfo } from '../../actions/Admin/AdminAction';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Img1 from '../../assets/blog1.jpg'

const AdminUser = () => {
    const { id } = useParams();
    const [user, getUser] = useState(null);
    const userInfo = useSelector(state => state.admin.userinfo);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const auth = useSelector(state => state.admin);
    const authenticate = localStorage.getItem('admin_authenticate');
    useEffect(() => {
      if(!authenticate){
        navigate('/admin-login');
      }
    }, [authenticate])
  

    useEffect(() => {
        if (id) {
            dispatch(AdminGetUserInfo(id));
        }
    }, [id])

    useEffect(() => {
        if (userInfo) {
            getUser(userInfo);
        }
    }, [userInfo])

    const [hamburger, setHamburger] = useState(false);
    const toggleHamburger = () => {
        setHamburger(!hamburger);
    }

    return (
        <>
            <div className='flex w-full h-screen'>
                <AdminSidebar name={'user'} show={hamburger} />
                <div className='flex flex-col w-full h-screen '>
                    <div className='topbar min-h-20 max-h-20 w-full flex  relative justify-between items-center border-b'>
                        <p onClick={toggleHamburger} className=' pl-10 flex items-center justify-center cursor-pointer'><BiMenu size={24} color='darkred' /></p>
                        <div className='pr-5'>
                            <div className='w-9 h-9 cursor-pointer'><img className='h-full w-full rounded-full' src={Img1} alt="" /></div>
                        </div>
                    </div>
                    <div className='flex flex-col pt-5 pl-5 pr-10'>
                        <h1 className='font-dmsans text-lg font-semibold'>User Details</h1>
                        <div className='flex-col mt-5'>

                            <div className='flex flex-col mt-10'>
                                <p className='font-dmsans flex w-[400px] justify-between mt-2'>Name : <span className=' text-[#787878] font-normal'>{user?.fullname || <span className='text-black'>Not Available</span>}</span></p>
                                <p className='font-dmsans flex w-[400px] justify-between mt-2'>Company : <span className=' text-[#787878] font-normal'>{user?.company || <span className='text-black'>Not Available</span>}</span></p>
                                <p className='font-dmsans flex w-[400px] justify-between mt-2'>Email : <span className=' text-[#787878] font-normal'>{user?.email || <span className='text-black'>Not Available</span>}</span></p>
                                <p className='font-dmsans flex w-[400px] justify-between mt-2'>Mobile Number : <span className=' text-[#787878] font-normal'>{user?.phone || <span className='text-black'>Not Available</span>}</span></p>
                                <p className='font-dmsans flex w-[400px] justify-between mt-2'>Address : <span className=' text-[#787878] font-normal'>{user?.address || <span className='text-black'>Not Available</span>}</span></p>
                                <p className='font-dmsans flex w-[400px] justify-between mt-2'>City : <span className='text-[#787878] font-normal'>{user?.city || <span className='text-black'>Not Available</span>}</span></p>
                                <p className='font-dmsans flex w-[400px] justify-between mt-2'>State : <span className=' text-[#787878] font-normal'>{user?.state || <span className='text-black'>Not Available</span>}</span></p>
                                <p className='font-dmsans flex w-[400px] justify-between mt-2'>Country : <span className=' text-[#787878] font-normal'>{user?.country || <span className='text-black'>Not Available</span>}</span></p>
                                <p className='font-dmsans flex w-[400px] justify-between mt-2'>Zipcode : <span className=' text-[#787878] font-normal'>{user?.zipcode || <span className='text-black'>Not Available</span>}</span></p>
                                <p className='font-dmsans flex w-[400px] justify-between mt-2'>UserType : <span className=' text-[#787878] font-normal'>{user?.usertype || <span className='text-black'>Not Available</span>}</span></p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminUser