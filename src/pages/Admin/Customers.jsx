import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../components/Admin/SideBar/AdminSidebar';
import AdminTopbar from '../../components/Admin/TopBar/AdminTopbar';
import { BiDownload, BiEdit, BiTrash, BiZoomIn } from 'react-icons/bi';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { all } from 'axios';
import {toast,ToastContainer} from 'react-toastify';
import { AdminAllCustomers, AdminDeleteCustomerOrders, AdminGetUserInfo } from '../../actions/Admin/AdminAction';

const Customers = () => {

  const navigate = useNavigate();

  const [customers, setCustomers] = useState(null);
  const [page, setPage] = useState(null);
  const [customersCount, setCustomersCount] = useState(null);
  const allcustomers = useSelector(state => state.admin.customers);
  const allCustomersCount = useSelector(state => state.admin.totalcustomers);
  const [next, setNext] = useState(0);

  const auth = useSelector(state => state.admin);
  const authenticate = localStorage.getItem('admin_authenticate');
  useEffect(() => {
    if(!authenticate){
      navigate('/admin-login');
    }
  }, [authenticate])

  const successToast=(msg)=>{
    toast(msg,{position:'top-center'});
  }


  useEffect(() => {
    if (allcustomers) {
      setCustomers(allcustomers)
    }
    if (allCustomersCount) {
      setCustomersCount(allCustomersCount)
      setPage(allCustomersCount / 10)
    }
  }, [allcustomers, allCustomersCount])

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AdminAllCustomers(next,null));
  }, [dispatch])

  const paginationNext = (e) => {
    e.preventDefault();
    if (next >= (customersCount / 10)) {
      return;
    } else {
      let nxt = next + 1;
      setNext(nxt);
      dispatch(AdminAllCustomers(nxt,null)).then(() => {

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
      dispatch(AdminAllCustomers(prev,null)).then(() => {

      })
    }
  }

  const deleteCustomer = (cid) => {
    dispatch(AdminDeleteCustomerOrders(cid)).then(() => {
      dispatch(AdminAllCustomers(0,null));
    })
  }

  const searchCustomer=(keyword)=>{
    if(keyword == ""){
      keyword=null;
    }
    dispatch(AdminAllCustomers(0,keyword));
  }

  return (
    <>
      <div className='flex w-full h-screen'>
        <AdminSidebar name={'customers'} />
        <div className='flex flex-col w-full h-screen '>
          <AdminTopbar />
          <div className='flex flex-col pt-5 pl-5 pr-10'>
            <h1 className='font-dmsans text-lg font-semibold'>Cusotmers</h1>
            {/* <div className='w-full border rounded-lg mt-5 h-20 items-center flex pl-4 pt-4 pb-4'>
              <button className='border h-full w-[100px] rounded-md mr-3 flex justify-center items-center text-sm'><span className='mr-2 rotate-180'><BiDownload size={15} /></span> Export</button>
            </div> */}
            <div className='w-full border rounded-lg mt-5 h-20 items-center flex pl-4 pt-4 pb-4 pr-5'>
              <input onChange={(e)=>{searchCustomer(e.target.value)}} type="text" placeholder='Search by name/email/phone' className='border rounded-lg w-full border-[#1a1a1d45] text-sm h-12 pl-4 active:border-[#1a1a1d45]' />
            </div>
            <div className='flex-col mt-5'>

              <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="p-4">
                        ID
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Joining Date
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Phone
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      customers?.map((customer, key) => (
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td class="w-4 p-4">
                            ...{(customer?._id).slice(-5)}
                          </td>
                          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {(customer?.createdAt).split("T")[0]}
                          </th>
                          <td class="px-6 py-4">
                            {customer?.fullname || <p className='font-semibold'>Not Available</p>}
                          </td>
                          <td class="px-6 py-4">
                            {customer?.email || <p className='font-semibold'>Not Available</p>}
                          </td>
                          <td class="px-6 py-4">
                            +91{customer?.phone || <p className='font-semibold'>Not Available</p>}
                          </td>
                          <td class="px-6 py-4 flex">
                            <span className='mb-2 cursor-pointer hover:scale-110 duration-300 transition-all' onClick={() => { navigate(`/admin-user-info/${customer?._id}`) }}><BiZoomIn size={20} className='mr-2' color='gray' /></span>
                            <span className='mb-2 cursor-pointer hover:scale-110 duration-300 transition-all'><BiEdit size={20} className='mr-2' color='gray' /></span>
                            <span className='mb-2 cursor-pointer hover:scale-110 duration-300 transition-all' onClick={() => {
                              successToast("Deleting Customer Please Wait")
                              deleteCustomer(customer?._id);
                            }}><BiTrash size={20} color='darkred' /></span>
                          </td>
                        </tr>

                      ))
                    }

                  </tbody>
                </table>
                <nav class="flex items-center justify-between pt-4 pl-3 pr-3 mb-3" aria-label="Table navigation">
                  <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span class="font-semibold text-gray-900 dark:text-white">1-{10 > customersCount ? customersCount : 10}</span> of <span class="font-semibold text-gray-900 dark:text-white">{customersCount}</span></span>
                  <ul class="inline-flex -space-x-px text-sm h-8">
                    <li onClick={paginationPrev}>
                      <p class="cursor-pointer flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ">Previous</p>
                    </li>

                    <li onClick={paginationNext}>
                      <p class="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</p>
                    </li>
                  </ul>
                </nav>
              </div>

            </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  )
}

export default Customers