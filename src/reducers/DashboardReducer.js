import { adminDashboardConstant } from "../constant/constant";

const initState = {
    totalsale:null,
    todaysale:null,
    yesterdaysale:null,
    thismonthsale:null,
};

const DashboardReducer = (state = initState, action) => {

    switch (action.type) {
        case adminDashboardConstant.ADMIN_DASHBOARD_SUCCESS:
            state={
                ...state,
                totalsale:action.payload.totalsale,
                todaysale:action.payload.todaysale,
                yesterdaysale:action.payload.yesterdaysale,
                thismonthsale:action.payload.thismonthsale,
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

export default DashboardReducer