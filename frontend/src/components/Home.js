import React, { Fragment, useEffect, useState } from 'react'
import MetaData from './layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { getEvents } from '../actions/EventAction'
import Event from './event/Event'
import Loader from './layout/Loader'
import { useAlert } from 'react-alert'
import Pagination from 'react-js-pagination'
const Home = ({match}) => {

    const [currentPage, setCurrentPage] = useState(1)


    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, events, eventsCount, error, resPerPage } = useSelector((state) => state.events)

  const keyword = match.params.keyword


    useEffect(() => {
        if (error) {
            return alert.error(error)
        }
        dispatch(getEvents(currentPage,keyword));

    }, [dispatch, error, alert, currentPage,keyword])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>

                    <MetaData title={'Explore Events'} />

                    <h1 id="products_heading">Latest Events</h1>
                    <section id="products" className="container mt-5">
                        <div className="row">
                            {events && events.map(event => (
                                <Event key={event._id} event={event} />
                            ))}
                        </div>
                    </section>

                    {resPerPage <= eventsCount && (

                        <div className='d-flex justify-content-center mt-6'>
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={eventsCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}

                                //css
                                itemClass='page-item'
                                linkClass='page-link'
                            />
                        </div>
                    )}
                </Fragment>
            )}
        </Fragment>
    )
}

export default Home