import React, { useEffect } from 'react'
import AdminSidebar from '../../components/Admin/SideBar/AdminSidebar';
import AdminTopbar from '../../components/Admin/TopBar/AdminTopbar';
import {BiDownload} from 'react-icons/bi'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const OurStaff = () => {

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
      <AdminSidebar name={'staff'} />
      <div className='flex flex-col w-full h-screen '>
        <AdminTopbar />
        <div className='flex flex-col pt-5 pl-5 pr-10'>
          <h1 className='font-dmsans text-lg font-semibold'>All Staff</h1>
          <div className='w-full border rounded-lg mt-5 h-20 items-center flex pl-4 pt-4 pb-4 justify-between pr-5'>
            <input type="text" placeholder='Search by name, email, phone' className='font-dmsans rounded-md pl-3 h-12 border border-[#1a1a1d08] bg-[#1a1a1d12] text-sm w-[700px]' />
            <select name="" className='rounded-md pl-3 h-12 border font-dmsans border-[#1a1a1d08] bg-[#1a1a1d12] text-sm w-[440px]' id="">
              <option value="" hidden defaultChecked={true}>Roles</option>
              <option value="">Admin</option>
              <option value="">Cashier</option>
              <option value="">Super Admin</option>
            </select>
          </div>
          <div className='flex-col mt-5'>

            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-4">
                      Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Contact
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Joining data
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Role
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
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td class="px-5 p-4">
                      Shivansh Upadhyay
                    </td>
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      shivanshupadhyay302@gmail.com
                    </th>
                    <td class="px-6 py-4">
                    9988776655
                    </td>
                    <td class="px-6 py-4">
                    Sep 24, 2023
                    </td>
                    <td class="px-6 py-4">
                        Admin
                    </td>                      
                    <td class="px-6 py-4">
                    <span className='bg-[#00b5186e] rounded-xl px-2 font-semibold text-[#218a2f]'>
                        Active
                      </span>
                    </td>
                    <td class="px-6 py-4">
                      <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <nav class="flex items-center justify-between pt-4 pl-3 pr-3 mb-3" aria-label="Table navigation">
                <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span class="font-semibold text-gray-900 dark:text-white">1-10</span> of <span class="font-semibold text-gray-900 dark:text-white">1000</span></span>
                <ul class="inline-flex -space-x-px text-sm h-8">
                  <li>
                    <a href="#" class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                  </li>
                  <li>
                    <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                  </li>
                  <li>
                    <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                  </li>
                  <li>
                    <a href="#" aria-current="page" class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                  </li>
                  <li>
                    <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                  </li>
                  <li>
                    <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                  </li>
                  <li>
                    <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                  </li>
                </ul>
              </nav>
            </div>

          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default OurStaff