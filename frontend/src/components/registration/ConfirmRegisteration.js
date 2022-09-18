import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import { useSelector,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {useAlert} from 'react-alert'
import {createRegister,clearErrors} from '../../actions/RegisterAction'
const ConfirmRegisteration = ({ history }) => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { shippingInfo, cartItems } = useSelector(state => state.shipping)
    const { user } = useSelector(state => state.auth)
    const {error} = useSelector(state=>state.newRegister)
    
    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
    },[dispatch,alert,error])


    const register = {
        registerInfo : shippingInfo,
        registerEventDetail: cartItems
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        dispatch(createRegister(register))
        history.push('/success')
    }    
    const goToSuccess =()=>{
        history.push('/success')
    }
    return (
        <Fragment>
            <MetaData title={"Confirm Registration"} />

            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-confirm">

                    <h4 className="mb-3">Registration Info</h4>
                    <p><b>Name:</b> {user && user.name}</p>
                    <p><b>Email:</b> {user && user.email}</p>
                    <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
                    <p><b>Collage/University Name:</b> {shippingInfo.collageName}</p>
                    <p><b>Course:</b> {shippingInfo.course}</p>
                    <p><b>Course in Specialization:</b> {shippingInfo.courseSpecialization}</p>



                    <hr />
                    <h4 className="mt-4">Your Register Event:</h4>
                    <div className="row">
                        <div className="col-4 col-lg-3">
                            <img src={cartItems.image} alt="Laptop" height="90" width="115" />
                        </div>

                        <div className="col-5 col-lg-6">
                            <Link to={`/event/${cartItems.event}`}>{cartItems.name}</Link>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-3 my-4">
                    {/* <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">${(itemPrice).toFixed(2)}</span></p>
                        <p>Shipping: <span className="order-summary-values">${shippingPrice}</span></p>
                        <p>Tax:  <span className="order-summary-values">${taxPrice}</span></p>

                        <hr />

                        <p>Total: <span className="order-summary-values">${totalPrice}</span></p>

                        <hr /> */}
                    {/* <button id="checkout_btn" className="btn btn-primary btn-block"
                    onClick={goToSuccess}
                    onSubmit={submitHandler}
                    >Submit</button> */}

<form className="shadow-lg" onSubmit={submitHandler}>
<button
              id="pay_btn"
              type="submit"
              className="btn btn-block btn-primary py-3"
            >
              Submit
            </button>
     </form>
                </div>
            </div>
            {/* </div> */}
        </Fragment>
    )
}

export default ConfirmRegisteration