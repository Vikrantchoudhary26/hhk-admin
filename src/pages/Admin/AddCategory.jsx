import React, { useEffect } from 'react'
import { useState } from 'react'
import AdminSidebar from '../../components/Admin/SideBar/AdminSidebar';
import AdminTopbar from '../../components/Admin/TopBar/AdminTopbar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AdminAllCategoryParent, AdminCreateCategory } from '../../actions/Admin/AdminAction';

const AddCategory = () => {

    const [hamburger, setHamburger] = useState(true);
    const [images, setImages] = useState(null);
    const [name, setName] = useState(null);
    const [parentid, setParentId] = useState(null);
    const [categories, setCategories] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector(state => state.admin);
    const allcategory = useSelector(state => state.admin.allcategory);

    useEffect(() => {
        dispatch(AdminAllCategoryParent());
    }, [AdminAllCategoryParent, dispatch])

    useEffect(() => {
        if (allcategory) {
            setCategories(allcategory);
        }
    }, [allcategory])

    const authenticate = localStorage.getItem('admin_authenticate');
    useEffect(() => {
        if (!authenticate) {
            navigate('/admin-login');
        }
    }, [authenticate])


    const handleAddCategory = (e) => {
        e.preventDefault();
        const categoryObj = {
            name,
            images,
            parentid
        }
        console.log("=========categoryObj", categoryObj);
        dispatch(AdminCreateCategory(categoryObj)).then(() => {
            navigate('/admin-categories');
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
                            <h1 className='font-dmsans text-lg'>Add category</h1>
                        </div>
                        <form onSubmit={handleAddCategory}>
                            <div className='mt-4'>
                                <div className='relative w-[500px] h-[200px]'>
                                    <div>

                                        <div class="flex items-center justify-center w-full">
                                            <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                    </svg>
                                                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                                    <p class="text-xs text-gray-500 dark:text-gray-400">Only 1 Image is Accepted</p>
                                                </div>
                                                <input id="dropzone-file" type="file" onChange={(e) => { setImages(e.target.files) }} multiple={true} maxLength={5} class="hidden" />
                                            </label>
                                        </div>

                                    </div>
                                </div>
                                <div className='pr-[500px] mb-20'>
                                    <div className='items-center justify-between flex mt-10 text-black font-dmsans'>
                                        <p className='mr-10'>Name</p>
                                        <input onChange={(e) => { setName(e.target.value) }} type="text" placeholder='Product name' className='rounded-lg  text-sm pl-3 bg-[#1a1a1d0d] border-[#1a1a1d15] h-12 w-[500px]' required />
                                    </div>
                                    <div className='items-center justify-between flex mt-10 text-black font-dmsans'>
                                        <p className='mr-10'>Parent</p>
                                        <select id="" className='rounded-lg  text-sm pl-3 bg-[#1a1a1d0d] border-[#1a1a1d15] h-12 w-[500px]' onChange={(e) => { setParentId(e.target.value) }}>
                                            <option value={null} hidden defaultChecked={true}>Select Parent</option>
                                            {
                                                categories?.map((c, key) => (
                                                    <option value={c?._id}>{c?.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className='items-center flex mt-10 text-black font-dmsans'>
                                        <button className='w-[100px] h-10 flex justify-center items-center border rounded-md shadow text-sm font-dmsans text-darkred' onClick={() => { navigate('/admin-categories') }}>Cancel</button>
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

export default AddCategory