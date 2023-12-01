import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../components/Admin/SideBar/AdminSidebar';
import AdminTopbar from '../../components/Admin/TopBar/AdminTopbar';
import { BiDownload, BiEdit, BiPlus, BiTrash } from 'react-icons/bi';
import Img from '../../assets/cat2.jpg';
import { AdminAllCategory, AdminDeleteCategoryOrders, deleteCouponAction, getCouponAction } from '../../actions/Admin/AdminAction';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {toast,ToastContainer} from 'react-toastify';

const AdminCoupons = () => {

  const navigate = useNavigate();
  const [coupons, setCoupons] = useState(null);
  const [couponsCount, setCouponsCount] = useState(null);
  const allcoupons = useSelector(state => state.coupon.coupons);
  const allcouponscount = useSelector(state => state.coupon.totalcoupons);

  const authenticate = localStorage.getItem('admin_authenticate');
  useEffect(() => {
    if (!authenticate) {
      navigate('/admin-login');
    }
  }, [authenticate])
  const successToast=(msg)=>{
    toast(msg,{position:'top-center'});
  }



  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCouponAction(next));
  }, [dispatch])

  useEffect(() => {
    if (allcoupons) {
      setCoupons(allcoupons);
    }
    if (allcouponscount) {
      setCouponsCount(allcouponscount);
    }
  }, [allcoupons, allcouponscount])


  const deleteCoupon = (cid) => {
    dispatch(deleteCouponAction(cid)).then(() => {
      dispatch(getCouponAction(next));
    })
  }

  const [next, setNext] = useState(0);

  const paginationNext = (e) => {
    e.preventDefault();
    if (next >= (couponsCount / 10)) {
      return;
    } else {
      let nxt = next + 1;
      setNext(nxt);
      dispatch(getCouponAction(nxt)).then(() => {
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
      dispatch(getCouponAction(prev)).then(() => {

      })
    }
  }



  return (
    <>
      <div className='flex w-full h-screen'>
        <AdminSidebar name={'coupons'} />
        <div className='flex flex-col w-full h-screen '>
          <AdminTopbar />
          <div className='flex flex-col pt-5 pl-5 pr-10'>
            <h1 className='font-dmsans text-lg font-semibold'>Coupons</h1>
            <div className='w-full border rounded-lg mt-5 h-20 items-center flex pl-4 pt-4 pb-4 justify-end pr-5'>
              {/* <div className='flex h-10'>
                <button className='border h-full w-[100px] rounded-md mr-3 flex justify-center items-center text-sm'><span className='mr-2 rotate-180'><BiDownload size={15} /></span> Export</button>
              </div> */}
              <Link to={'/admin-add-coupons'}><button className='text-white h-11 hover:scale-110 transition-all duration-300 w-[200px] rounded-md flex justify-center items-center text-sm font-dmsans  bg-darkred'>Add Coupon<span className='ml-2'><BiPlus size={15} /></span></button></Link>

            </div>

            <div className='w-full border rounded-lg mt-5 h-20 items-center flex pl-4 pt-4 pb-4 justify-between pr-5'>
              <input type="text" className='bg-[#1a1a1d12] border-[#1a1a1d00] text-sm font-dmsans pl-3 rounded-lg h-12 w-full' placeholder='Search by Category Name' />
            </div>
            <div className='flex-col mt-5'>

              <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-4">
                        name
                      </th>
                      <th scope="col" class="px-6 py-4">
                        type
                      </th>
                      <th scope="col" class="px-6 py-3">
                        discount
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Min Purchase/Products
                      </th>
                      <th scope="col" class="px-6 py-3">
                        description
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className='text-black'>
                    {
                      coupons?.map((coupon, key) => (

                        <tr key={key} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <th scope="row" class="uppercase px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {coupon?.name}
                          </th>
                          <td class="px-5 p-4 flex  items-center">
                            {coupon?.type}
                          </td>
                          <td class="px-6 py-4">
                            {coupon?.discount}
                          </td>
                          <td class="px-6 py-4">
                            {'₹' + (coupon?.minPurchase) + ' / ' + (coupon?.minProducts)}
                          </td>
                          <td class="px-6 py-4">
                            {coupon?.description}
                          </td>
                          <td class="px-4 py-4 flex">
                            <span className='mb-2 cursor-pointer hover:scale-110 duration-300 transition-all'><BiEdit size={20} className='mr-2' color='blue' /></span>
                            <span className='mb-2 cursor-pointer hover:scale-110 duration-300 transition-all' onClick={() => {
                              successToast('Deleting Coupon Please Wait')
                              deleteCoupon(coupon?._id);
                            }}><BiTrash size={20} color='darkred' /></span>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
                <nav class="flex items-center justify-between pt-4 pl-3 pr-3 mb-3" aria-label="Table navigation">
                  <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span class="font-semibold text-gray-900 dark:text-white">1-{couponsCount < 10 ? couponsCount : 10}</span> of <span class="font-semibold text-gray-900 dark:text-white">{couponsCount}</span></span>
                  <ul class="inline-flex -space-x-px text-sm h-8">
                    <li onClick={paginationPrev}>
                      <p class=" cursor-pointer flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</p>
                    </li>
                    <li onClick={paginationNext}>
                      <p class=" cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</p>
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

export default AdminCoupons