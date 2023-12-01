import React from 'react'
import AdminSidebar from '../../components/Admin/SideBar/AdminSidebar';
import AdminTopbar from '../../components/Admin/TopBar/AdminTopbar';
import { BiDownload, BiEdit, BiSearch, BiSearchAlt2, BiTrash } from 'react-icons/bi';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AdminAllOrders, AdminDeleteRecentOrders, AdminRecentOrders, changeStatusAction } from '../../actions/Admin/AdminAction';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai';

const AdminOrders = () => {

  const navigate = useNavigate();
  const [orders, setOrders] = useState(null);
  const [ordersCount, setOrdersCount] = useState(null);
  const allorders = useSelector(state => state.admin.allorders)
  const allorderscount = useSelector(state => state.admin.totalorders)

  const auth = useSelector(state => state.admin);
  const authenticate = localStorage.getItem('admin_authenticate');
  useEffect(() => {
    if (!authenticate) {
      navigate('/admin-login');
    }
  }, [authenticate])

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AdminAllOrders(0, null, null));
  }, [dispatch, AdminAllOrders])

  const successToast = (msg) => {
    toast(msg, { position: 'top-center' });
  }

  useEffect(() => {
    if (allorders) {
      setOrders(allorders);
    }
    if (allorderscount) {
      setOrdersCount(allorderscount)
    }
  }, [allorders, allorderscount])

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const deleteOrder = (oid) => {
    dispatch(AdminDeleteRecentOrders(oid)).then(() => {
      dispatch(AdminAllOrders(0, null, null));
    })
  }
  const [next, setNext] = useState(0);

  const paginationNext = (e) => {
    e.preventDefault();
    if (next >= (ordersCount / 10)) {
      return;
    } else {
      let nxt = next + 1;
      setNext(nxt);
      dispatch(AdminAllOrders(nxt, null, null)).then(() => {

      })
    }
  }

  const paginationPrev = (e) => {
    e.preventDefault();
    if (next <= 0) {
      return;
    } else {
      let prev = next - 1;
      setNext(prev);
      dispatch(AdminAllOrders(prev, null, null)).then(() => {

      })
    }
  }

  const handleStatusChange = (status) => {
    dispatch(AdminAllOrders(0, null, status));
  }
  const handleSearch = (name) => {
    if (name == "") {
      name = null;
    }
    dispatch(AdminAllOrders(0, name, null));
  }

  const handleStatusChangeOnChange = (sid, status) => {
    dispatch(changeStatusAction(sid, status)).then(() => {
      dispatch(AdminAllOrders(0, null, null));
    })
  }
  return (
    <>
      <div className='flex w-full h-screen'>
        <AdminSidebar name={'orders'} />
        <div className='flex flex-col w-full h-screen '>
          <AdminTopbar />
          <div className='flex flex-col pt-5 pl-5 pr-10'>
            <h1 className='font-dmsans text-lg font-semibold'>Orders</h1>
            <div className='w-full border rounded-lg mt-5 h-20 items-center flex pl-4 pt-4 pb-4 justify-between pr-5'>
              <input onChange={(e) => { handleSearch(e.target.value) }} type="text" placeholder='Search by Customer Name' className='font-dmsans rounded-lg pl-3 h-12 border border-[#1a1a1d08] bg-[#1a1a1d12] text-sm w-[360px]' />
              <select onChange={(e) => { handleStatusChange(e.target.value) }} name="" className='rounded-lg pl-3 h-12 border font-dmsans border-[#1a1a1d08] bg-[#1a1a1d12] text-sm w-[360px]' id="">
                <option value="all">All Status</option>
                <option value="Delivered">Delivered</option>
                <option value="Pending">Pending</option>
                <option value="Proccessing">Processing</option>
              </select>
              <button className=' bg-darkred  h-full w-[360px] rounded-lg flex justify-center items-center text-sm text-white font-dmsans'>Download All Order <span className='ml-2'><BiDownload size={18} /></span></button>
            </div>
            <div className='flex-col mt-5'>

              <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 p-4 w-20">
                        <span className='flex w-[70px]'>Invoice No</span>
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Order Time
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Customer Name
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
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      orders?.map((order, key) => (

                        <tr key={key} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td class="w-4 p-4">
                            10101
                          </td>
                          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex flex-col">
                            <span>
                              {order?.createdAt.split('T')[0].split('-')[2]},
                              {months[(parseInt(order?.createdAt.split('T')[0].split('-')[1]) + 9) - 10]}&nbsp;&nbsp;
                              {order?.createdAt.split('T')[0].split('-')[0]}
                            </span>
                            <span className="text-xs mt-1 text-[#787878]">
                              {order?.createdAt.split("T")[1].split(':')[0]}:
                              {order?.createdAt.split("T")[1].split(':')[1]}:
                              {order?.createdAt.split("T")[1].split(':')[2].split('.')[0]}
                            </span>
                          </th>
                          <td class="px-6 py-4">
                            {order?.uid?.fullname}
                          </td>
                          <td class="px-6 py-4">
                            {order?.paymentmode}
                          </td>
                          <td class="px-6 py-4">
                            ₹{order?.totalprice}
                          </td>
                          <td class="px-6 py-4">
                            <span className={`${order?.status == 'Delivered' ? 'bg-[#00b5186e]' : ''} ${order?.status == 'Pending' ? 'bg-[#ff55007c]' : ''} ${order?.status == 'Proccessing' ? 'bg-[#cccf17b1]' : ''} rounded-lg px-2 font-semibold text-[#000000] py-1`}>
                              {order?.status}
                            </span>
                          </td>
                          <td class="px-4 py-4 flex">
                            {/* <span className='mb-2 cursor-pointer hover:scale-110 duration-300 transition-all'><BiEdit size={20} className='mr-2' color='blue' /></span> */}
                            <span className='mb-2 cursor-pointer hover:scale-110 duration-300 transition-all' onClick={() => {
                              navigate('/show-order', {
                                state: {
                                  order
                                }
                              })
                            }}>
                             

                              <AiOutlineEye size={20} color='blue' />
                            </span>

                          
                            <span className='mb-2 cursor-pointer hover:scale-110 duration-300 transition-all' onClick={() => {
                              successToast("Deleting Order Please Wait")
                              deleteOrder(order?._id);
                            }}><BiTrash size={20} color='darkred' /></span>
                            <select name="" id="" className='ml-3 h-8 text-xs flex items-center justify-center  border border-[#1a1a1d4a] rounded-lg' onChange={(e) => { handleStatusChangeOnChange(order?._id, e.target.value) }}>
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
                <nav class="flex items-center justify-between pt-4 pl-3 pr-3 mb-3" aria-label="Table navigation">
                  <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span class="font-semibold text-gray-900 dark:text-white">1-10</span> of <span class="font-semibold text-gray-900 dark:text-white">{ordersCount}</span></span>
                  <ul class="inline-flex -space-x-px text-sm h-8">
                    <li className='cursor-pointer' onClick={paginationPrev}>
                      <p class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</p>
                    </li>
                    <li className='cursor-pointer' onClick={paginationNext}>
                      <p class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</p>
                    </li>
                  </ul>
                </nav>
              </div>

            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default AdminOrders