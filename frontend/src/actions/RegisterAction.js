import axios from 'axios'
import { ALL_REGISTER_FAIL, ALL_REGISTER_REQUEST, ALL_REGISTER_SUCCESS, CLEAR_ERRORS, CREATE_REGISTER_FAIL, CREATE_REGISTER_REQUEST, CREATE_REGISTER_SUCCESS, DELETE_REGISTER_FAIL, DELETE_REGISTER_REQUEST, DELETE_REGISTER_SUCCESS, MY_REGISTER_FAIL, MY_REGISTER_REQUEST, MY_REGISTER_SUCCESS, REGISTER_DETAIL_FAIL, REGISTER_DETAIL_REQUEST, REGISTER_DETAIL_SUCCESS, UPDATE_REGISTER_FAIL, UPDATE_REGISTER_REQUEST, UPDATE_REGISTER_SUCCESS } from "../constants/RegisterConstant"
export const createRegister = (register)=>async(dispatch,getState)=>{
    try {
        dispatch({type:CREATE_REGISTER_REQUEST})

        const config ={
            headers:{
                'Content-Type':'application/json'
            } 
        }

        const {data} = await axios.post('/api/v1/register/new', register, config)

        dispatch({
            type:CREATE_REGISTER_SUCCESS,
            payload : data
        })

    } catch (error) {
        dispatch({
            type: CREATE_REGISTER_FAIL,
            payload: error.response.data.message
        })
    }
}



export const myRegisters = () =>async(dispatch)=>{
    try {
        dispatch({type:MY_REGISTER_REQUEST})

        const {data} = await axios.get('/api/v1/registers/me')

        dispatch({
            type:MY_REGISTER_SUCCESS,
            payload:data.registers
        })
    } catch (error) {
        dispatch({
            type:MY_REGISTER_FAIL,
            payload: error.response.data.message
        })
    }
}


//get currently logged in user orders
export const getRegisterDetails = (id) =>async(dispatch)=>{
    try {
        dispatch({type:REGISTER_DETAIL_REQUEST})

        const {data} = await axios.get(`/api/v1/register/${id}`)

        dispatch({
            type:REGISTER_DETAIL_SUCCESS,
            payload:data.register
        })
    } catch (error) {
        dispatch({
            type:REGISTER_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }
}

//get all orders admin
export const allRegisters = () =>async(dispatch)=>{
    try {
        dispatch({type:ALL_REGISTER_REQUEST})

        const {data} = await axios.get(`/api/v1/admin/registers`)

        dispatch({
            type:ALL_REGISTER_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:ALL_REGISTER_FAIL,
            payload: error.response.data.message
        })
    }
}


export const updateRegister = (id,registerData)=>async(dispatch,getState)=>{
    try {
        dispatch({type:UPDATE_REGISTER_REQUEST})

        const config ={
            headers:{
                'Content-Type':'application/json'
            } 
        }

        const {data} = await axios.put(`/api/v1/admin/register/${id}`, registerData, config)

        dispatch({
            type:UPDATE_REGISTER_SUCCESS,
            payload : data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_REGISTER_FAIL,
            payload: error.response.data.message
        })
    }
}


export const deleteRegister = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_REGISTER_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/register/${id}`)

        dispatch({
            type: DELETE_REGISTER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_REGISTER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors =()=>async(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS
    })
}