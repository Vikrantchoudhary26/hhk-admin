import { getCouponConstant } from "../constant/constant";

const initState = {
    coupons:[],
    totalcoupons:null,
};

const CouponReducer = (state = initState, action) => {

    switch (action.type) {
        case getCouponConstant.GET_COUPON_SUCCESS:
            state={
                ...state,
                coupons:action.payload.coupon,
                totalcoupons:action.payload.totalcoupons,
            }
            break;
        default: {
            state = {
                ...state
            }
        }
    }
    return state;
}

export default CouponReducer