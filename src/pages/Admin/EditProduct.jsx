import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/Admin/SideBar/AdminSidebar';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AdminAllProducts } from '../../actions/Admin/AdminAction';
import axios from 'axios';

const EditProduct = () => {
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [quantity, setQuantity] = React.useState(0);
  const [discountprice, setDiscountPrice] = React.useState(0);

  // const [slug, setSlug] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [parentCategory, setParentCategory] = React.useState('');
  // const [category, setCategory] = React.useState('');

  // const [category, setCategory] = useState('');
  const [imageFile, setImageFile] = React.useState(null);
  const [imageDataURL, setImageDataURL] = React.useState(null);

  const params = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();


  useEffect(() => {
    getproductdetails();
  }, []);

  const getproductdetails = async () => {
    try {
      let response = await fetch(`http://localhost:5500/api/products/${params.id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      let result = await response.json();
      console.log(result.product, "lkjfhalsdkhf");
      setName(result?.product?.name);
      setDescription(result?.product?.description);
      setParentCategory(result?.product?.parentcategory);
      setPrice(result?.product?.price);
      setDiscountPrice(result?.product?.discountprice);
      setQuantity(result?.product?.quantity);
      setImageDataURL(result?.product?.imageFile);
  
      dispatch(AdminAllProducts(0, null, null));
  
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImageDataURL(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
  
    try {
      const url = `http://localhost:5500/api/products/${params.id}`;
  
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('discountprice', discountprice);
      formData.append('quantity', quantity);
      formData.append('parentCategory', parentCategory);
  
      if (imageFile) {
        formData.append('imageFile', imageFile);
      }
  
      const config = {
        method: 'put',
        url: url,
        data: formData,
        withCredentials: true, // Include credentials like cookies
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
  
      const response = await axios(config);
  
      if (response.status === 200) {
        // Request was successful
        const responseData = response.data;
        console.log('Product updated successfully', responseData);
  
        dispatch(AdminAllProducts(0, null, null));
        navigate('/admin-products');
      } else {
        // Handle other status codes if needed
        console.error('Error updating product. Status:', response.status);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  
  return (

    <div className="flex items-center justify-center h-full">
      <AdminSidebar name={'products'} />
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md overflow-y-auto max-h-screen">
        <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
        <form onSubmit={handleUpdateProduct}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600 ">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full px-4 py-2 mt-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">Sale Price:</label>
            <input
              type="number"
              value={discountprice}
              onChange={(e) => setDiscountPrice(Number(e.target.value))}
              className="w-full px-4 py-2 mt-2 border rounded-lg"
            />
          </div>

          {/* ... Other input fields */}
          {/* <div className="mb-4">
  <label className="block text-sm font-semibold text-gray-600">Slug:</label>
  <input
    type="text"
    value={slug}
    onChange={(e) => setSlug(e.target.value)}
    className="w-full px-4 py-2 mt-2 border rounded-lg"
  />
</div> */}

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-lg"
            />
          </div>

          {/* <div className="mb-4">
  <label className="block text-sm font-semibold text-gray-600">Parent Category:</label>
  <input
    type="text"
    value={parentCategory}
    onChange={(e) => setParentCategory(e.target.value)}
    className="w-full px-4 py-2 mt-2 border rounded-lg"
  />
</div> */}


          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">Stock:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full px-4 py-2 mt-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg"
            />
            {imageDataURL && (
              <img src={imageDataURL} alt="Product" className="mt-2 max-w-full h-32 object-contain" />
            )}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 mt-6 text-white bg-red-600 rounded-lg hover:bg-red-600"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>

  )
};

export default EditProduct;