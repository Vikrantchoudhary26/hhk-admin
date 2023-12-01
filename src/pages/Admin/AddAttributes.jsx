import React, { useEffect } from 'react'
import { useState } from 'react'
import AdminSidebar from '../../components/Admin/SideBar/AdminSidebar';
import AdminTopbar from '../../components/Admin/TopBar/AdminTopbar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AdminAllCategoryParent, AdminCreateCategory, createAttributeAction, createCouponAction } from '../../actions/Admin/AdminAction';

const AddAttributes = () => {

    const [hamburger,setHamburger] = useState(true);
    const [name,setName] = useState(null);
    const [type,setType] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const authenticate = localStorage.getItem('admin_authenticate');
    useEffect(() => {
      if(!authenticate){
        navigate('/admin-login');
      }
    }, [authenticate])
  

    const handleAddAttribute=(e)=>{
        e.preventDefault();
        const attribute ={
          name,
          type,
        }
        dispatch(createAttributeAction(attribute)).then(()=>{
            navigate('/admin-attributes');
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
                            <h1 className='font-dmsans text-lg'>Add Attribute</h1>
                        </div>
                        <form onSubmit={handleAddAttribute}>
                            <div className='mt-4'>
                                <div className='pr-[500px] mb-20'>
                                    <div className='items-center justify-between flex mt-10 text-black font-dmsans'>
                                        <p className='mr-10'>Name</p>
                                        <input onChange={(e)=>{setName(e.target.value)}} type="text" placeholder='Attribute Name' className=' rounded-lg  text-sm pl-3 bg-[#1a1a1d0d] border-[#1a1a1d15] h-12 w-[500px]' required/>
                                    </div>
                                    <div className='items-center justify-between flex mt-10 text-black font-dmsans'>
                                        <p className='mr-10'>Type</p>
                                        <select onChange={(e)=>{setType(e.target.value)}} name="" id="" className='rounded-lg  text-sm pl-3 bg-[#1a1a1d0d] border-[#1a1a1d15] h-12 w-[500px]' required>
                                          <option value="" hidden defaultChecked={true}>Select Attribute Type</option>
                                          <option value="radio">Radio</option>
                                        </select>
                                    </div>
                                    <div className='items-center flex mt-10 text-black font-dmsans'>
                                        <button className='w-[100px] h-10 flex justify-center items-center border rounded-md shadow text-sm font-dmsans text-darkred' onClick={()=>{navigate('/admin-attributes')}}>Cancel</button>
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

export default AddAttributes