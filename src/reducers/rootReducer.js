import { combineReducers } from "redux";
import AdminReducer from "./Admin/AdminReducer";
import CouponReducer from "./CouponReducer";
import AttributeReducer from "./AttributeReducer";
import GiftBoxReducer from "./GiftBoxReducer";
import GiftCardReducer from "./GiftCardReducer";
import DashboardReducer from "./DashboardReducer";
import NotificationReducer from "./NotificationReducer";

const rootReducer = combineReducers({
    admin:AdminReducer,
    coupon:CouponReducer,
    attribute:AttributeReducer,
    giftbox:GiftBoxReducer,
    giftcard:GiftCardReducer,
    dashboard:DashboardReducer,
    notification:NotificationReducer,
});

export default rootReducer;