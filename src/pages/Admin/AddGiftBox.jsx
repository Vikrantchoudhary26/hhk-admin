import React, { useEffect, useRef, useState } from 'react'
import AdminSidebar from '../../components/Admin/SideBar/AdminSidebar'
import AdminTopbar from '../../components/Admin/TopBar/AdminTopbar'
import { BiPlus, BiPlusCircle } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { AdminAllCategory, AdminCreateProduct, createGiftBoxAction } from '../../actions/Admin/AdminAction';
import Img from '../../assets/banner.jpg'
import { useNavigate } from 'react-router-dom'


const AddGiftBox = () => {
    const navigate = useNavigate();
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [price, setPrice] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [material, setMaterial] = useState(null);
    const [dimensions, setDimensions] = useState(null);
    const [images, setImages] = useState(null);
    const [tags, setTags] = useState(null);


    const auth = useSelector(state => state.admin);
    const authenticate = localStorage.getItem('admin_authenticate');
    useEffect(() => {
        if (!authenticate) {
            navigate('/admin-login');
        }
    }, [authenticate])


    const [hamburger, setHamburger] = useState(false);


    const toggleHamburger = () => {
        setHamburger(!hamburger);
    }
    const dispatch = useDispatch();

    const handleAddGiftBox = (e) => {
        e.preventDefault();
        const giftbox = {
            name,
            price,
            description,
            quantity,
            tags,
            material,
            dimensions,
            images,
        }
        dispatch(createGiftBoxAction(giftbox)).then(() => {
            navigate('/admin-giftbox')
        })
    }

    const [blobImg, setBlobImg] = useState(null);


    const handleImagesSelect = async (e) => {
        setImages(e.target.files);
        const files = e.target.files;
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        const images = [];
    
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          if (file.size <= maxSize) {
            const link = await URL.createObjectURL(file);
            images.push(link);
          } else {
            alert("size is greater than 5 mb")
          }
        }
        setBlobImg(images);
      };


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
                            <h1 className='font-dmsans text-lg'>Add GiftBox</h1>
                        </div>
                            <div>
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
                                                        <p class="text-xs text-gray-500 dark:text-gray-400">Max 5 Images Accepted!</p>
                                                    </div>
                                                    <input id="dropzone-file" type="file"  onChange={handleImagesSelect} multiple={true} maxLength={5} class="hidden" />
                                                </label>

                                                {
                                            blobImg &&
                                            <div className='flex pl-5 items-center h-[170px]'>
                                                {
                                                    blobImg?.map((img, key) => (
                                                        <div key={key} className='h-[140px] w-[130px] mr-2'>
                                                            <img className='h-full w-full' src={img} alt="" />
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        }
                                            </div>

                                           

                                        </div>
                                    </div>




                                    <div className='pr-[500px] mb-20'>
                                        <div className='items-center justify-between flex mt-10 text-black font-dmsans'>
                                            <p className='mr-10'>Name</p>
                                            <input onChange={(e) => { setName(e.target.value) }} type="text" placeholder='GiftBox name' className='rounded-lg  text-sm pl-3 bg-[#1a1a1d0d] border-[#1a1a1d15] h-12 w-[500px]' required />
                                        </div>
                                        <div className='items-center justify-between flex mt-5 text-black font-dmsans '>
                                            <p className='mr-10'>Description</p>
                                            <textarea onChange={(e) => { setDescription(e.target.value) }} name="" className='w-[500px] text-sm rounded-lg bg-[#1a1a1d0d] border-[#1a1a1d15] h-40' placeholder='GiftBox Description' required></textarea>
                                        </div>
                                        <div className='items-center justify-between flex mt-10 text-black font-dmsans'>
                                            <p className='mr-10'>Price</p>
                                            <input type="number" onChange={(e) => { setPrice(e.target.value) }} placeholder='GiftBox Price' className='rounded-lg  text-sm pl-3 bg-[#1a1a1d0d] border-[#1a1a1d15] h-12 w-[500px]' required />
                                        </div>
                                        <div className='items-center justify-between flex mt-10 text-black font-dmsans'>
                                            <p className='mr-10'>Quantity</p>
                                            <input onChange={(e) => { setQuantity(e.target.value) }} type="number" placeholder='GiftBox Quantity ' className='rounded-lg  text-sm pl-3 bg-[#1a1a1d0d] border-[#1a1a1d15] h-12 w-[500px]' required />
                                        </div>
                                        <div className='items-center justify-between flex mt-10 text-black font-dmsans'>
                                            <p className='mr-10'>Material</p>
                                            <input onChange={(e) => { setMaterial(e.target.value) }} type="text" placeholder='GiftBox Material' className='rounded-lg  text-sm pl-3 bg-[#1a1a1d0d] border-[#1a1a1d15] h-12 w-[500px]' />
                                        </div>
                                        <div className='items-center justify-between flex mt-10 text-black font-dmsans'>
                                            <p className='mr-10'>Dimensions</p>
                                            <input onChange={(e) => { setDimensions(e.target.value) }} type="text" placeholder='GiftBox Dimensions' className='rounded-lg  text-sm pl-3 bg-[#1a1a1d0d] border-[#1a1a1d15] h-12 w-[500px]' />
                                        </div>
                                        <div className='items-center justify-between flex mt-10 text-black font-dmsans'>
                                            <p className='mr-10'>Product Tags</p>
                                            <input onChange={(e) => { setTags(e.target.value) }} type="text" placeholder='GiftBox Tags' className='rounded-lg  text-sm pl-3 bg-[#1a1a1d0d] border-[#1a1a1d15] h-12 w-[500px]' />
                                        </div>
                                        <div className='items-center flex mt-10 text-black font-dmsans'>
                                            <button className='w-[100px] h-10 flex justify-center items-center border rounded-md shadow text-sm font-dmsans text-darkred' type='button' onClick={() => { navigate('/admin-giftbox') }}>Cancel</button>
                                            <button className='w-[100px] h-10 flex justify-center items-center border rounded-md shadow text-sm font-dmsans bg-darkred text-white ml-5' type='Submit' onClick={handleAddGiftBox}>Submit</button>
                                        </div>

                                        <br /><br />
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddGiftBox