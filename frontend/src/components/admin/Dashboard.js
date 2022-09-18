import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import { useSelector, useDispatch } from 'react-redux'
import SideBar from './SideBar'
import SideBar2 from './SideBar2'
import { getAdminEvents, ClearErrors } from '../../actions/EventAction'
import { allRegisters } from '../../actions/RegisterAction'
import { allUsers } from '../../actions/AuthAction'

const Dashboard = () => {
    const dispatch = useDispatch()
    const { events } = useSelector(state => state.events)

    const {users} = useSelector(state=>state.allUsers)
    const { registers } = useSelector(state => state.allRegisters)
        
    useEffect(() => {
        dispatch(getAdminEvents())
        dispatch(allRegisters())
        dispatch(allUsers())
    }, [dispatch])

    return (
        <Fragment>

            <div className="row">
                <div className="col-12 col-sm-2 col-md-2">
                    <SideBar />
                    {/* <SideBar2 /> */}
                </div>

                <div className="col-12 col-sm-10 col-md-10">
                    <h1 className="my-4">Dashboard</h1>
                    
                        <Fragment>
                            <MetaData title={"Admin Dashboard"} />
                    {/* <div className="row pr-4">
                        <div className="col-xl-12 col-sm-12 mb-3">
                            <div className="card text-white bg-primary o-hidden h-100">
                                <div className="card-body">
                                    <div className="text-center card-font-size">Total Amount<br />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    <div className="row pr-4">
                        <div className="col-xl-4 col-sm-6 mb-3">
                            <div className="card text-white bg-success o-hidden h-100">
                                <div className="card-body">
                                    <div className="text-center card-font-size">Events<br />{events && events.length}</div>
                                </div>
                                <Link className="card-footer text-white clearfix small z-1" to="/admin/events">
                                    <span className="float-left">View Details</span>
                                    <span className="float-right">
                                        <i className="fa fa-angle-right"></i>
                                    </span>
                                </Link>
                            </div>
                        </div>


                        <div className="col-xl-4 col-sm-6 mb-3">
                            <div className="card text-white bg-danger o-hidden h-100">
                                <div className="card-body">
                                    <div className="text-center card-font-size">Total Registration<br />{registers && registers.length}</div>
                                </div>
                                <Link className="card-footer text-white clearfix small z-1" to="/admin/registers">
                                    <span className="float-left">View Details</span>
                                    <span className="float-right">
                                        <i className="fa fa-angle-right"></i>
                                    </span>
                                </Link>
                            </div>
                        </div>


                        <div className="col-xl-4 col-sm-6 mb-3">
                            <div className="card text-white bg-info o-hidden h-100">
                                <div className="card-body">
                                    <div className="text-center card-font-size">Users<br />{users && users.length}</div>
                                </div>
                                <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                    <span className="float-left">View Details</span>
                                    <span className="float-right">
                                        <i className="fa fa-angle-right"></i>
                                    </span>
                                </Link>
                            </div>
                        </div>


                        {/* <div className="col-xl-3 col-sm-6 mb-3">
                            <div className="card text-white bg-warning o-hidden h-100">
                                <div className="card-body">
                                    <div className="text-center card-font-size">Total Registration<br /></div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                        </Fragment>
                    
                </div>
            </div>
        </Fragment>
    )
}

export default Dashboard
