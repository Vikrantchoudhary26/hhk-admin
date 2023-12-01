import { getNotificationsConstant } from "../constant/constant";

const initState = {
    notifications: [],
    totalnotifications:null,
};

const NotificationReducer = (state = initState, action) => {

    switch (action.type) {
        case getNotificationsConstant.GET_NOTIFICATION_SUCCESS:
            state = {
                ...state,
                notifications: action.payload.notifications,
                totalnotifications:action.payload.totalnotifications,
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

export default  NotificationReducer