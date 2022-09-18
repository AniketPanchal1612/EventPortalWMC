import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ClearErrors, getEventDetails } from '../../actions/EventAction'
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData'
// import {DurationAiFillClockCircle} from 'react-icons'
import Loader from '../layout/Loader'
import { Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { eventDetailsReducer } from '../../reducers/EventReducer'
import { addItemToCart } from '../../actions/ShippingAction'
const EventDetails = ({ match }) => {
  const dispatch = useDispatch()
  const { loading, error, event } = useSelector((state) => state.eventDetails)
  const alert = useAlert()
  let check = true;
  Boolean(check)
  var today = new Date()
  var currentDate = today.getDate()
  var currentMonth = today.getMonth() + 1
  var currentYear = today.getFullYear()

  var eventyear = String(event.date).slice(0, 4)
  var eventmonth = String(event.date).slice(5, 7)
  var eventday = String(event.date).slice(8, 10)
  console.log(currentDate, currentMonth, currentYear)
  console.log(event.date)
  console.log(eventyear)
  console.log(eventmonth)
  console.log(eventday)
  var g1 = new Date(currentYear, currentMonth, currentDate);
     
    // (YYYY, MM, DD, Hr, Min, Sec)
    var g2 = new Date(eventyear, eventmonth, eventday);
    if (g1.getTime() < g2.getTime()){

      check = true;
      // console.log("current is lesser than event");
    }
    else if (g1.getTime() > g2.getTime()){
      check = false

        // console.log("current is greater than event");
}
    else{
      check = true;
        // console.log("both are equal");
      }
    console.log(check)
  useEffect(() => {
    dispatch(getEventDetails(match.params.id))
    if (error) {
      alert.error(error);
      dispatch(ClearErrors())
    }

  }, [dispatch, error, alert, match.params.id])

  const addToCart = () => {
    dispatch(addItemToCart(match.params.id));
    // alert.success('Item Added to Cart')
  }
  return (
    <Fragment>

      {loading ? <Loader /> : (
        <Fragment>
          <div className="row f-flex">
            <div className="col-12 col-lg-12 col-md-12 col-sm-12 img-fluid" id="event_image">
              <Carousel pause='hover'>
                {event.images && event.images.map(image => (
                  <Carousel.Item key={image.public_id}>
                    <img
                      className='d-block w-100 mt-3' src={image.url} alt={event.title} />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>

            <div className="col-12 col-lg-12 mt-5">

              <h3>{event.name}</h3>
              <p id="event_seller mb-3">Organized By: <strong>{event.organizedBy}</strong></p>
              <p id="event_id">Event # {event._id}</p>
              <span>
                Category:
                <button type="" id="" className="ml-2 mb-3" style={{ color: 'green', border: 'none' }} disabled>  {event.category}</button>
              </span>
              <hr />
              <p id="event_date mb-3">Start Date: <strong>{String(event.date).substring(0, 10)}</strong></p>
              <p id="event_duration mb-3">Duration: <strong>{event.duration} hour</strong></p>

              <hr />
              <h4 className="mt-2">Description:</h4>
              <p>{event.description}</p>


            </div>

            {/* <button type="button" id="cart_btn" className="btn btn-primary d-inline mt-5" style={{width:'50%', marginLeft:'25%'}} >Register</button> */}
            {!check? <button to='/registerinfo' type="button" id="cart_btn" className="btn btn-primary d-inline mt-5" style={{ width: '50%', marginLeft: '25%'}} disabled={!check}>Event Closed</button>:
            <Link to='/registerinfo' type="button" id="cart_btn" className="btn btn-primary d-inline mt-5" style={{ width: '50%', marginLeft: '25%' }} onClick={addToCart}>Register</Link>
             }
          </div>

        </Fragment>
      )}


    </Fragment>
  )
}

export default EventDetails