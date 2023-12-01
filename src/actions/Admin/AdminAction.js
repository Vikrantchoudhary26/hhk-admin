import axios from "../../helpers/axios";
import { addToCartConstants, adminAllCategoryConstant, adminAllCategoryParentConstant, adminAllOrdersConstant, adminAllProductConstant, adminCreateCategoryConstants, adminCreateProductConstants, adminCustomersConstants, adminDashboardConstant, adminDeleteCategoryConstants, adminDeleteCustomerConstants, adminDeleteProductConstants, adminDeleteRecentOrderConstants, adminGetUserInfoConstants, adminRecentOrderConstants, changeStatusConstant, createAttributeConstant, createCouponConstant, createGiftBoxConstant, createGiftCardConstant, deleteAttributeConstant, deleteCouponConstant, deleteGiftBoxConstant, deleteGiftCardConstant, deleteNotificationsConstant, getAttributeConstant, getCartDataConstants, getCouponConstant, getGiftBoxConstant, getGiftCardConstant, getNotificationsConstant, getSavedConstants, quantityEditConstants, removeCartDataConstants, removeSavedDataConstants, saveConstants } from "../../constant/constant";
import { adminEditProductConstants } from "../../constant/constant";
import { adminGetProductByIdConstants, adminUpdateProductConstants } from "../../constant/constant";


export const AdminCreateProduct = (productObj) => {
  const formData = new FormData();
  for (const image of productObj["images"]) {
    formData.append("images", image);
  }
  for (const key in productObj) {
    if (productObj[key] !== undefined && key !== "images") {
      formData.append(key, productObj[key]);
    }
  }
  return async (dispatch) => {
    dispatch({ type: adminCreateProductConstants.ADMIN_CREATEPRODUCT_REQUEST });
    const res = await axios.post(`/admin-create-product`, formData)
    if (res.status === 200) {
      const { product } = res.data;
      dispatch({
        type: adminCreateProductConstants.ADMIN_CREATEPRODUCT_SUCCESS,
        payload: {
          product
        },
      });
    }
  };

};

export const AdminEditProduct = (productId, productObj) => {
  const formData = new FormData();
  for (const image of productObj["images"]) {
    formData.append("images", image);
  }
  for (const key in productObj) {
    if (productObj[key] !== undefined && key !== "images") {
      formData.append(key, productObj[key]);
    }
  }
  return async (dispatch) => {
    dispatch({ type: adminEditProductConstants.ADMIN_EDITPRODUCT_REQUEST });
    try {
      const res = await axios.post(`/admin-edit-product/${productId}`, formData);
      if (res.status === 200) {
        const { product } = res.data;
        dispatch({
          type: adminEditProductConstants.ADMIN_EDITPRODUCT_SUCCESS,
          payload: {
            product,
          },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: adminEditProductConstants.ADMIN_EDITPRODUCT_FAILURE,
        payload: {
          error: "Failed to edit product",
        },
      });
    }
  };
};


//edit


// Import constants for the new actions

// Action to get product by ID
// AdminAction file

export const AdminGetProductById = (productId) => {
  return async (dispatch) => {
    dispatch({ type: adminGetProductByIdConstants.ADMIN_GET_PRODUCT_BY_ID_REQUEST });
    try {
      const res = await axios.get(`/admin-get-product/${productId}`);
      if (res.status === 200) {
        const { product } = res.data;
        dispatch({
          type: adminGetProductByIdConstants.ADMIN_GET_PRODUCT_BY_ID_SUCCESS,
          payload: {
            product,
          },
        });
        return { payload: { product } }; // Return the payload for successful cases
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: adminGetProductByIdConstants.ADMIN_GET_PRODUCT_BY_ID_FAILURE,
        payload: {
          error: "Failed to fetch product",
        },
      });
      throw error; // Throw the error for failure cases
    }
  };
};

// AdminUpdateProduct action should be similarly structured


