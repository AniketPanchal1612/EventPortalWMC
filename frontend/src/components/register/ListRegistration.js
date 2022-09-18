import React, { Fragment, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import {MDBDataTable} from 'mdbreact'
import Loader from '../layout/Loader'
import {Link} from 'react-router-dom'
import {clearErrors, myRegisters} from '../../actions/RegisterAction'
const ListRegistration = () => {

  const alert = useAlert()
  const dispatch = useDispatch()

  const {error , registers,loading} = useSelector(state=>state.myRegister)

  useEffect(()=>{
    dispatch(myRegisters())

    if(error){
      alert.error(error);
      dispatch(clearErrors())
    }

  },[dispatch,alert,error])

  const setRegisters=()=>{
    const data = {
      columns:[
        {
          label:'Register ID',
          field :'id',
          sort :'asc'
        },
        {
          label:'Event Name',
          field :'eventName',
          sort :'asc'
        },
        // {
        //   label:'Amount',
        //   field :'amount',
        //   sort :'asc'
        // },
        // {
        //   label:'Status',
        //   field :'status',
        //   sort :'asc'
        // },
        {
          label:'Actions',
          field :'actions',
          sort :'asc'
        }
      ],
      rows:[]
    }
    console.log(registers)
    registers.forEach(register=>{
      data.rows.push({
        id: register._id,
        eventName: register.registerEventDetail.name,
        actions:
        <Link to={`/register/${register._id}`} className="btn btn-primary">
          <i className='fa fa-eye' />
        </Link>
      })
    })
    return data
  }



  return (
    <Fragment>
      <MetaData title={'My Regsiter Event'} />

      <h1 className='mt-5'>My Events</h1>

      {loading ? <Loader />:(
        <MDBDataTable
        data={setRegisters()}
        className='px-3'
        bordered
        striped
        hover 
        />
      )}
    </Fragment>
  )
}

export default ListRegistration







