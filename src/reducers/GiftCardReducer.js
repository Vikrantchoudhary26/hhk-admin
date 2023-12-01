import {  createGiftCardConstant, getGiftCardConstant } from "../constant/constant";

const initState = {
    giftcards: [],
    totalgiftcards:null,
};

const GiftCardReducer = (state = initState, action) => {

    switch (action.type) {
        case getGiftCardConstant.GET_GIFTCARDS_SUCCESS:
            state = {
                ...state,
                giftcards: action.payload.giftcards,
                totalgiftcards:action.payload.totalgiftcards,
            }
            break;
        case createGiftCardConstant.CREATE_GIFTCARDS_SUCCESS:
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