// Action to update product
export const AdminUpdateProduct = (productId, productObj) => {
  const formData = new FormData();
  for (const image of productObj["images"]) {
    formData.append("images", image);
  }
  for (const key in productObj) {
    if (productObj[key] !== undefined && key !== "images") {
      formData.append(key, productObj[key]);
    }
  }
  return async (dispatch) => {
    dispatch({ type: adminUpdateProductConstants.ADMIN_UPDATE_PRODUCT_REQUEST });
    try {
      const res = await axios.post(`/admin-update-product/${productId}`, formData);
      if (res.status === 200) {
        const { product } = res.data;
        dispatch({
          type: adminUpdateProductConstants.ADMIN_UPDATE_PRODUCT_SUCCESS,
          payload: {
            product,
          },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: adminUpdateProductConstants.ADMIN_UPDATE_PRODUCT_FAILURE,
        payload: {
          error: "Failed to update product",
        },
      });
    }
  };
};


export const AdminCreateCategory = (categoryObj) => {
  const formData = new FormData();
  for (const image of categoryObj["images"]) {
    formData.append("images", image);
  }
  for (const key in categoryObj) {
    if (categoryObj[key] !== undefined && key !== "images") {
      formData.append(key, categoryObj[key]);
    }
  }
  return async (dispatch) => {
    dispatch({ type: adminCreateCategoryConstants.ADMIN_CREATEPRODUCT_REQUEST });
    const res = await axios.post(`/admin-create-category`, formData)
    if (res.status === 200) {
      const { category } = res.data;
      dispatch({
        type: adminCreateCategoryConstants.ADMIN_CREATEPRODUCT_SUCCESS,
        payload: {
          category
        },
      });
    }
  };

};

export const AdminDashboardAction = () => {
  return async (dispatch) => {
    dispatch({ type: adminDashboardConstant.ADMIN_DASHBOARD_REQUEST });
    const res = await axios.get(`/admin-dashboard`)
    if (res.status === 200) {
      const { totalsale,todaysale,yesterdaysale,thismonthsale} = res.data;
      dispatch({
        type: adminDashboardConstant.ADMIN_DASHBOARD_SUCCESS,
        payload: {
          totalsale,
          todaysale,
          yesterdaysale,
          thismonthsale
        },
      });
    }
  };

};

export const AdminRecentOrders = () => {
  return async (dispatch) => {
    dispatch({ type: adminRecentOrderConstants.ADMIN_RECENTORDER_REQUEST });
    const res = await axios.get(`/admin-recent-orders`)
    if (res.status === 200) {
      const { recentorders,delivered,pending,proccessing} = res.data;
      dispatch({
        type: adminRecentOrderConstants.ADMIN_RECENTORDER_SUCCESS,
        payload: {
          recentorders,
          delivered,
          pending,
          proccessing
        },
      });
    }
  };

};

export const changeStatusAction = (sid,status) => {
  return async (dispatch) => {
    dispatch({ type: changeStatusConstant.CHANGE_STATUS_REQUEST});
    const res = await axios.post('/change-status',{
        sid,
        status
    })
    if (res.status === 200) {
      const { message} = res.data;
      dispatch({
        type: changeStatusConstant.CHANGE_STATUS_SUCCESS,
        payload: {
          message
        },
      });
    }
  };

};

export const AdminGetUserInfo=(uid)=>{
  return async (dispatch)=>{
    dispatch({type:adminGetUserInfoConstants.ADMIN_USER_INFO_REQUEST})
    try{
      const res = await axios.post('/get-user',{
        uid
      });
      if(res.status === 200){
        const user = res.data;
        dispatch({
          type:adminGetUserInfoConstants.ADMIN_USER_INFO_SUCCESS,
          payload:{
            user
          }
        })
      }
    }catch(error){
      console.log(error);
    }
  }
}


export const AdminDeleteRecentOrders = (oid) => {
  return async (dispatch) => {
    dispatch({ type: adminDeleteRecentOrderConstants.ADMIN_DELETE_RECENT_ORDER_REQUEST });
    const res = await axios.post('/delete-recent-order',{
      oid
    })
    if (res.status === 200) {
      const { message } = res.data;
      dispatch({
        type: adminDeleteRecentOrderConstants.ADMIN_DELETE_RECENT_ORDER_SUCCESS,
        payload: {
          message,
        },
      });
    }
  };

};

export const AdminDeleteProductOrders = (pid) => {
  return async (dispatch) => {
    dispatch({ type: adminDeleteProductConstants.ADMIN_DELETE_PRODUCT_REQUEST });
    const res = await axios.post('/delete-product',{
      pid
    })
    if (res.status === 200) {
      const { message } = res.data;
      dispatch({
        type: adminDeleteProductConstants.ADMIN_DELETE_PRODUCT_SUCCESS,
        payload: {
          message,
        },
      });
    }
  };

};

export const AdminDeleteCategoryOrders = (cid) => {
  return async (dispatch) => {
    dispatch({ type: adminDeleteCategoryConstants.ADMIN_DELETE_CATEGORY_REQUEST });
    const res = await axios.post('/delete-category',{
      cid
    })
    if (res.status === 200) {
      const { message } = res.data;
      dispatch({
        type: adminDeleteCategoryConstants.ADMIN_DELETE_CATEGORY_SUCCESS,
        payload: {
          message,
        },
      });
    }
  };

};

export const AdminDeleteCustomerOrders = (cid) => {
  return async (dispatch) => {
    dispatch({ type: adminDeleteCustomerConstants.ADMIN_DELETE_CUSTOMER_REQUEST });
    const res = await axios.post('/delete-customer',{
      cid
    })
    if (res.status === 200) {
      const { message } = res.data;
      dispatch({
        type: adminDeleteCustomerConstants.ADMIN_DELETE_CUSTOMER_SUCCESS,
        payload: {
          message,
        },
      });
    }
  };

};

export const AdminAllCustomers = (skip,keyword) => {
  if(keyword == null){
    keyword = "null";
  }
  return async (dispatch) => {
    dispatch({ type: adminCustomersConstants.ADMIN_CUSTOMERS_REQUEST });
    const res = await axios.post(`/admin-all-customers`,{
      skip,
      keyword
    })
    if (res.status === 200) {
      const { customers, totalcustomers } = res.data;
      dispatch({
        type: adminCustomersConstants.ADMIN_CUSTOMERS_SUCCESS,
        payload: {
          customers,
          totalcustomers
        },
      });
    }
  };

};

export const AdminAllOrders = (skip,name,status) => {
  if(name==null){
    name="null";
  }  
  if(status==null){
    status="null";
  }
  return async (dispatch) => {
    dispatch({ type: adminAllOrdersConstant.ADMIN_ALLORDERS_REQUEST });
    const res = await axios.get(`/admin-all-orders/${skip}/${name}/${status}`)
    if (res.status === 200) {
      const { orders, totalorders } = res.data;
      dispatch({
        type: adminAllOrdersConstant.ADMIN_ALLORDERS_SUCCESS,
        payload: {
          orders,
          totalorders
        },
      });
    }
  };

};


export const AdminAllProducts = (skip,name,cid) => {
  if(name == null){
    name = "null";
  }
  if(cid == null){
    cid = "null";
  }
  return async (dispatch) => {
    dispatch({ type: adminAllProductConstant.ADMIN_PRODUCTS_REQUEST });
    const res = await axios.get(`/admin-all-products/${skip}/${name}/${cid}`)
    if (res.status === 200) {
      const { products, totalproducts } = res.data;
      dispatch({
        type: adminAllProductConstant.ADMIN_PRODUCTS_SUCCESS,
        payload: {
          products,
          totalproducts
        },
      });
    }
  };

};

export const AdminAllCategoryParent = () => {
  return async (dispatch) => {
    dispatch({ type:adminAllCategoryParentConstant.ADMIN_ALL_CATEGORY_REQUEST });
    const res = await axios.get(`/admin-all-category-parent`)
    if (res.status === 200) {
      const { category} = res.data;
      dispatch({
        type: adminAllCategoryParentConstant.ADMIN_ALL_CATEGORY_SUCCESS,
        payload: {
          category,
        },
      });
    }
  };

};

export const AdminAllCategory = (skip,name) => {
  if(name==null){
    name='null';
  }
  return async (dispatch) => {
    dispatch({ type: adminAllCategoryConstant.ADMIN_CATEGORY_REQUEST });
    const res = await axios.post(`/admin-all-category`,{
      skip,
      name
    })
    if (res.status === 200) {
      const { category, totalcategory } = res.data;
      dispatch({
        type: adminAllCategoryConstant.ADMIN_CATEGORY_SUCCESS,
        payload: {
          category,
          totalcategory
        },
      });
    }
  };

};

export const deleteCouponAction = (cid) => {
  return async (dispatch) => {
    dispatch({ type: deleteCouponConstant.DELETE_COUPON_REQUEST });
    const res = await axios.post(`/delete-coupon`,{
      cid
    })
    if (res.status === 200) {
      const { message,coupon} = res.data;
      dispatch({
        type: deleteCouponConstant.DELETE_COUPON_SUCCESS,
        payload: {
          coupon
        },
      });
    }
  };
};


export const createCouponAction = (coupon) => {
  console.log(coupon,'cop')
  return async (dispatch) => {
    dispatch({ type: createCouponConstant.CREATE_COUPON_REQUEST });
    const res = await axios.post(`/create-coupon`,{
      ...coupon
    })
    if (res.status === 200) {
      const { coupon} = res.data;
      dispatch({
        type: createCouponConstant.CREATE_COUPON_SUCCESS,
        payload: {
          coupon
        },
      });
    }
  };
};

export const getCouponAction = (skip) => {
  return async (dispatch) => {
    dispatch({ type: getCouponConstant.GET_COUPON_REQUEST });
    const res = await axios.post('/get-coupon',{
      skip
    })
    if (res.status === 200) {
      const { coupon,totalcoupons} = res.data;
      dispatch({
        type: getCouponConstant.GET_COUPON_SUCCESS,
        payload: {
          coupon,
          totalcoupons
        },
      });
    }
  };
};



export const deleteAttributeAction = (aid) => {
  return async (dispatch) => {
    dispatch({ type: deleteAttributeConstant.DELETE_ATTRIBUTE_REQUEST});
    const res = await axios.post(`/delete-attribute`,{
      aid
    })
    if (res.status === 200) {
      const { message,attribute} = res.data;
      dispatch({
        type:deleteAttributeConstant.DELETE_ATTRIBUTE_SUCCESS ,
        payload: {
          attribute,
          message
        },
      });
    }
  };
};


export const createAttributeAction = (attribute) => {
  return async (dispatch) => {
    dispatch({ type: createAttributeConstant.CREATE_ATTRIBUTE_REQUEST});
    const res = await axios.post(`/create-attribute`,{
      ...attribute
    })
    if (res.status === 200) {
      const { attribute} = res.data;
      dispatch({
        type: createAttributeConstant.CREATE_ATTRIBUTE_SUCCESS,
        payload: {
          attribute
        },
      });
    }
  };
};

export const getAttributeAction = (skip) => {
  return async (dispatch) => {
    dispatch({ type: getAttributeConstant.GET_ATTRIBUTE_REQUEST});
    const res = await axios.post('/get-attribute',{
      skip
    })
    if (res.status === 200) {
      const { attribute,totalattributes} = res.data;
      dispatch({
        type: getAttributeConstant.GET_ATTRIBUTE_SUCCESS,
        payload: {
          attribute,
          totalattributes
        },
      });
    }
  };
};



export const deleteGiftBoxAction = (gid) => {
  return async (dispatch) => {
    dispatch({ type: deleteGiftBoxConstant.DELETE_GIFTBOX_REQUEST});
    const res = await axios.post(`/admin-delete-giftbox`,{
      gid
    })
    if (res.status === 200) {
      const { message,giftbox} = res.data;
      dispatch({
        type:deleteGiftBoxConstant.DELETE_GIFTBOX_SUCCESS,
        payload: {
          giftbox,
          message
        },
      });
    }
  };
};


export const createGiftBoxAction = (giftboxObj) => {
  const formData = new FormData();
  for (const image of giftboxObj["images"]) {
    formData.append("images", image);
  }
  for (const key in giftboxObj) {
    if (giftboxObj[key] !== undefined && key !== "images") {
      formData.append(key, giftboxObj[key]);
    }
  }
  return async (dispatch) => {
    dispatch({ type: createGiftBoxConstant.CREATE_GIFTBOX_REQUEST});
    const res = await axios.post(`/admin-create-giftbox`,formData);
    if (res.status === 200) {
      const {giftbox} = res.data;
      dispatch({
        type: createGiftBoxConstant.CREATE_GIFTBOX_SUCCESS,
        payload: {
          giftbox
        },
      });
    }
  };
};

export const getGiftBoxAction = (skip) => {
  return async (dispatch) => {
    dispatch({ type: getGiftBoxConstant.GET_GIFTBOX_REQUEST});
    const res = await axios.post('/admin-get-giftbox',{
      skip
    })
    if (res.status === 200) {
      const { giftboxes,totalgiftboxes} = res.data;
      dispatch({
        type:getGiftBoxConstant.GET_GIFTBOX_SUCCESS ,
        payload: {
          giftboxes,
          totalgiftboxes
        },
      });
    }
  };
};





export const deleteGiftCardAction = (gid) => {
  return async (dispatch) => {
    dispatch({ type: deleteGiftCardConstant.DELETE_GIFTCARDS_REQUEST});
    const res = await axios.post(`/admin-delete-giftcard`,{
      gid
    })
    if (res.status === 200) {
      const { message,giftcard} = res.data;
      dispatch({
        type:deleteGiftCardConstant.DELETE_GIFTCARDS_SUCCESS,
        payload: {
          giftcard,
          message
        },
      });
    }
  };
};


export const createGiftCardAction = (giftcardObj) => {
  const formData = new FormData();
  // console.log("------------------------------------------------------------------------------>>>>>>>>>>>>>>>>>>>>>>>")
  console.log(giftcardObj.images)
  if(giftcardObj.images){
    for (const image of giftcardObj.images) {
      formData.append("images", image);
    }
  }
  for (const key in giftcardObj) {
    if (giftcardObj[key] !== undefined && key !== "images") {
      formData.append(key, giftcardObj[key]);
    }
  }
  return async (dispatch) => {
    dispatch({ type: createGiftCardConstant.CREATE_GIFTCARDS_REQUEST});
    const res = await axios.post(`/admin-create-giftcard`,formData);
    if (res.status === 200) {
      const {giftcard} = res.data;
      dispatch({
        type: createGiftCardConstant.CREATE_GIFTCARDS_SUCCESS,
        payload: {
          giftcard
        },
      });
    }
  };
};



export const getGiftCardAction = (skip) => {
  return async (dispatch) => {
    dispatch({ type: getGiftCardConstant.GET_GIFTCARDS_REQUEST});
    const res = await axios.post('/admin-get-giftcard',{
      skip
    })
    if (res.status === 200) {
      const { giftcards,totalgiftcards} = res.data;
      dispatch({
        type:getGiftCardConstant.GET_GIFTCARDS_SUCCESS,
        payload: {
          giftcards,
          totalgiftcards
        },
      });
    }
  };
};

export const getNotifications = () => {
  return async (dispatch) => {
    dispatch({ type: getNotificationsConstant.GET_NOTIFICATION_REQUEST});
    const res = await axios.get('/admin-notifications')
    if (res.status === 200) {
      const { notifications,totalnotifications} = res.data;
      dispatch({
        type:getNotificationsConstant.GET_NOTIFICATION_SUCCESS,
        payload: {
          notifications,
          totalnotifications
        },
      });
    }
  };
};

export const deleteNotifications = (nid) => {
  return async (dispatch) => {
    dispatch({ type: deleteNotificationsConstant.DELETE_NOTIFICATION_REQUEST});
    const res = await axios.post('/admin-delete-notifications',{
      nid
    })
    if (res.status === 200) {
      const { message} = res.data;
      dispatch({
        type:deleteNotificationsConstant.DELETE_NOTIFICATION_SUCCESS,
        payload: {
          message
        },
      });
    }
  };
};




export const AdminGetGiftBoxById = (giftBoxId) => {
  return async (dispatch) => {
    dispatch({ type: 'ADMIN_GET_GIFT_BOX_BY_ID_REQUEST' });
    try {
      const res = await axios.get(`/admin-get-gift-box/${giftBoxId}`);
      if (res.status === 200) {
        const { giftBox } = res.data;
        dispatch({
          type: 'ADMIN_GET_GIFT_BOX_BY_ID_SUCCESS',
          payload: {
            giftBox,
          },
        });
        return { payload: { giftBox } };
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'ADMIN_GET_GIFT_BOX_BY_ID_FAILURE',
        payload: {
          error: 'Failed to fetch gift box',
        },
      });
      throw error;
    }
  };
};

export const AdminUpdateGiftBox = (giftBoxId, giftBoxObj) => {
  const formData = new FormData();
  // Append necessary data to formData from giftBoxObj
  // ...

  return async (dispatch) => {
    dispatch({ type: 'ADMIN_UPDATE_GIFT_BOX_REQUEST' });
    try {
      const res = await axios.post(`/admin-update-gift-box/${giftBoxId}`, formData);
      if (res.status === 200) {
        const { updatedGiftBox } = res.data;
        dispatch({
          type: 'ADMIN_UPDATE_GIFT_BOX_SUCCESS',
          payload: {
            updatedGiftBox,
          },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'ADMIN_UPDATE_GIFT_BOX_FAILURE',
        payload: {
          error: 'Failed to update gift box',
        },
      });
    }
  };
};
