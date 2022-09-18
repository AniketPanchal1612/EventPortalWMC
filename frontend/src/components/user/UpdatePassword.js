import React, { Fragment, useEffect, useState } from 'react'

import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { ClearErrors, updatePassword } from '../../actions/AuthAction'
import { UPDATE_PASSWORD_RESET } from '../../constants/AuthConstant'
import { Typography, Box, TextField, Button, Container } from '@mui/material'


const UpdatePassword = ({ history }) => {
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const alert = useAlert();
    const dispatch = useDispatch()

    // const { user } = useSelector(state => state.auth)
    const { error, isUpdated, loading } = useSelector(state => state.user)
    useEffect(() => {

        if (error) {
            alert.error(error)
            dispatch(ClearErrors())
        }
        if (isUpdated) {
            alert.success('Password updated successfully')

            history.push('/me')

            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }



    }, [dispatch, isUpdated, error, alert, history])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData;
        formData.set('oldPassword', oldPassword);
        formData.set('password', password);


        dispatch(updatePassword(formData))
    }

    return (
        <Fragment >
            <MetaData title={'Change Password'} />
            {/* <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mt-2 mb-5">Update Password</h1>
                        <div className="form-group">
                            <label htmlFor="old_password_field">Old Password</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                value={oldPassword}
                                name='oldPassword'
                                onChange={(e)=>setOldPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="new_password_field">New Password</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                value={password}
                                name='password'
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" disabled={loading?true:false} className="btn update-btn btn-block mt-4 mb-3">Update Password</button>
                    </form>
                </div> */}
            {/* </div> */}

            <Container component="main" maxWidth="xs"
                className="shadow-lg"
                style={{ paddingBottom: "30px", borderRadius: "20px" }}

            >
                <Box
                    sx={{
                        paddingTop: "10px",
                        marginTop: 15,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Update Password
                    </Typography>

                    <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1 }} >  
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="old_password"
                            label="Old Password"
                            name="oldPassword"
                            autoComplete="oldPassword"
                            type="password"

                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                
                        />
                        
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="new_password"
                            label="New Password"
                            name="NewPassword"
                            autoComplete="newPassword"
                            type="password"

                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            style={{ marginBottom: '30px' }}
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading ? true : false}
                        >
                            Update Password
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Fragment>
    )
}
export default UpdatePassword