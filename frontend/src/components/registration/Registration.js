import React, { Fragment, useState } from 'react'
import MetaData from '../layout/MetaData'
import {useDispatch,useSelector} from 'react-redux'
import {saveShippingInfo} from '../../actions/ShippingAction'
const Registration = ({history}) => {

    const {shippingInfo} = useSelector((state)=> state.shipping)
    const {user} = useSelector((state)=> state.auth)
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)
    const [gender, setGender] = useState(shippingInfo.gender)
    const [course, setCourse] = useState(shippingInfo.course)
    const [courseSpecialization, setCourseSpecialization] = useState(shippingInfo.courseSpecialization)
    const [yearOfGraduation, setYearOfGraduation] = useState(shippingInfo.yearOfGraduation)
    const [collageName, setCollageName] = useState(shippingInfo.collageName)

    const dispatch = useDispatch()

    const submitHandler=(e)=>{
        e.preventDefault()

        dispatch(saveShippingInfo({phoneNo,gender,course,yearOfGraduation,collageName,courseSpecialization,collageName}))
        history.push('/event/confirm/confirm')
    }

  return (
    <Fragment>
        <MetaData title={'Registration Info'}/>
        <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg"
                    onSubmit={submitHandler}
                    >
                        <h1 className="mb-4">Student Info</h1>
                        {/* <h1 className="mb-4">{ user&&user.name}</h1> */}
                        <div className="form-group">
                            <label htmlFor="collage_field">Collage/University Name:</label>
                            <input
                                type="text"
                                id="collage_field"
                                className="form-control"
                                value={collageName}
                                onChange={(e)=>setCollageName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="yog_field">Year of Graduation</label>
                            <input
                                type="text"
                                id="yog_field"
                                className="form-control"
                                value={yearOfGraduation}
                                onChange={(e)=>setYearOfGraduation(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Phone no:</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                value={phoneNo}
                                onChange={(e)=>setPhoneNo(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="gender_field">Gender:</label>
                            <input
                                type="text"
                                id="gender_field"
                                className="form-control"
                                value={gender}
                                onChange={(e)=>setGender(e.target.value)}
                                required
                            />
                        </div>


                       <div className="form-group">
                            <label htmlFor="course_field">Course:</label>
                            <input
                                type="text"
                                id="course_field"
                                className="form-control"
                                value={course}
                                onChange={(e)=>setCourse(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="courseSpz_field">Course in Specialization:</label>
                            <input
                                type="text"
                                id="courseSpz_field"
                                className="form-control"
                                value={courseSpecialization}
                                onChange={(e)=>setCourseSpecialization(e.target.value)}
                                required
                            />
                        </div>
                               
                            

                            
                       
                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            Register
                            </button>
                    </form>
                </div>
            </div>
</Fragment>
  )
}

export default Registration