import axios from 'axios'
import { NEW_PASSWORD_SUCCESS } from '../constants/AuthConstant'
import { ADMIN_EVENTS_FAIL, ADMIN_EVENTS_REQUEST, ADMIN_EVENTS_SUCCESS, ALL_EVENTS_FAIL, ALL_EVENTS_REQUEST, ALL_EVENTS_SUCCESS, CLEAR_ERRORS, DELETE_EVENT_FAIL, DELETE_EVENT_REQUEST, DELETE_EVENT_SUCCESS, EVENT_DETAILS_FAIL, EVENT_DETAILS_REQUEST, EVENT_DETAILS_SUCCESS, NEW_EVENT_FAIL, NEW_EVENT_REQUEST, NEW_EVENT_SUCCESS, UPDATE_EVENT_FAIL, UPDATE_EVENT_REQUEST, UPDATE_EVENT_SUCCESS } from '../constants/EventConstant'

export const getEvents =(currentPage=1, keyword='')=> async (dispatch) =>{

    try {
        dispatch({type:ALL_EVENTS_REQUEST})  

        const {data} = await axios.get(`/api/v1/events?keyword=${keyword}&page=${currentPage}`)

        //pull data

        dispatch({
            type:ALL_EVENTS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type:ALL_EVENTS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getEventDetails = (id) => async (dispatch) =>{
    try {
        dispatch({type:EVENT_DETAILS_REQUEST})

        //pull data
        const {data} = await axios.get(`/api/v1/event/${id}`)

        dispatch({
            type:EVENT_DETAILS_SUCCESS,
            payload: data.event
        })
        
    } catch (error) {
        dispatch({
            type:EVENT_DETAILS_FAIL,
            payload: error.response.data.message
        })
        
    }
}


export const newEvent = (eventData) => async (dispatch) => {
    // console.log(eventData.get('name'))
    try {

        dispatch({ type: NEW_EVENT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/admin/event/new`, eventData, config)

        dispatch({
            type: NEW_EVENT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_EVENT_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getAdminEvents = () => async (dispatch) =>{
    try {
        dispatch({type:ADMIN_EVENTS_REQUEST})

        //pull data
        const {data} = await axios.get(`/api/v1/admin/events`)

        dispatch({
            type:ADMIN_EVENTS_SUCCESS,
            payload: data.events
        })
        
    } catch (error) {
        dispatch({
            type:ADMIN_EVENTS_FAIL,
            payload: error.response.data.message
        })
        
    }
}


export const ClearErrors =()=> async(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS
    })
}

//DELETE PRODUCT
export const deleteEvent = (id) => async (dispatch) =>{
    try {
        dispatch({type:DELETE_EVENT_REQUEST})

        
        //pull data
        const {data} = await axios.delete(`/api/v1/admin/event/${id}`)
        console.log(data)
        dispatch({
            type:DELETE_EVENT_SUCCESS,
            payload: data.success
        })
        
    } catch (error) {
        dispatch({
            type:DELETE_EVENT_FAIL,
            payload: error.response.data.message
        })
        
    }
}

export const updateEvent = (id,eventData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_EVENT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/event/${id}`, eventData, config)

        dispatch({
            type: UPDATE_EVENT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_EVENT_FAIL,
            payload: error.response.data.message
        })
    }
}

