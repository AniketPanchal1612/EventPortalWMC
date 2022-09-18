import React, { Fragment, useEffect, useState } from 'react'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { login, ClearErrors } from '../../actions/AuthAction'
import { Typography, Box, Grid, TextField, Button, Container, CssBaseline, Avatar } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom'
const Login = ({ history, location }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const alert = useAlert();
  const dispatch = useDispatch()

  const { isAuthenticated, error, loading, success } = useSelector(state => state.auth)

  //if not logged in then redirect login and split and get shipping from cart and redirect there
  const redirect = location.search ? location.search.split('=')[1] : '/'


  useEffect(() => {
    if (isAuthenticated) {
      // history.push('/')
      //  alert.success("login successfully")

      history.push(redirect)
    }
    if (error) {
      alert.error(error)
      dispatch(ClearErrors())

    }
    if (success) {
      alert.success("login successfully")
    }
    // dispatch(login)

  }, [dispatch, isAuthenticated, error, alert, history])

  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch login from action
    dispatch(login(email, password))
  }

  return (
    // <Fragment>
    //   {loading ? <Loader/>:(
    //     <Fragment>
    //       <MetaData title={'Login'} />

    //     <div className="row wrapper"> 
    // <div className="col-10 col-lg-5">
    //     <form className="shadow-lg" onSubmit={submitHandler}>
    //         <h1 className="mb-3">Login</h1>
    //         <div className="form-group">
    //           <label htmlFor="email_field">Email</label>
    //           <input
    //             type="email"
    //             id="email_field"
    //             className="form-control"
    //             value={email}
    //             onChange={(e)=>setEmail(e.target.value)}
    //           />
    //         </div>

    //         <div className="form-group">
    //           <label htmlFor="password_field">Password</label>
    //           <input
    //             type="password"
    //             id="password_field"
    //             className="form-control"
    //             value={password}
    //             onChange={(e)=>setPassword(e.target.value)}
    //           />
    //         </div>

    //         <Link to='/password/forgot' className="float-right mb-4">Forgot Password?</Link>

    //         <button
    //           id="login_button"
    //           type="submit"
    //           className="btn btn-block py-3"
    //         >
    //           LOGIN
    //         </button>

    //         <Link to="/register" className="float-right mt-3">New User?</Link>
    //       </form>
    //   </div>
    // </div>


    //   </Fragment>


    //   )}

    // </Fragment>
    <Fragment>
      {loading ? <Loader /> : (

        
    <Container component="main" maxWidth="xs"
    className="shadow-lg"
    style={{paddingBottom: "30px", borderRadius: "20px"}}
    
    >
          <MetaData title={'Login'} />
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              LOGIN
            </Typography>
            <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1 }} >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{marginBottom:'30px'}}
                sx={{ mt: 3, mb: 2 }}
                >
                LOGIN
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/password/forgot" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>

        </Container>
      )}

    </Fragment>
  )
}

export default Login
