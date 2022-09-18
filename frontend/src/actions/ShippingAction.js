import axios from 'axios'
import { ADD_TO_CART, SAVE_SHIPPING_INFO } from "../constants/CartConstant"

export const addItemToCart = (id)=>async(dispatch,getState)=>{
    
    const {data} =await axios.get(`/api/v1/event/${id}`)
    console.log(data)
    dispatch({
        type:ADD_TO_CART,
        payload:{
            event: data.event._id,
            name: data.event.name,
            image:data.event.images[0].url
        }
    })
    
    localStorage.setItem('cartItems', 
    JSON.stringify(data))

}


//shipping info items
export const saveShippingInfo = (data)=>async(dispatch)=>{
    
        
    dispatch({
        type:SAVE_SHIPPING_INFO,
        payload:data
    })
    
    localStorage.setItem('shippingInfo', 
    JSON.stringify(data))

}