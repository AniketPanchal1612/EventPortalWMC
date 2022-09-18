
import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'
const RegisterSuccess = () => {
  return (
    <Fragment>
        <MetaData title={'Event Success'} />
        <div className="row justify-content-center">
            <div className="col-6 mt-5 text-center">
                <img className="my-5 img-fluid d-block mx-auto" src="https://freepngimg.com/thumb/success/6-2-success-png-image.png" alt="Order Success" width="200" height="200" />

                <h2>Your Event has been registered successfully.</h2>

                <Link to="/events/me">Go to My Events</Link>
                
            </div>

        </div>

    </Fragment>
  )
}

export default RegisterSuccess