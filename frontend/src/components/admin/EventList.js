import React, { Fragment, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { MDBDataTable } from 'mdbreact'
import Loader from '../layout/Loader'
import SideBar from './SideBar'
import { Link } from 'react-router-dom'
import { getAdminEvents, ClearErrors, deleteEvent } from '../../actions/EventAction'
import { DELETE_EVENT_RESET } from '../../constants/EventConstant'
const EventList = ({ history }) => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, events, error} = useSelector(state => state.events)
    const {error:deleteError, isDeleted}= useSelector(state=>state.event) 
    // console.log(events)

    console.log(isDeleted)

    useEffect(() => {
        dispatch(getAdminEvents())

        if (error) {
            alert.error(error);
            dispatch(ClearErrors())
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(ClearErrors())
        }
        console.log(isDeleted)
        if (isDeleted) {
            alert.success('Event deleted successfully');
            history.push('/admin/events');
            dispatch({ type: DELETE_EVENT_RESET })
        }


    }, [dispatch, alert, error, isDeleted, history])
    const setProducts = () => {
        const data = {
            columns: [
                
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc',
                    
                },
                {
                    label: 'Date',
                    field: 'date',
                    sort: 'asc'
                },
                {
                    label: 'Category',
                    field: 'category',
                    sort: 'asc'
                },
                // {
                //     label: 'Capacity',
                //     field: 'capacity',
                //     sort: 'asc'
                // },
                {
                    label: 'Organized By',
                    field: 'org',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
                
            ],
            rows: []
        }
        // console.log(products)
        events.forEach(event => {
            data.rows.push({
                id: event._id,
                name: event.name,
                date: String(event.date).slice(0,10),
                category:event.category,
                // capacity: event.capacity,
                org: event.organizedBy,
                actions: 
                <Fragment>
                    <Link to={`/admin/event/${event._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={()=>deleteProductHandler(event._id)} >
                        <i className="fa fa-trash" ></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    const deleteProductHandler=(id)=>{
        dispatch(deleteEvent(id))
    }


    return (
        <Fragment>
            <MetaData title={'All Events'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <SideBar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Events</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setProducts()}
                                // className="mx-0"
                                bordered
                                striped
                                hover
                                
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default EventList
