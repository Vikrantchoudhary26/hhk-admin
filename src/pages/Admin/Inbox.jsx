import React, { useEffect } from 'react'
import AdminSidebar from '../../components/Admin/SideBar/AdminSidebar';
import AdminTopbar from '../../components/Admin/TopBar/AdminTopbar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Inbox = () => {

  const navigate = useNavigate();
  const auth = useSelector(state => state.admin);
  const authenticate = localStorage.getItem('admin_authenticate');
  useEffect(() => {
    if(!authenticate){
      navigate('/admin-login');
    }
  }, [authenticate])

  return (
    <>
      <div className='flex w-full h-screen'>
        <AdminSidebar name={'inbox'} />
        <div className='flex flex-col w-full h-screen '>
          <AdminTopbar />
        </div>
      </div>
    </>
  )
}

export default Inbox