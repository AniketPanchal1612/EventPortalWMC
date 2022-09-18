import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import Loader from '../layout/Loader'
import { clearErrors, getRegisterDetails, updateRegister } from '../../actions/RegisterAction'
import { UPDATE_REGISTER_RESET } from '../../constants/RegisterConstant'

const RegisterDetails = ({ match }) => {

    // const [status, setStatus] = useState('');


    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, register={} } = useSelector(state => state.registerDetail)
    const { registerInfo, registerEventDetail, user } = register
    const { error, isUpdated } = useSelector(state => state.register)

    const orderId = match.params.id;

    useEffect(() => {

        dispatch(getRegisterDetails(orderId))



        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        console.log(isUpdated)
        if (isUpdated) {
            alert.success('Order updated successfully');
            dispatch({ type: UPDATE_REGISTER_RESET })
        }

    }, [dispatch, alert, error,isUpdated, orderId])

    const updateOrderHandler = (id) => {

    }

   
    return (
        <Fragment>
            <MetaData title={`Process Orders # ${register &&   register._id}`} />
            <div className="row">
                

                <div className="col-12 col-md-10">
                    <Fragment>
                        {loading ? <Loader /> : (
                            <div className="row d-flex justify-content-around">
                                <div className="col-12 col-lg-7 order-details">

                                    <h1 className="my-5">Register # {register._id}</h1>

                                    <h4 className="mb-4">User Info</h4>
                                    <p><b>Name:</b> {user && user.name}</p>
                                    <p><b>Email:</b> {user && user.email}</p>
                                    <p><b>Phone:</b> {registerInfo && registerInfo.phoneNo}</p>
                                    <p><b>Course:</b> {registerInfo && registerInfo.course}</p>
                                    <p><b>Course in Specialization:</b> {registerInfo && registerInfo.courseSpecialization}</p>
                                    <p><b>Year of Graduation:</b> {registerInfo && registerInfo.yearOfGraduation}</p>
                                    {/* <p className="mb-4"><b>Address:</b>{shippingDetails}</p> */}
                                    {/* <p><b>Amount:</b> ${totalPrice}</p> */}

                                    <hr />

                                    <h4 className="my-4">Event Detail:</h4>
                                    <p><b>Event Id:</b> {registerEventDetail && registerEventDetail.event}</p>
                                    <p><b>Event Name:</b> {registerEventDetail && registerEventDetail.name}</p>
                                    {/* <p><b>Event Name:</b> {registerEventDetail && registerEventDetail.category}</p> */}
                                    
                              

                                   
                                                                       
                                    <hr />
                                </div>

                                
                                    
                                

                            </div>

                        )}


                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default RegisterDetails
