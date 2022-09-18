import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { eventDetailsReducer, eventReducer, eventsReducer, newEventReducer } from './reducers/EventReducer'
import { allUsersReducers, authReducer, forgotPasswordReducer, userDetailsReducer, userReducer } from './reducers/AuthReducer'
import { shippingReducer } from './reducers/ShippingReducer'
import { allRegisterReducer, myRegisterReducer, newRegisterReducer, registerDetailsReducer, registerReducer } from './reducers/RegisterReducer'

const reducer = combineReducers({
    events: eventsReducer,
    eventDetails: eventDetailsReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword : forgotPasswordReducer,
    shipping: shippingReducer,
    //new register entry
    newRegister : newRegisterReducer,
    myRegister : myRegisterReducer,
    registerDetail : registerDetailsReducer,
    newEvent : newEventReducer,
    event: eventReducer,
    register : registerReducer,
    allRegisters : allRegisterReducer,
    allUsers: allUsersReducers,
    userDetails: userDetailsReducer

})

let initialState = {
    shipping:{

        // cartItems:localStorage.getItem('cartItems')? 
        //     JSON.parse(localStorage.getItem('cartItems')): {},
        shippingInfo: localStorage.getItem('shippingInfo')?
        JSON.parse(localStorage.getItem('shippingInfo'))
        :  {}
    }
}

const middleware = [thunk]

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store

