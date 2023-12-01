import React, { useEffect } from 'react'
import { useState } from 'react'
import AdminSidebar from '../../components/Admin/SideBar/AdminSidebar';
import AdminTopbar from '../../components/Admin/TopBar/AdminTopbar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AdminAllCategoryParent, AdminCreateCategory, createCouponAction } from '../../actions/Admin/AdminAction';

const AddCoupons = () => {

    const [hamburger,setHamburger] = useState(true);
    const [name,setName] = useState(null);
    const [minPurchase,setMinPurchase] = useState(null);
    const [minProducts,setMinProducts] = useState(null);
    const [description,setDescription] = useState(null);
    const [type,setType] = useState(null);
    const [discount,setDiscount] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    
    const authenticate = localStorage.getItem('admin_authenticate');
    useEffect(() => {
      if(!authenticate){
        navigate('/admin-login');
      }
    }, [authenticate])
  

    const handleAddCoupon=(e)=>{
        e.preventDefault();
        const coupon ={
          name:name.toLowerCase(),
          type,
          description,
          discount,
          minProducts,
          minPurchase
        }
        dispatch(createCouponAction(coupon)).then(()=>{
            navigate('/admin-coupons');
        })
    }

  return (
    <>
            <div className='flex w-full h-screen'>
            {hamburger &&
                <AdminSidebar name={'products'} />
            }
                <div className='flex flex-col w-full h-screen'>
                    <AdminTopbar />
                    <div className='w-full h-full pl-10 pt-5 pr-5'>
                        <div className='flex justify-between pr-10'>
                            <h1 className='font-dmsans text-lg'>Add coupon</h1>
                        </div>
                        <form onSubmit={handleAddCoupon}>
                            <div className='mt-4'>
                                <div className='pr-[500px] mb-20'>
                                    <div className='items-center justify-between flex mt-10 text-black font-dmsans'>
                                        <p className='mr-10'>Code</p>
                                        <input onChange={(e)=>{setName(e.target.value)}} type="text" placeholder='coupon code' className='uppercase rounded-lg  text-sm pl-3 bg-[#1a1a1d0d] border-[#1a1a1d15] h-12 w-[500px]' required/>
                                    </div>
                                    <div className='items-center justify-between flex mt-10 text-black font-dmsans'>
                                        <p className='mr-10'>Description</p>
                                        <textarea onChange={(e)=>{setDescription(e.target.value)}} name="" placeholder='Description' className='rounded-lg  text-sm pl-3 bg-[#1a1a1d0d] border-[#1a1a1d15] h-20 w-[500px]' id="" cols="30" rows="10"></textarea>
                                    </div>
                                    <div className='items-center justify-between flex mt-10 text-black font-dmsans'>
                                        <p className='mr-10'>Type</p>
                                        <select onChange={(e)=>{setType(e.target.value)}} name="" id="" className='rounded-lg  text-sm pl-3 bg-[#1a1a1d0d] border-[#1a1a1d15] h-12 w-[500px]' required>
                                          <option value="" hidden defaultChecked={true}>Select Coupon Type</option>
                                          <option value="percentage">%</option>
                                          <option value="rupees">₹</option>
                                        </select>
                                    </div>
                                    <div className='items-center justify-between flex mt-10 text-black font-dmsans'>
                                        <p className='mr-10'>Discount</p>
                                        <input onChange={(e)=>{setDiscount(e.target.value)}} type="number" placeholder='Discount' className='rounded-lg  text-sm pl-3 bg-[#1a1a1d0d] border-[#1a1a1d15] h-12 w-[500px]' required/>
                                    </div>
                                    <div className='items-center justify-between flex mt-10 text-black font-dmsans'>
                                        <p className='mr-10'>Min Purchase</p>
                                        <input onChange={(e)=>{setMinPurchase(e.target.value)}} type="number" placeholder='Minimum Purchase (₹)' className='rounded-lg  text-sm pl-3 bg-[#1a1a1d0d] border-[#1a1a1d15] h-12 w-[500px]' required/>
                                    </div>
                                    <div className='items-center justify-between flex mt-10 text-black font-dmsans'>
                                        <p className='mr-10'>Min Products</p>
                                        <input onChange={(e)=>{setMinProducts(e.target.value)}} type="Minimum Products" placeholder='Discount' className='rounded-lg  text-sm pl-3 bg-[#1a1a1d0d] border-[#1a1a1d15] h-12 w-[500px]' required/>
                                    </div>
                                    <div className='items-center flex mt-10 text-black font-dmsans'>
                                        <button className='w-[100px] h-10 flex justify-center items-center border rounded-md shadow text-sm font-dmsans text-darkred' onClick={()=>{navigate('/admin-coupons')}}>Cancel</button>
                                        <button className='w-[100px] h-10 flex justify-center items-center border rounded-md shadow text-sm font-dmsans bg-darkred text-white ml-5' type='Submit'>Submit</button>
                                    </div>
                                    <br /><br />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
  )
}

export default AddCoupons