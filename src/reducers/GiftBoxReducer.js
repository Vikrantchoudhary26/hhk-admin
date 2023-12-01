import { createGiftBoxConstant, getGiftBoxConstant } from "../constant/constant";

const initState = {
    giftboxes: [],
    totalgiftboxes:null,
};

const GiftCardReducer = (state = initState, action) => {

    switch (action.type) {
        case getGiftBoxConstant.GET_GIFTBOX_SUCCESS:
            state = {
                ...state,
                giftboxes: action.payload.giftboxes,
                totalgiftboxes:action.payload.totalgiftboxes,
            }
            break;
        case createGiftBoxConstant.CREATE_GIFTBOX_SUCCESS:
            state = {
                ...state,
                message: action.payload.message,
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

export default  GiftCardReducer