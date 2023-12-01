import React from 'react'
import AdminSidebar from '../../components/Admin/SideBar/AdminSidebar';
import AdminTopbar from '../../components/Admin/TopBar/AdminTopbar';
import { BiDownload, BiEdit, BiEditAlt, BiPlus, BiTrash } from 'react-icons/bi';
import Img from '../../assets/cat2.jpg';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AdminAllCategory, AdminAllCategoryParent, AdminAllProducts, AdminDeleteProductOrders } from '../../actions/Admin/AdminAction';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const AdminProducts = () => {

  const navigate = useNavigate();
  const [products, setProducts] = useState(null);
  const [productsCount, setProductsCount] = useState(null);
  const allproducts = useSelector(state => state.admin.products);
  const allproductscount = useSelector(state => state.admin.totalproducts);
  const allcategory = useSelector(state => state.admin.allcategory)
  const [next, setNext] = useState(0);


  const auth = useSelector(state => state.admin);
  const authenticate = localStorage.getItem('admin_authenticate');
  useEffect(() => {
    if (!authenticate) {
      navigate('/admin-login');
    }
  }, [authenticate])

  const successToast = (msg) => {
    toast(msg, { position: 'top-center' });
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AdminAllProducts(next, null, null));
  }, [dispatch])

  useEffect(() => {
    if (allproducts) {
      setProducts(allproducts);
    }
    if (allproductscount) {
      setProductsCount(allproductscount);

    }

  }, [allproducts, allproductscount])

  const deleteProduct = (pid) => {
    dispatch(AdminDeleteProductOrders(pid)).then(() => {
      dispatch(AdminAllProducts(next, null, null));
    })
  }

  const paginationNext = (e) => {
    e.preventDefault();
    if (next >= (productsCount / 10)) {
      return;
    } else {
      let nxt = next + 1;
      setNext(nxt);
      dispatch(AdminAllProducts(nxt, null, null)).then(() => {
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
      dispatch(AdminAllProducts(prev, null, null)).then(() => {

      })
    }
  }

  const searchProduct = (name) => {
    if (name == "") {
      name = null;
    }
    dispatch(AdminAllProducts(0, name, null));
  }

  const searchCategoryProduct = (id) => {
    if (id == "all") {
      id = "null";
    }
    dispatch(AdminAllProducts(0, null, id));
  }

  useEffect(() => {

    dispatch(AdminAllCategoryParent());
  }, [])

  const [category, setCategory] = useState(null);

  useEffect(() => {
    if (allcategory) {
      const res = allcategory.filter(filterParent);
      function filterParent(p) {
        return p?.parentid == undefined;
      }
      setCategory(res);
    }
  }, [allcategory])

  return (
    <>
      <div className='flex w-full h-screen'>
        <AdminSidebar name={'products'} />
        <div className='flex flex-col w-full h-screen '>
          <AdminTopbar />
          <div className='flex flex-col pt-5 pl-5 pr-10'>
            <h1 className='font-dmsans text-lg font-semibold'>Products</h1>

            <div className='w-full border rounded-lg mt-5 h-20 items-center flex pl-4 pt-4 pb-4 justify-between pr-5'>
              <input onChange={(e) => { searchProduct(e.target.value) }} type="text" className='bg-[#1a1a1d12] border-[#1a1a1d00] text-sm font-dmsans pl-3 rounded-lg h-12 w-[360px]' placeholder='Search by name' />
              <select onChange={(e) => { searchCategoryProduct(e.target.value) }} name="" className='bg-[#1a1a1d12] border-[#1a1a1d00] font-dmsans text-sm pl-3 rounded-lg h-12 w-[360px]' id="">
                <option value="" hidden defaultChecked={true}>Select Category</option>
                <option value="all" >All Products</option>
                {
                  category?.map((c, key) => (
                    <option value={c?._id}>{c?.name}</option>
                  ))
                }
              </select>
              <Link to={'/admin-add-product'}><button className='text-white h-10 hover:scale-110 transition-all duration-300 w-[200px] rounded-md  flex justify-center items-center text-sm font-dmsans bg-darkred'>Add Product<span className='ml-2'><BiPlus size={15} /></span></button></Link>


            </div>
            <div className='flex-col mt-5'>

              <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-4">
                        Product Name
                      </th>
                      <th scope="col" class="px-6 py-3">
                        category
                      </th>
                      <th scope="col" class="px-6 py-3">
                        price
                      </th>
                      <th scope="col" class="px-6 py-3">
                        sale price
                      </th>
                      <th scope="col" class="px-6 py-3">
                        stock
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className='text-black'>

                    {products?.map((product, key) => (

                      <tr key={key} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="px-5 p-4 flex  items-center font-dmsans">
                          <div className='w-10 h-10 rounded-full flex mr-2'><img className='w-full h-full rounded-full' src={product?.images[0]?.img} alt="" /></div>{product?.name}
                        </td>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {product?.category?.name}
                        </th>
                        <td class="px-6 py-4">
                          ₹{product?.price}
                        </td>
                        <td class="px-6 py-4 font-semibold">
                          {(product?.discountprice != null) ? product.discountprice : 'Not Available'}
                        </td>
                        <td class="px-6 py-4">
                          {product?.quantity}
                        </td>
                        <td class="px-6 py-4">
                          <span className='bg-[#00b5186e] rounded-xl px-2 font-semibold text-[#218a2f]'>
                            {products?.status || 'Selling'}
                          </span>
                        </td>
                        <td class="px-4 py-4 flex">
                          <Link to={`/admin-edit-product/${product._id}`}>
                            <span className='mb-2 cursor-pointer hover:scale-110 duration-300 transition-all'>
                              <BiEdit size={20} className='mr-2' color='blue' />
                            </span>
                          </Link>
                          <span className='mb-2 cursor-pointer hover:scale-110 duration-300' onClick={() => {
                            successToast("Deleting Product Please Wait")
                            deleteProduct(product?._id);
                          }}>
                            <BiTrash size={20} color='darkred' />
                          </span>
                        </td>
                      </tr>
                    ))
                    }

                  </tbody>
                </table>
                <nav class="flex items-center justify-between pt-4 pl-3 pr-3 mb-3" aria-label="Table navigation">
                  <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span class="font-semibold text-gray-900 dark:text-white">1-{10}</span> of <span class="font-semibold text-gray-900 dark:text-white">{productsCount}</span></span>
                  <ul class="inline-flex -space-x-px text-sm h-8">
                    <li className='cursor-pointer' onClick={paginationPrev}>
                      <p class="cursor-pointer flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</p>
                    </li>
                    <li className='cursor-pointer' onClick={paginationNext}>
                      <p class="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</p>
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

export default AdminProducts

