import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/Admin/SideBar/AdminSidebar';
import { useParams } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from '../../helpers/axios';
// import { AdminAllProducts } from '../../actions/Admin/AdminAction';

const EditGiftbox = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  // const [discountprice, setDiscountPrice] = useState(0);
  // const [category, setCategory] = useState('');
  // const [imageFile, setImageFile] = useState(null);
  // const [imageDataURL, setImageDataURL] = useState(null);

  const params = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();


  useEffect(() => {
    getproductdetails();
  }, []);

  const getproductdetails = async () => {
    try {
      const response = await axios.get(`/products/${params.id}`);

      if (!response.status === 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = response.data;
      setName(result.name);
      // setCategory(result.category);
      setPrice(result.price);
      // setDiscountPrice(result.discountprice);
      setQuantity(result.quantity);
      // setImageDataURL(result.imageFile);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImageFile(file);
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setImageDataURL(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      // formData.append('category', category);
      formData.append('price', price);
      // formData.append('discountprice', discountprice);
      formData.append('quantity', quantity);
      // formData.append('imageFile', imageFile);

      const response = await axios.put(`/products/${params.id}`, formData);

      if (response.status === 200) {
        console.log('Product updated successfully');
        // dispatch(AdminAllProducts(0, null, null)); // Dispatch action to fetch all products

        navigate('/admin-giftbox'); // Redirect to the admin-products page
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }



  };
  return (

    <div className="flex items-center justify-center h-full">
      <AdminSidebar name={'products'} />
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md overflow-y-auto max-h-screen">
        <h1 className="text-2xl font-bold mb-6">Edit GiftBox</h1>
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

          {/* <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">Category:</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-lg"
            />
          </div> */}

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full px-4 py-2 mt-2 border rounded-lg"
            />
          </div>
          {/* 
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">Sale Price:</label>
            <input
              type="number"
              value={discountprice}
              onChange={(e) => setDiscountPrice(Number(e.target.value))}
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

          {/* <div className="mb-4">
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
          </div> */}

          <button
            type="submit"
            className="w-full px-4 py-2 mt-6 text-white bg-red-600 rounded-lg hover:bg-red-600"
          >
            Update GiftBox
          </button>
        </form>
      </div>
    </div>

  )
};

export default EditGiftbox;