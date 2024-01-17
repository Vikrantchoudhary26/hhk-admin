import React, { useEffect, useRef, useState } from 'react'
import AdminSidebar from '../../components/Admin/SideBar/AdminSidebar'
import AdminTopbar from '../../components/Admin/TopBar/AdminTopbar'
import { BiPlus, BiPlusCircle } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { AdminAllCategory, AdminAllCategoryParent, AdminCreateProduct } from '../../actions/Admin/AdminAction';
import Img from '../../assets/banner.jpg'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'


const AddProducts = () => {
    const navigate = useNavigate();
    const [name, setName] = useState(null);
    const [trending, setTrending] = useState(false);
    const [description, setDescription] = useState(null);
    const [summary, setSummary] = useState(null);
    const [price, setPrice] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [discountprice, setDiscountPrice] = useState(null);
    const [category, setCategory] = useState(null);
    const [parentcategory, setParentCategory] = useState(null);
    const [childcategory, setChildCategory] = useState(null);
    const [tags, setTags] = useState(null);
    const [countyoforigin, setCountryOfOrigin] = useState(null);
    const [material, setMaterial] = useState(null);
    const [dimensions, setDimensions] = useState(null);
    const [images, setImages] = useState(null);
    const [havePersonalization, sethavePersonalisation] = useState(false);
    const [personalizationType, setPersonalizationType] = useState(null);

    let variants = [];
    const [showVariants, setShowVariants] = useState(null);
    const [showVar, setShowVar] = useState(false);
    const [variantPage, setVariantPage] = useState(false);
    const [haveVariants, setHaveariants] = useState(false);

    const [variantName, setVariantName] = useState(null);
    const [variantType, setVariantType] = useState(null);
    const [variantPrice, setVariantPrice] = useState(null);
    const [variantDiscountPrice, setVariantDiscountPrice] = useState(null);
    const [variantQuantity, setVariantQuantity] = useState(null);

    const clearPreviousVariant = () => {
        setVariantName('');
        setVariantType('Select Type');
        setVariantDiscountPrice('');
        setVariantPrice('');
        setVariantQuantity('');
    }

    const auth = useSelector(state => state.admin);
    const authenticate = localStorage.getItem('admin_authenticate');
    useEffect(() => {
        if (!authenticate) {
            navigate('/admin-login');
        }
    }, [authenticate])

    const errorToast = (msg) => {
        toast(msg, { position: 'top-center' });
    }

    const [isChecked, setIsChecked] = useState(false)
    const [hamburger, setHamburger] = useState(false);

    const handleCheckboxChange = () => {
        // if (name && category && parentcategory && description && summary && price && images) {
            setIsChecked(!isChecked);
            errorToast("Temporarily Closed!")
            // setVariantPage(!variantPage);
        // } else {
            // errorToast('Fill all Marked Fields');
        // }
    }

    const toggleHamburger = () => {
        setHamburger(!hamburger);
    }
    const dispatch = useDispatch();
    const [categories, setCategories] = useState(null);
    const [parentCategories, setParentCategories] = useState(null);
    const [childCategories, setChildCategories] = useState(null);
    const [subChildCategories, setSubChildCategories] = useState(null);
    const allcategory = useSelector(state => state.admin.allcategory);

    useEffect(() => {
        dispatch(AdminAllCategoryParent());
    }, []);

    useEffect(() => {
        if (allcategory) {
            setCategories(allcategory);
        }
    }, [allcategory])

    useEffect(() => {
        if (categories) {
            const res = categories.filter(filterParent);
            function filterParent(c) {
                return (c?.parentid == undefined && c?.name != "Gift You Way");
            }
            setParentCategories(res);
        }
    }, [categories]);

    const handleParentCategoryClick = (id) => {
        setSubChildCategories(null);
        setChildCategories(null);
        setChildCategory(null);
        setParentCategory(id);
        const res = categories.filter(filterCategory);
        function filterCategory(c) {
            return c?.parentid == id
        }
        setChildCategories(res);
    }

    const handleChildCategoryClick = (id) => {
        setCategory(id);
        const res = categories.filter(filterChild);
        function filterChild(c) {
            return c?.parentid == id
        }
        setSubChildCategories(res);
    }

    useEffect(() => {
        dispatch(AdminAllCategory());
    }, [])

    const handleAddProduct = (e) => {
        e.preventDefault();
        console.log(name, price, description, quantity, category, parentcategory, images, countyoforigin, material);
        if (name && price && description && quantity && category && parentcategory && images && countyoforigin && material) {
            errorToast("Adding Product Please Wait...")
            if (childcategory == null) {
                const productObj = {
                    name,
                    trending,
                    price,
                    description,
                    quantity,
                    discountprice,
                    category,
                    parentcategory,
                    tags,
                    countyoforigin,
                    material,
                    dimensions,
                    images,
                    haveVariants: false,
                    havePersonalization,
                    personalizationType
                }
                dispatch(AdminCreateProduct(productObj)).then(() => {
                    errorToast("Adding Product Please Wait...")
                    navigate('/admin-products')
                })
            } else {
                const productObj = {
                    name,
                    price,
                    trending,
                    description,
                    quantity,
                    discountprice,
                    category,
                    parentcategory,
                    childcategory,
                    tags,
                    countyoforigin,
                    material,
                    dimensions,
                    images,
                    haveVariants: false,
                    havePersonalization,
                    personalizationType
                }
                dispatch(AdminCreateProduct(productObj)).then(() => {
                    navigate('/admin-products')
                })
            }
        } else {
            errorToast('Fill all the marked fields')
        }
    }

    const handleAddProductWithVariant = (e) => {
        e.preventDefault();
        if (childcategory == null) {
            const productObj = {
                name,
                price,
                description,
                trending,
                quantity,
                discountprice,
                category,
                parentcategory,
                tags,
                countyoforigin,
                material,
                dimensions,
                images,
                haveVariants: true,
                variants: JSON.stringify(v),
                havePersonalization,
                personalizationType,
            }
            dispatch(AdminCreateProduct(productObj)).then(() => {
                errorToast("Adding Product Please Wait...")
                navigate('/admin-products')
            })
        } else {
            const productObj = {
                name,
                price,
                description,
                trending,
                quantity,
                discountprice,
                category,
                parentcategory,
                childcategory,
                tags,
                countyoforigin,
                material,
                dimensions,
                images,
                haveVariants: true,
                variants: v,
                havePersonalization,
                personalizationType,
            }
            dispatch(AdminCreateProduct(productObj)).then(() => {
                errorToast("Adding Product Please Wait...")
                navigate('/admin-products')
            })
        }
    }

    const [v, setv] = useState([]);
    const handleVariantDone = () => {
        console.log(v, 'v');
        var vars = [];
        var v1 = v;

        const obj = {
            attribute: variantType,
            name: variantName,
            quantity: variantQuantity,
            price: variantPrice,
            discountprice: variantDiscountPrice
        }

        if (v == null) {
            vars.push(obj);
            console.log(vars, 'vars');
        } else {
            for (let i = 0; i < v1.length; i++) {
                vars.push(v1[i]);
            }
            vars.push(obj);
            console.log(vars, 'vars');
        }
        for (let i = 0; i < vars.length; i++) {
            v1.push(vars[i]);
        }
        setv(vars);
        clearPreviousVariant();
        setShowVar(true);
        setShowVariants(vars);
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
                            <h1 className='font-dmsans text-lg'>Add Product</h1>
                            <div className='flex items-center font-dmsans text-darkred text-lg'>
                                Does this product have variants?
                                <div className='relative'>
                                    <label className='themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center'>
                                        <input
                                            type='checkbox'
                                            checked={isChecked}
                                            onChange={handleCheckboxChange}
                                            className='sr-only'
                                        />
                                        <span
                                            className={`slider mx-4 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 ${isChecked ? 'bg-darkred' : 'bg-[#CCCCCE]'
                                                }`}
                                        >
                                            <span
                                                className={`dot h-6 w-6 rounded-full bg-white duration-200 ${isChecked ? 'translate-x-[28px]' : ''
                                                    }`}
                                            ></span>
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='flex'>
                            <p className={`mt-10 mb-6 border-b flex justify-center ${variantPage ? '' : 'border-darkred'}  w-[100px] text-md font-dmsans`}>Basic Info</p>
                            <p className={`${isChecked ? 'flex' : 'hidden'} cursor-pointer ${variantPage ? 'border-b border-darkred' : 'border-0'} mt-10 mb-6 border-b justify-center  w-[100px] text-md font-dmsans`}>Variants</p>
                        </div>
                        {!variantPage &&
                            <div>
                                <div className='mt-4'>
                                    <div className='relative min-w-[250px] h-[200px] flex'>
                                        <div>

                                            <div class="flex w-[250px] items-center justify-center">
                                                <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                        </svg>
                                                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                                        <p class="text-xs text-gray-500 dark:text-gray-400">Max 5 Images Accepted!</p>
                                                    </div>
                                                    <input id="dropzone-file" type="file" onChange={handleImagesSelect} multiple={true} maxLength={5} class="hidden" />
                                                </label>
                                            </div>

                                        </div>
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
                                    <div className='pr-[500px] mb-20'>
                                        <div className='items-center justify-between flex mt-10 text-black font-dmsans'>
                                            <p className='mr-10 flex'>Name<p className='text-darkred'>*</p></p>
                                            <input onChange={(e) => { setName(e.target.value) }} type="text" placeholder='Product name' className='rounded-lg  text-sm pl-3 bg-[#1a1a1d0d] border-[#1a1a1d15] h-12 w-[500px]' required />
                                        </div>
                                        <div className='items-center justify-between flex mt-5 text-black font-dmsans '>
                                            <p className='mr-10 flex'>Description<p className='text-darkred'>*</p></p>
                                            <textarea onChange={(e) => { setDescription(e.target.value) }} name="" className='w-[500px] text-sm rounded-lg bg-[#1a1a1d0d] border-[#1a1a1d15] h-40' placeholder='Product Description' required></textarea>
                                        </div>
                                        <div className='items-center justify-between flex mt-10 text-black font-dmsans'>
                                            <p className='mr-10 flex'>Trending?</p>
                                            <input type="checkbox" onChange={(e) => {
                                                if (e.target.value == "on" && trending == false) {
                                                    setTrending(true);
                                                } else {
                                                    setTrending(false);
                                                }
                                            }} />
                                        </div>
                                        <div className='items-center justify-between flex mt-10 text-black font-dmsans'>
                                            <p className='mr-10 flex'>Price <p className='text-darkred'>*</p></p>
                                            <input type="number" onChange={(e) => { setPrice(e.target.value) }} placeholder='Product Price' className='rounded-lg  text-sm pl-3 bg-[#1a1a1d0d] border-[#1a1a1d15] h-12 w-[500px]' required />
                                        </div>
                                        <div className='items-center justify-between flex mt-10 text-black font-dmsans'>
                                            <p className='mr-10'>Sale Price</p>
                                            <input type="number" onChange={(e) => { setDiscountPrice(e.target.value) }} placeholder='Product Sale Price' className='rounded-lg  text-sm pl-3 bg-[#1a1a1d0d] border-[#1a1a1d15] h-12 w-[500px]' required />
                                        </div>
                                        <div className='items-center justify-between flex mt-10 text-black font-dmsans'>
                                            <p className='mr-10 flex'>Parent Category <p className='text-darkred'>*</p></p>
                                            <select onChange={(e) => { handleParentCategoryClick(e.target.value) }} name="" id="" className='w-[500px] h-12 text-gray bg-[#1a1a1d0d] border-[#1a1a1d15] text-sm rounded-lg' required>
                                                <option value="" hidden defaultChecked={true}>Parent Category</option>
                                                {
                                                    parentCategories?.map((category, key) => (
                                                        <option value={category?._id}>{category?.name}</option>
                                                    ))
                                                }
                                                <option value="new"></option>
                                            </select>
                                        </div>
                                        {childCategories && <div className='items-center justify-between flex mt-10 text-black font-dmsans'>
                                            <p className='mr-10 flex'>Category <p className='text-darkred'>*</p></p>
                                            <select onChange={(e) => { handleChildCategoryClick(e.target.value) }} name="" id="" className='w-[500px] h-12 text-gray bg-[#1a1a1d0d] border-[#1a1a1d15] text-sm rounded-lg' required>
                                                <option value="" hidden defaultChecked={true}>Product Category</option>
                                                {
                                                    childCategories?.map((category, key) => (
                                                        <option value={category?._id}>{category?.name}</option>
                                                    ))
                                                }
                                                <option value="new"></option>
                                            </select>
                                        </div>}

                                        {subChildCategories && <div className='items-center justify-between flex mt-10 text-black font-dmsans'>
                                            <p className='mr-10'>Sub Category</p>
                                            <select onChange={(e) => { setChildCategory(e.target.value) }} name="" id="" className='w-[500px] h-12 text-gray bg-[#1a1a1d0d] border-[#1a1a1d15] text-sm rounded-lg' required>
                                                <option value="" hidden defaultChecked={true}>Product Category</option>
                                                {
                                                    subChildCategories?.map((category, key) => (
                                                        <option value={category?._id}>{category?.name}</option>
                                                    ))
                                                }
                                                <option value="new"></option>
                                            </select>
                                        </div>}







                                        <div className='items-center justify-between flex mt-10 text-black font-dmsans'>
                                            <p className='mr-10'>Personalization?</p>
                                            <div className='flex flex-col'>
                                                <select
                                                    onChange={(e) => {
                                                        const selectedOption = e.target.value;

                                                        if (selectedOption === "spotify") {
                                                            sethavePersonalisation(true);
                                                            setPersonalizationType("spotify");
                                                        } else if (selectedOption === "engravement") {
                                                            sethavePersonalisation(true);
                                                            setPersonalizationType("engravement");
                                                        } else {
                                                            sethavePersonalisation(false);
                                                        }
                                                    }}
                                                    className='w-[500px] h-12 text-gray bg-[#1a1a1d0d] border-[#1a1a1d15] text-sm rounded-lg'
                                                    required
                                                >
                                                    <option value="" hidden>Select Personalization</option>
                                                    <option value="spotify">Spotify Link</option>
                                                    <option value="engravement">Name Engravement</option>
                                                </select>
                                            </div>
                                        </div>







                                        {/* <div className='items-center justify-between flex mt-10 text-black font-dmsans'>
                                            <p className='mr-10'>Personalization?</p>
                                            <div className='flex flex-col'>
                                                <input onChange={(e) => {
                                                    if (e.target.value == "on" && havePersonalization == false) {
                                                        sethavePersonalisation(true);
                                                    } else {
                                                        sethavePersonalisation(false);
                                                    }
                                                }} type="checkbox" placeholder='Product Quantity ' />
                                                {havePersonalization && <select onChange={(e) => { setPersonalizationType(e.target.value) }} name="" id="" className='w-[500px] h-12 text-gray bg-[#1a1a1d0d] border-[#1a1a1d15] text-sm rounded-lg' required>
                                                    <option value="" hidden defaultChecked={true}>Select Personalization</option>
                                                    <option value="spotify">Spotify Link</option>
                                                    <option value="engravement">Name Engravement</option>
                                                </select>}
                                            </div>
                                        </div> */}



                                        <div className='items-center justify-between flex mt-10 text-black font-dmsans'>
                                            <p className='mr-10 flex'>Quantity<p className='text-darkred'>*</p></p>
                                            <input onChange={(e) => { setQuantity(e.target.value) }} type="number" placeholder='Product Quantity ' className='rounded-lg  text-sm pl-3 bg-[#1a1a1d0d] border-[#1a1a1d15] h-12 w-[500px]' required />
                                        </div>
                                        <div className='items-center justify-between flex mt-10 text-black font-dmsans'>
                                            <p className='mr-10 flex'>Material<p className='text-darkred'>*</p></p>
                                            <input onChange={(e) => { setMaterial(e.target.value) }} type="text" placeholder='Product Material' className='rounded-lg  text-sm pl-3 bg-[#1a1a1d0d] border-[#1a1a1d15] h-12 w-[500px]' />
                                        </div>
                                        <div className='items-center justify-between flex mt-10 text-black font-dmsans'>
                                            <p className='mr-10'>Dimensions</p>
                                            <input onChange={(e) => { setDimensions(e.target.value) }} type="text" placeholder='Product Dimensions' className='rounded-lg  text-sm pl-3 bg-[#1a1a1d0d] border-[#1a1a1d15] h-12 w-[500px]' />
                                        </div>
                                        <div className='items-center justify-between flex mt-10 text-black font-dmsans'>
                                            <p className='mr-10'>Product Tags</p>
                                            <input onChange={(e) => { setTags(e.target.value) }} type="text" placeholder='Product Tags' className='rounded-lg  text-sm pl-3 bg-[#1a1a1d0d] border-[#1a1a1d15] h-12 w-[500px]' />
                                        </div>
                                        <div className='items-center justify-between flex mt-10 text-black font-dmsans'>
                                            <p className='mr-10 flex'>Country Of Origin<p className='text-darkred'>*</p></p>
                                            <input onChange={(e) => { setCountryOfOrigin(e.target.value) }} type="text" placeholder='Product Country Of Origin' className='rounded-lg  text-sm pl-3 bg-[#1a1a1d0d] border-[#1a1a1d15] h-12 w-[500px]' required />
                                        </div>
                                        <div className='items-center flex mt-10 text-black font-dmsans'>
                                            <button className='w-[100px] h-10 flex justify-center items-center border rounded-md shadow text-sm font-dmsans text-darkred' type='button' onClick={() => { navigate('/admin-products') }}>Cancel</button>
                                            <button className='w-[100px] h-10 flex justify-center items-center border rounded-md shadow text-sm font-dmsans bg-darkred text-white ml-5' type='Submit' onClick={handleAddProduct}>Submit</button>
                                        </div>

                                        <br /><br />
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            variantPage &&
                            <div className='flex flex-col justify-center'>
                                <div className='flex flex-col  min-h-20 mb-8'>
                                    {
                                        showVar && showVariants?.map((v, key) => (
                                            <div className='flex pt-2'>
                                                <p className='mr-4'>{key + 1}.</p>
                                                <p className='mr-4 capitalize'>{v?.attribute}</p>
                                                <p className='mr-4'>{v?.name}</p>
                                                <p className='mr-4'>₹{v?.price}</p>
                                                <p className='mr-4'>₹{v?.discountprice}</p>
                                                <p className='mr-4'>{v?.quantity}</p>
                                            </div>
                                        ))
                                    }
                                    {

                                    }
                                </div>
                                <div className='flex items-end'>
                                    <div className='flex flex-col text-left font-dmsans text-sm mr-2'>
                                        <label className='mb-1' htmlFor="">Attribute</label>
                                        <select onChange={(e) => { setVariantType(e.target.value) }} value={variantType} name="" className='text-xs font-normal border rounded h-9' id="">
                                            <option value={null}>Select Type</option>
                                            <option value={'color'}>Color</option>
                                            <option value={'size'}>Size</option>
                                        </select>
                                    </div>
                                    <div className='flex flex-col text-left font-dmsans text-sm mr-2'>
                                        <label className='mb-1' htmlFor="">Name</label>
                                        <input onChange={(e) => { setVariantName(e.target.value) }} value={variantName} type="text" className='text-xs font-normal border rounded h-9' />
                                    </div>
                                    <div className='flex flex-col text-left font-dmsans text-sm mr-2'>
                                        <label className='mb-1' htmlFor="">Price</label>
                                        <input onChange={(e) => { setVariantPrice(e.target.value) }} value={variantPrice} type="text" className='text-xs font-normal border rounded h-9' />
                                    </div>
                                    <div className='flex flex-col text-left font-dmsans text-sm mr-2'>
                                        <label className='mb-1' htmlFor="">Discount Price</label>
                                        <input onChange={(e) => { setVariantDiscountPrice(e.target.value) }} value={variantDiscountPrice} type="text" className='text-xs font-normal border rounded h-9' />
                                    </div>
                                    <div className='flex flex-col text-left font-dmsans text-sm mr-2'>
                                        <label className='mb-1' htmlFor="">Quantity</label>
                                        <input onChange={(e) => { setVariantQuantity(e.target.value) }} value={variantQuantity} type="text" className='text-xs font-normal border rounded h-9' />
                                    </div>
                                    <div className='flex flex-col text-left font-dmsans text-sm mr-2'>
                                        <button className='bg-darkred text-white h-9 rounded w-20 ' onClick={handleVariantDone}>Done</button>
                                    </div>
                                </div>

                                <div className='flex items-center mt-5'>
                                    <button className='rounded h-8 text-sm font-dmsans w-[100px] bg-darkred text-white' onClick={handleAddProductWithVariant}>Submit</button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}

export default AddProducts