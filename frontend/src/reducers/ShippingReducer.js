import { ADD_TO_CART, SAVE_SHIPPING_INFO } from "../constants/CartConstant"

export const shippingReducer =(state={cartItems:{},shippingInfo:{} },action)=>{
    switch(action.type){
        case ADD_TO_CART: 
        return{
            ...state,
            cartItems: action.payload
        } 
            case SAVE_SHIPPING_INFO:{
                return{
                    ...state,
                    shippingInfo: action.payload
                }
            }
            
        default:
            return state
    }
}