import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import axios from 'axios'
import SideBar from './SideBar'
import { newEvent, ClearErrors } from '../../actions/EventAction'
import { NEW_EVENT_RESET } from '../../constants/EventConstant'

const NewEvent = ({ history }) => {


    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [capacity, setCapacity] = useState(0);
    const [date, setDate] = useState('');
    const [organizedBy, setOrganizedBy] = useState('');
    const [duration, setDuration] = useState('');

    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        '----', 'Coding', 'Long Hackathon', 'Entertainment', 'Sports', 'Education'
    ]
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, error, success } = useSelector(state => state.newEvent)

    useEffect(() => {

        if (error) {
            alert.error(error);
            console.log(error);
            dispatch(ClearErrors())
        }

        if (success) {
            history.push('/admin/events');
            alert.success('Event created successfully');
            dispatch({ type: NEW_EVENT_RESET })
        }

    }, [dispatch, alert, error, success, history])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData;
        formData.set('name', name)
        formData.set('description', description)
        formData.set('category', category)
        formData.set('capacity', capacity)
        formData.set('date', date)
        formData.set('organizedBy', organizedBy)
        formData.set('duration', duration)

        images.forEach(image => {
            formData.append('images', image)
        })

        dispatch(newEvent(formData))
    }


    const onChange = e => {
        const files = Array.from(e.target.files)

        setImagesPreview([]);
        setImages([]);

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }
            reader.readAsDataURL(file);
        })


    }


    return (
        <Fragment>
            <MetaData title={'New Event'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <SideBar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" encType='multipart/form-data' onSubmit={submitHandler}>
                                <h1 className="mb-4">New Event</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>


                                <div className="form-group">
                                    <label htmlFor="description_field">Description</label>
                                    <textarea className="form-control" id="description_field" rows="8" value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category_field">Category</label>
                                    <select className="form-control" id="category_field" value={category} onChange={(e) => setCategory(e.target.value)}>
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="date_field">Date</label>
                                    <input
                                        type="date"
                                        id="date_field"
                                        className="form-control"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="capacity_field">Capicity</label>
                                    <input
                                        type="number"
                                        id="capicity_field"
                                        className="form-control"
                                        value={capacity}
                                        onChange={(e) => setCapacity(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="orgby_field">Organized By</label>
                                    <input
                                        type="text"
                                        id="orgby_field"
                                        className="form-control"
                                        value={organizedBy}
                                        onChange={(e) => setOrganizedBy(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="duration_field">Duration</label>
                                    <input
                                        type="text"
                                        id="duration_field"
                                        className="form-control"
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                    />
                                </div>


                                <div className='form-group'>
                                    <label>Images</label>

                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='product_images'
                                            className='custom-file-input'
                                            id='customFile'
                                            multiple
                                            onChange={onChange}
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Choose Images
                                        </label>
                                    </div>
                                    {imagesPreview.map(img => (

                                        <img className='mt-3 mr-2' width='55' height='52' src={img} key={img} alt="Image" />

                                    ))}
                                    x
                                </div>


                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    CREATE
                                </button>

                            </form>
                        </div>

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default NewEvent
