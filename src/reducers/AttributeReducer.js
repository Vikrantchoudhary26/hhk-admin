import { createAttributeConstant, getAttributeConstant } from "../constant/constant";

const initState = {
    attributes: [],
    totalattriubtes: null,
};

const AttributeReducer = (state = initState, action) => {

    switch (action.type) {
        case getAttributeConstant.GET_ATTRIBUTE_SUCCESS:
            state = {
                ...state,
                attributes: action.payload.attribute,
                totalattributes: action.payload.totalattributes,
            }
            break;
        case createAttributeConstant.CREATE_ATTRIBUTE_SUCCESS:
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

export default  AttributeReducer