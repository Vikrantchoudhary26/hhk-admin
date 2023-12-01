import { adminAllCategoryConstant, adminAllCategoryParentConstant, adminAllOrdersConstant, adminAllProductConstant, adminCustomersConstants, adminGetUserInfoConstants, adminRecentOrderConstants, emailConstants, otpConstants, userLoginConstants } from "../../constant/constant";
import { adminEditProductConstants } from "../../constant/constant";


const initState = {

    recentorders: [],
    products: [],
    category: [],
    allorders: [],
    products: [],
    category: [],
    customers: [],
    allcategory: [],

    message: '',

    authenticate: false,
    otpSent: false,

    otp: null,
    userinfo: null,
    totalorders: null,
    totalcustomers: null,
    totalproducts: null,
    totalcategory: null,
};

const AdminReducer = (state = initState, action) => {

    switch (action.type) {
        case emailConstants.EMAIL_SUCCESS:
            state = {
                ...state,
                otp: action.payload.otp,
            }
            break;
        case adminAllCategoryParentConstant.ADMIN_ALL_CATEGORY_SUCCESS:
            state = {
                ...state,
                allcategory: action.payload.category,
            }
            break;
        case userLoginConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                admin: action.payload.user,
                authenticate: true,
            }
            break;
        case otpConstants.OTP_SUCCESS:
            state = {
                ...state,
                otp: action.payload.otp,
                otpSent: true,
            }
            break;
        case emailConstants.EMAIL_SUCCESS:
            state = {
                ...state,
                otpSent: true,
            }
        case adminRecentOrderConstants.ADMIN_RECENTORDER_SUCCESS:
            state = {
                ...state,
                recentorders: action.payload.recentorders,
                delivered: action.payload.delivered,
                pending: action.payload.pending,
                proccessing: action.payload.proccessing,
            }
            break;
        case adminGetUserInfoConstants.ADMIN_USER_INFO_SUCCESS:
            state = {
                ...state,
                userinfo: action.payload.user,
            }
            break;
        case adminAllProductConstant.ADMIN_PRODUCTS_SUCCESS:
            state = {
                ...state,
                products: action.payload.products,
                totalproducts: action.payload.totalproducts,
            }
            break;
        case adminAllCategoryConstant.ADMIN_CATEGORY_SUCCESS:
            state = {
                ...state,
                category: action.payload.category,
                totalcategory: action.payload.totalcategory,
            }
            break;
        case adminCustomersConstants.ADMIN_CUSTOMERS_SUCCESS:
            state = {
                ...state,
                customers: action.payload.customers,
                totalcustomers: action.payload.totalcustomers
            }
            break;
        case adminAllOrdersConstant.ADMIN_ALLORDERS_SUCCESS:
            state = {
                ...state,
                allorders: action.payload.orders,
                totalorders: action.payload.totalorders
            }
            break;
        case adminEditProductConstants.ADMIN_EDITPRODUCT_REQUEST:
            return { ...state, loading: true };

        case adminEditProductConstants.ADMIN_EDITPRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                editedProduct: action.payload.product,
            };

        case adminEditProductConstants.ADMIN_EDITPRODUCT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };
        default: {
            state = {
                ...state
            }
        }
    }
    return state;
}

export default AdminReducer