import React, { Fragment, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { MDBDataTable } from 'mdbreact'
import Loader from '../layout/Loader'
import SideBar from './SideBar'
import { Link } from 'react-router-dom'
import { allRegisters, clearErrors, deleteRegister } from '../../actions/RegisterAction'
import { DELETE_REGISTER_RESET } from '../../constants/RegisterConstant'

const RegisterList = ({history}) => {

  const alert = useAlert()
    const dispatch = useDispatch()  
    // const { events} = useSelector(state => state.events)
    

    const { loading, registers, error} = useSelector(state => state.allRegisters)
    const {isDeleted} = useSelector(state => state.register)
    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(allRegisters())

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        console.log(isDeleted)
        if (isDeleted) {
            alert.success('Order deleted successfully');
            history.push('/admin/registers');
            dispatch({ type: DELETE_REGISTER_RESET })
        }


    }, [dispatch, alert, error,isDeleted, history])

    const deleteOrderHandler =(id)=>{
        dispatch(deleteRegister(id))
    }
    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Register ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Date',
                    field: 'date',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }
        console.log(registers)
        registers.forEach(register => {
            data.rows.push({
                id: register._id,
                name: register.registerEventDetail.name,
                user: register.user,
                date: String(register.createdAt).substring(0,10),
                actions: <Fragment>
                    <Link to={`/admin/register/${register._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-eye"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={()=>deleteOrderHandler(register._id)}>
                        <i className="fa fa-trash" ></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }


  return (
    <Fragment>
            <MetaData title={'All Orders'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <SideBar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Registrations</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setOrders()}
                                // className="px-3"
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

export default RegisterList
