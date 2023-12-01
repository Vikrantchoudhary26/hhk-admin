import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../components/Admin/SideBar/AdminSidebar';
import AdminTopbar from '../../components/Admin/TopBar/AdminTopbar';
import { BiDownload, BiEdit, BiMessage, BiPlus, BiTrash } from 'react-icons/bi';
import Img from '../../assets/cat2.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AdminAllCategory, deleteGiftBoxAction, deleteNotifications, getGiftBoxAction, getNotifications } from '../../actions/Admin/AdminAction';
import { toast, ToastContainer } from 'react-toastify';
import { AiOutlineDelete } from 'react-icons/ai';

const AdminInbox = () => {

  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState(null);
  const [contact_notifications, setContactNotifications] = useState(null);
  const allnotifications = useSelector(state => state.notification.notifications);

  useEffect(() => {
    dispatch(getNotifications());
  }, [])

  useEffect(() => {
    if (allnotifications) {
      setNotifications(allnotifications);
      const res = allnotifications.filter(filterContactUs);
      function filterContactUs(p) {
        return p.type == "Contact";
      }
      setContactNotifications(res);
      console.log(contact_notifications)
    }
  }, [allnotifications])

  const deleteNotification=(id) => {
    dispatch(deleteNotifications(id)).then(() => {
      dispatch(getNotifications());
    })
  }

  return (
    <>
      <div className='flex w-full h-screen '>
        <AdminSidebar name={'inbox'} />
        <div className='flex flex-col w-full h-screen '>
          <AdminTopbar />
          <div className='flex flex-col'>
            <div className='w-full flex pl-5 pt-5 font-dmsans text-lg items-center'><BiMessage className='mr-2' />Inbox</div>
            <div className='w-full min-h-40  mt-8'>
              {
                contact_notifications?.map((n, key) => (
                  <div key={key} className='border w-full min-h-[50px] flex items-center justify-between'>
                    <div className='flex items-center'>
                      <div className='ml-2 cursor-pointer' onClick={() => {
                        deleteNotification(n._id);
                      }}><AiOutlineDelete size={18} color='darkred' /></div>
                      <p className='ml-2 font-dmsans capitalize w-60 flex'>{n?.name}</p>
                      <p className='text-xs text-[#585858] text-left'>{n?.message}</p>
                    </div>
                    <div className='font-dmsans text-xs mr-3 min-w-[120px]'>{n?.createdAt?.split("T")[0]}</div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default AdminInbox