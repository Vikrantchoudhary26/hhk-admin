import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../components/Admin/SideBar/AdminSidebar';
import AdminTopbar from '../../components/Admin/TopBar/AdminTopbar';
import { BiDownload, BiEdit, BiPlus, BiTrash } from 'react-icons/bi';
import Img from '../../assets/cat2.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AdminAllCategory, deleteGiftBoxAction, getGiftBoxAction } from '../../actions/Admin/AdminAction';
import {toast,ToastContainer} from 'react-toastify';

const AdminGiftBox = () => {

  const navigate = useNavigate();
  const [giftboxes, setGiftBoxes] = useState(null);
  const [giftboxesCount, setGiftBoxesCount] = useState(null);
  const allgiftboxes = useSelector(state => state.giftbox.giftboxes);
  const allgiftboxescount = useSelector(state => state.giftbox.totalgiftboxes);
  const dispatch = useDispatch();

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
    if (allgiftboxes) {
      setGiftBoxes(allgiftboxes);
    }
    if (allgiftboxescount) {
      setGiftBoxesCount(allgiftboxescount)
    }
  }, [allgiftboxes, allgiftboxescount])


  const deleteGiftBox = (gid) => {
    dispatch(deleteGiftBoxAction(gid)).then(() => {
      dispatch(getGiftBoxAction(next));
    })
  }

  const editGiftBox = (box) => {
    // Navigate to the edit gift box page or open a modal
    // You can implement this based on your application structure

    
    navigate(`/admin-edit-giftbox/${box._id}`);
  };

  const [next, setNext] = useState(0);

  const paginationNext = (e) => {
    e.preventDefault();
    if (next >= giftboxesCount / 10) {
      return;
    } else {
      let nxt = next + 1;
      setNext(nxt);
      dispatch(getGiftBoxAction(next)).then(() => {});
    }
  };

  const paginationPrev = (e) => {
    e.preventDefault();
    if (next <= 0) {
      return;
    } else {
      let prev = next - 1;
      setNext(prev);
      dispatch(getGiftBoxAction(prev)).then(() => {});
    }
  };


  useEffect(() => {
    dispatch(getGiftBoxAction(0));
  }, []);



  return (
    <>
      <div className='flex w-full h-screen'>
        <AdminSidebar name={'giftbox'} />
        <div className='flex flex-col w-full h-screen '>
          <AdminTopbar />
          <div className='flex flex-col pt-5 pl-5 pr-10'>
            <h1 className='font-dmsans text-lg font-semibold w-full flex'>Gift Boxes</h1>
            <div className='w-full border rounded-lg mt-5 h-20 items-center flex pl-4 pt-4 pb-4 justify-end pr-5'>
              <Link to={'/admin-add-giftbox'}>
                <button className='text-white h-11 hover:scale-110 transition-all duration-300 w-[200px] rounded-lg flex justify-center items-center text-sm font-dmsans  bg-darkred'>
                  Add GiftBox<span className='ml-2'>
                    <BiPlus size={15} />
                  </span>
                </button>
              </Link>
            </div>

            <div className='flex-col mt-5'>

              <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-4">
                        Image
                      </th>
                      <th scope="col" class="px-6 py-4">
                        name
                      </th>
                      <th scope="col" class="px-6 py-3">
                        price
                      </th>
                      <th scope="col" class="px-6 py-3">
                        quantity
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className='text-black'>
                    {
                      giftboxes?.map((box, key) => (

                        <tr key={key} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <th scope="row" class="uppercase px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <div className='h-12 w-12 rounded-full border'><img className='h-full w-full rounded-full' src={box?.images[0]?.img} alt="" /></div>
                          </th>
                          <td class="px-5 p-4 flex  items-center capitalize">
                            {box?.name}
                          </td>
                          <td class="px-6 py-4 capitalize">
                            ₹{box?.price}
                          </td>
                          <td class="px-6 py-4 capitalize">
                            {box?.quantity}
                          </td>
                          <td class='px-4 py-4 flex'>
                          <Link to={`/admin-edit-giftbox/${box._id}`}>
                            <span className='mb-2 cursor-pointer hover:scale-110 duration-300 transition-all'>
                              <BiEdit size={20} className='mr-2' color='blue' />
                            </span>
                          </Link>
                        <span
                          className='mb-2 cursor-pointer hover:scale-110 duration-300 transition-all'
                          onClick={() => {
                            successToast('Deleting GiftBox Please Wait');
                            deleteGiftBox(box?._id);
                          }}
                        >
                          <BiTrash size={20} color='darkred' />
                        </span>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
                <nav class="flex items-center justify-between pt-4 pl-3 pr-3 mb-3" aria-label="Table navigation">
                  <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span class="font-semibold text-gray-900 dark:text-white">1-{giftboxesCount < 10 ? giftboxesCount : 10}</span> of <span class="font-semibold text-gray-900 dark:text-white">{giftboxesCount}</span></span>
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

export default AdminGiftBox