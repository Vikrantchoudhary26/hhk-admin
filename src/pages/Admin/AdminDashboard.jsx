import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/Admin/SideBar/AdminSidebar';
import AdminTopbar from '../../components/Admin/TopBar/AdminTopbar';
import { BiCart, BiCheck, BiCoinStack, BiEdit, BiLogoStackOverflow, BiRotateRight, BiSearch, BiSolidTruck, BiTrash } from 'react-icons/bi';
import { AdminAllOrders, AdminDashboardAction, AdminDeleteRecentOrders, AdminRecentOrders, changeStatusAction } from '../../actions/Admin/AdminAction';
import { useState } from 'react';
import {toast,ToastContainer} from 'react-toastify'

const AdminDashboard = () => {

  const [recentorders, setRecentOrders] = useState(null);
  const [ordersCount, setOrdersCount] = useState(null);
  const orders = useSelector(state => state.admin.recentorders);
  const allorderscount = useSelector(state => state.admin.totalorders);
  const delivered = useSelector(state => state.admin.delivered);
  const pending = useSelector(state => state.admin.pending);
  const proccessing = useSelector(state => state.admin.proccessing);

  const auth = useSelector(state => state.admin);
  const dashboard = useSelector(state => state.dashboard);
  const authenticate = localStorage.getItem('admin_authenticate');
  useEffect(() => {
    if (!authenticate) {
      navigate('/admin-login');
    }
  }, [authenticate])

  const successToast=(msg)=>{
    toast(msg,{position:'top-center'});
  }

  useEffect(() => {
    if (orders) {
      setRecentOrders(orders);
    }
    if (allorderscount) {
      setOrdersCount(allorderscount);
    }
  }, [orders, allorderscount])

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AdminRecentOrders());
  }, [dispatch, AdminRecentOrders])

  useEffect(()=>{
    dispatch(AdminDashboardAction());
  },[])

  const deleteRecentOrder = (oid) => {
    dispatch(AdminDeleteRecentOrders(oid)).then(() => {
      dispatch(AdminRecentOrders());
    })
  }

  const handleStatusChange=(sid,status)=>{
    dispatch(changeStatusAction(sid,status)).then(()=>{
      dispatch(AdminRecentOrders());
    })
  }

  return (
    <>
      <div className='flex w-full h-screen'>
        <AdminSidebar name={'dashboard'} />
        <div className='flex flex-col w-full h-screen '>
          <AdminTopbar />
          <div className='pt-5 pl-5 pr-5'>
            <h1 className='font-dmsans text-md '>Dashboard Overview</h1>
            <div className='flex justify-between mt-5'>
              <div className='pt-5 flex flex-col w-[300px] rounded-xl h-[190px] bg-[#36b8cf] items-center text-white'>
                <BiCoinStack size={45} />
                <p className='font-semibold mt-2'>Today Orders</p>
                <p className='text-2xl font-semibold mt-2'>₹{dashboard?.todaysale}.00</p>
              </div>
              <div className='pt-5 flex flex-col w-[300px] rounded-xl h-[190px] bg-[#cf7b36] items-center text-white'>
                <BiCoinStack size={45} />
                <p className='font-semibold mt-2'>Yesterday Orders</p>
                <p className='text-2xl font-semibold mt-2'>₹{dashboard?.yesterdaysale}.00</p>
              </div>
              <div className='pt-5 flex flex-col w-[300px] rounded-xl h-[190px] bg-[#364dcf] items-center text-white'>
                <BiCoinStack size={45} />
                <p className='font-semibold mt-2'>This Month</p>
                <p className='text-2xl font-semibold mt-2'>₹{dashboard?.thismonthsale}.00</p>
              </div>
              <div className='pt-5 flex flex-col w-[300px] rounded-xl h-[190px] bg-[#36cf45] items-center text-white'>
                <BiCoinStack size={45} />
                <p className='font-semibold mt-2'>All-Time Sales</p>
                <p className='text-2xl font-semibold mt-2'>₹{dashboard?.totalsale}.00</p>
              </div>
            </div>
            <div className='flex justify-between mt-8'>
              <div className='flex  w-[300px] rounded-xl pl-4 h-[75px] border  items-center '>
                <div className='w-12 h-12 flex justify-center items-center rounded-full bg-[#2424be37] mr-4'>
                  <BiCart size={25} />
                </div>
                <div className='flex flex-col justify-center h-full'>
                  <p className='text-sm font-dmsans'>Total Orders</p>
                  <p className='text-2xl font-bold text-[#1a1a1d]'>{ordersCount}</p>
                </div>
              </div>
              <div className='flex  w-[300px] rounded-xl pl-4 h-[75px] border  items-center '>
                <div className='w-12 h-12 flex justify-center items-center rounded-full bg-[#2424be37] mr-4'>
                  <BiRotateRight size={25} />
                </div>
                <div className='flex flex-col justify-center h-full'>
                  <p className='text-sm font-dmsans'>Orders Pending</p>
                  <p className='text-2xl font-bold text-[#1a1a1d]'>
                    {
                      pending < 10 ? `0${pending}` : pending
                    }
                  </p>
                </div>
              </div>
              <div className='flex  w-[300px] rounded-xl pl-4 h-[75px] border  items-center '>
                <div className='w-12 h-12 flex justify-center items-center rounded-full bg-[#2424be37] mr-4'>
                  <BiSolidTruck size={25} />
                </div>
                <div className='flex flex-col justify-center h-full'>
                  <p className='text-sm font-dmsans'>Orders Processing</p>
                  <p className='text-2xl font-bold text-[#1a1a1d]'>
                    {
                      proccessing < 10 ? `0${proccessing}` : proccessing
                    }
                  </p>
                </div>
              </div>
              <div className='flex  w-[300px] rounded-xl pl-4 h-[75px] border  items-center '>
                <div className='w-12 h-12 flex justify-center items-center rounded-full bg-[#2424be37] mr-4'>
                  <BiCheck size={25} />
                </div>
                <div className='flex flex-col justify-center h-full'>
                  <p className='text-sm font-dmsans'>Orders Delivered</p>
                  <p className='text-2xl font-bold text-[#1a1a1d]'>
                    {
                      delivered < 10 ? `0${delivered}` : delivered
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className='flex flex-col mt-10'>
              <h1 className='font-dmsans text-lg'>Recent Orders</h1>
              {/* RECENT ORDERS TABLE  */}
              <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        Invoice No
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Order Time
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Customer name
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Method
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Amount
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>

                    {recentorders?.map((order, key) => (
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          1010
                        </th>
                        <td class="px-6 py-4 flex">
                          <span>{order?.createdAt.split("T")[0].split("-")[2]}</span>
                          <span className='w-2'></span>
                          <span>{months[(parseInt(order?.createdAt.split("T")[0].split('-')[1]) + 9) - 10]}</span>

                        </td>
                        <td class="px-6 py-4">
                          {order?.uid?.fullname}
                        </td>
                        <td class="px-6 py-4 font-semibold text-black">
                          {order?.paymentmode}
                        </td>
                        <td class="px-6 py-4  font-semibold text-black">
                          ₹{order?.totalprice}
                        </td>
                        <td class="px-4 py-4">
                          <span className={`${order?.status == 'Delivered' ? 'bg-[#00b5186e]' : ''} ${order?.status == 'Pending' ? 'bg-[#ff55007c]' : ''} ${order?.status == 'Proccessing' ? 'bg-[#cccf17b1]' : ''} rounded px-2 font-semibold text-[#000000] py-1`}>
                            {order?.status}
                          </span>
                        </td>
                        <td class="px-4 py-4 flex items-center">
                          <span className='mb-2 cursor-pointer hover:scale-110 duration-300 transition-all' onClick={() => {
                            navigate('/show-order',{
                              state:{
                                order
                              }
                            })
                          }}><BiSearch size={20} color='blue' /></span> 
                          
                          <span className='mb-2 cursor-pointer hover:scale-110 duration-300 transition-all' onClick={() => {
                            successToast("Deleting Order Please Wait...");
                            deleteRecentOrder(order?._id);
                          }}><BiTrash size={20} color='darkred' /></span>

                          <select name="" id="" className='ml-3 h-8 text-xs flex items-center justify-center  border border-[#1a1a1d4a] rounded' onChange={(e)=>{handleStatusChange(order?._id,e.target.value)}}>
                            <option value="" className='relative' hidden defaultChecked={true}>Status</option>
                            <option value="Delivered" className='relative'>Delivered</option>
                            <option value="Pending" className='relative'>Pending</option>
                            <option value="Proccessing" className='relative'>Proccessing</option>
                          </select>
                        </td>

                      </tr>
                    ))

                    }


                  </tbody>
                </table>
              </div>
              <br />
              <br />
              {/* RECENT ORDERS TABLE  */}

            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard