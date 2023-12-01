import React, { useEffect, useState } from 'react'
import { BiDownload, BiEdit, BiPlus, BiTrash,BiXCircle } from 'react-icons/bi';
import Img from '../../../assets/cat2.jpg';
import { AdminAllCategory, AdminAllCategoryParent, AdminDeleteCategoryOrders } from '../../../actions/Admin/AdminAction';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import AdminSidebar from '../../../components/Admin/SideBar/AdminSidebar';
import AdminTopbar from '../../../components/Admin/TopBar/AdminTopbar';
import { adminUpdate, adminUpdateAvatar } from '../../../actions/User/UserAction';
import {ToastContainer,toast} from 'react-toastify';

const AdminSettings = () => {
    const [fullname, setFullname] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [password, setPassword] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [images,setImages]  = useState(null);
    const [blobImg,setBlobImg]  = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const newtoast = (msg)=>{
        toast(msg,{position:'top-center'})
    }

    useEffect(() => {
        if (localStorage.getItem('admin_fullname')) {
            setFullname(localStorage.getItem('admin_fullname'))
        }
        if (localStorage.getItem('admin_email')) {
            setEmail(localStorage.getItem('admin_email'))
        }
        if (localStorage.getItem('admin_phone')) {
            setPhone(localStorage.getItem('admin_phone'))
        }
        if (localStorage.getItem('admin_avatar')) {
            setAvatar(localStorage.getItem('admin_avatar'))
        }
    }, [localStorage.getItem('admin_fullname'), localStorage.getItem('admin_phone'), localStorage.getItem('admin_email'), localStorage.getItem('admin_avatar'),])

    const [popup, setpopup] = useState(false);
    const togglePopup = () => {
        setpopup(!popup);
    }

    const handleImagesSelect = (e) => {
        setImages(e.target.files);
        const file = e.target.files;
        var link = URL.createObjectURL(file[0]);
        setBlobImg(link)
    }

    const handleAvatarUpload=()=>{
        const obj ={
            uid:localStorage.getItem("admin_id"),
            images,
        }
        dispatch(adminUpdateAvatar(obj)).then(()=>{
            window.location.reload()
            newtoast("Profile Picture Updated")
        })
    }

    const handleAdminUpdate=()=>{
        const user = {
            uid:localStorage.getItem('admin_id'),
            fullname,
            email,
            phone,
            password,
        }
        console.log(fullname,email,phone,password);
        dispatch(adminUpdate(user)).then(()=>{
            togglePopup();
            newtoast("Information Update Successfully");
        })
    }

        const [categories,setCategories] = useState(false);
        const [parentcategories,setParentCategories] = useState(false);
        const [chilcategories,setChildCategories] = useState(false);
        const [category,setCategory] = useState(null);
        const allcategory = useSelector(state => state.admin.allcategory);

        useEffect(()=>{
            if(allcategory){
                setCategories(allcategory);
            }
        },[allcategory])

        useEffect(()=>{
            dispatch(AdminAllCategoryParent());
        },[dispatch,AdminAllCategoryParent])

        useEffect(()=>{
            if(categories){
                const res = categories.filter(filterParent);
                function filterParent(p){
                    return p?.parentid == undefined;
                }
                setParentCategories(res);
            }
        },[categories])
        
        const [selectedCategory,setSelectedCategory] = useState([]);
        const handleSelectCategory=(id,name)=>{
            var tempcat = [];
            var tempcatname = [];

        }

    return (
        <>
            <div className='flex w-full min-h-screen relative'>
                {
                    popup && <div className='cursor-pointer fixed w-full h-screen bg-[#1a1a1d43] top-0 left-0 z-[5000]  flex items-center justify-center'>
                        <div className='w-[500px] flex flex-col h-[350px] bg-white shadow-2xl rounded-xl'>
                            <div className='flex pl-5 pr-5 justify-between items-center h-14 bg-red-600 rounded-t-xl text-white'>
                                <p className='font-dmsans'>Edit Information</p><p onClick={togglePopup}><BiXCircle size={22}/></p>
                            </div>
                            <div className='w-full flex pl-20 pt-4 pr-20 '>
                                <input onChange={(e)=>{setFullname(e.target.value)}} type="text" placeholder={fullname || 'Enter Full Name'} className='rounded text-sm h-9 border w-full'/>
                            </div>
                            <div className='w-full flex pl-20 pt-4 pr-20'>
                                <input onChange={(e)=>{setEmail(e.target.value)}}  type="text" placeholder={email || 'Enter Email'} className='rounded text-sm h-9 border w-full'/>
                            </div>
                            <div className='w-full flex pl-20 pt-4 pr-20'>
                                <input  onChange={(e)=>{setPhone(e.target.value)}} type="text" placeholder={phone || 'Enter Mobile Number'} className='rounded text-sm h-9 border w-full'/>
                            </div>
                            <div className='w-full flex pl-20 pt-4 pr-20'>
                                <input onChange={(e)=>{setPassword(e.target.value)}}  type="password" placeholder={'********'} className='rounded text-sm h-9 border w-full'/>
                            </div>
                            <div className='w-full flex pl-20 pt-4 pr-20'>
                                <button className='rounded text-sm h-9 bg-red-600 text-white w-full' onClick={handleAdminUpdate} >Update</button>
                            </div>
                        </div>
                    </div>
                }
                <AdminSidebar name={'settings'} />
                <div className='flex flex-col w-full h-screen '>
                    <AdminTopbar />
                    <div className='flex flex-col pt-5 pl-5 pr-10'>
                        <h1 className='font-dmsans text-lg font-semibold w-full flex'>Settings</h1>

                        <div className='flex flex-col w-full mt-12'>
                            <div className='h-24 w-24 rounded-full mb-2 relative'>
                                {avatar && !blobImg &&
                                    <img src={avatar} className='h-full w-full rounded-full ' alt="" />
                                }
                                {(blobImg || !avatar) &&
                                    <img src={blobImg} className='h-full w-full rounded-full ' alt="" />
                                }
                            </div>
                            <div className='w-full flex rounded mb-12 scale-75 relative left-[-155px]'>
                                <input type="file" className='rounded h-full relative w-[120px]' onChange={handleImagesSelect} />
                                <button className='bg-red-600 rounded text-white font-dmsans text-sm w-24' onClick={handleAvatarUpload}>Update</button>
                            </div>
                            <div className='w-full flex font-dmsans'>
                                <p >Name - &nbsp;</p><p className='text-[#787878]'>{fullname}</p>
                            </div>
                            <div className='mt-2 w-full flex font-dmsans'>
                                <p >Email - &nbsp;</p><p className='text-[#787878]'>{email}</p>
                            </div>
                            <div className='mt-2 w-full flex font-dmsans'>
                                <p >Phone - &nbsp;</p><p className='text-[#787878]'>{phone=='null'?'':phone}</p>
                            </div>
                            <div className='mt-2 w-full flex font-dmsans'>
                                <p >Password - &nbsp;</p><p className='text-[#787878] font-dmsans text-xl'>******</p>
                            </div>
                            <div className='w-full flex'>
                                <button onClick={togglePopup} className='bg-red-600 text-white font-dmsans h-9 rounded w-[300px] mt-4'>Edit Information</button>
                            </div>

                            <div className='w-full flex flex-col items-start font-dmsans text-lg mt-5 mb-2'>
                                <p>Home Categories</p>
                                <p>-></p>
                            </div>


                        </div>
                    </div>
                </div>
                <ToastContainer/>
            </div>
        </>
    )
}

export default AdminSettings