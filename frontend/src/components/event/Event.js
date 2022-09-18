import React from 'react'
import {Link} from 'react-router-dom'

const Event = ({event}) => {
  return (
    <div className="col-sm-12 col-md-6 col-lg-6 my-3">
                        <div className="card p-3 rounded">
                            <img
                                className="card-img mx-auto"
                                src={event.images[0].url}
                            />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">
                                    <Link to={`/event/${event._id}`}>{event.name}</Link>
                                </h5>
                                <p className='mt-auto'>{event.organizedBy}</p>

                                <p className='mt-auto'>Date: {String(event.date).substring(0,10)}</p>
                                <p style={{color:'green'}}>{event.category}</p>
                                <Link to={`/event/${event._id}`} id="view_btn" className="btn btn-block">View Details</Link>
                            </div>
                        </div>
                    </div>
  )
}

export default Event