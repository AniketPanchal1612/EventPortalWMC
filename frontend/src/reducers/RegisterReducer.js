import { ALL_REGISTER_FAIL, ALL_REGISTER_REQUEST, ALL_REGISTER_SUCCESS, CLEAR_ERRORS, CREATE_REGISTER_FAIL, CREATE_REGISTER_REQUEST, CREATE_REGISTER_SUCCESS, DELETE_REGISTER_FAIL, DELETE_REGISTER_REQUEST, DELETE_REGISTER_RESET, DELETE_REGISTER_SUCCESS, MY_REGISTER_FAIL, MY_REGISTER_REQUEST, MY_REGISTER_SUCCESS, REGISTER_DETAIL_FAIL, REGISTER_DETAIL_REQUEST, REGISTER_DETAIL_SUCCESS, UPDATE_REGISTER_FAIL, UPDATE_REGISTER_REQUEST, UPDATE_REGISTER_RESET, UPDATE_REGISTER_SUCCESS } from "../constants/RegisterConstant"

export const newRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_REGISTER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CREATE_REGISTER_SUCCESS:
            return {
                loading: false,
                register: action.payload
            }
        case CREATE_REGISTER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}


export const myRegisterReducer = (state = { registers: [] }, action) => {
    switch (action.type) {
        case MY_REGISTER_REQUEST:
            return {
                loading: true
            }
        case MY_REGISTER_SUCCESS:
            return {
                loading: false,
                registers: action.payload
            }
        case MY_REGISTER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }

}


export const registerDetailsReducer = (state = { register: {} }, action) => {
    switch (action.type) {
        case REGISTER_DETAIL_REQUEST:
            return {
                loading: true
            }
        case REGISTER_DETAIL_SUCCESS:
            return {
                loading: false,
                register: action.payload
            }
        case REGISTER_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }

}


export const allRegisterReducer = (state = { registers: [] }, action) => {
    switch (action.type) {
        case ALL_REGISTER_REQUEST:
            return {
                loading: true
            }
        case ALL_REGISTER_SUCCESS:
            return {
                loading: false,
                registers: action.payload.registers,
                //this for amount pass from backend in ordercontrollers
                // totalAmount: action.payload.totalAmount,

            }
        case ALL_REGISTER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }

}

//update
export const registerReducer = (state = {}, action) => {
    switch (action.type) {

        case UPDATE_REGISTER_REQUEST:
        case DELETE_REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
            }



        case UPDATE_REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case DELETE_REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_REGISTER_FAIL:
        case DELETE_REGISTER_FAIL:
            return {
                ...state,
                error: action.payload
            }


        case UPDATE_REGISTER_RESET:
            return {
                ...state,
                isUpdated: false,
            }
        case DELETE_REGISTER_RESET:
            return {
                ...state,
                isDeleted: false,
            }
        case CLEAR_ERRORS:
            return {
                //return whatever in state
                ...state,
                error: null
            }
        default:
            return state
    }
}