import './App.css';
import {BrowserRouter as Router,  Route } from 'react-router-dom'
import Home from './components/Home';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import EventDetails from './components/event/EventDetails';
import Login from './components/user/Login';
import Register from './components/user/Register';
import { useEffect } from 'react';
import store from './store'
import { loadUser } from './actions/AuthAction';
import Profile from './components/user/Profile';
import ProtectedRoute from './components/routes/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';
import Registration from './components/registration/Registration';
import ConfirmRegisteration from './components/registration/ConfirmRegisteration';
import RegisterSuccess from './components/registration/RegisterSuccess';
import ListRegistration from './components/register/ListRegistration';
import RegisterDetails from './components/register/RegisterDetails';
import Dashboard from './components/admin/Dashboard';
import EventList from './components/admin/EventList';
import NewEvent from './components/admin/NewEvent';
import UpdateEvent from './components/admin/UpdateEvent';
import RegisterList from './components/admin/RegisterList';
import ProcessRegister from './components/admin/ProcessRegister';
import UserList from './components/admin/UserList';
import UpdateUser from './components/admin/UpdateUser';
import Header2 from './components/layout/Header2';
function App() {

  useEffect(()=>{
    store.dispatch(loadUser())
  })



  return (
    <Router>

    <div className="App">
      {/* <Header/> */}
      <Header2 />
      <div className="container container-fluid">

      <Route path="/" component={Home} exact />
      <Route path='/search/:keyword' component={Home} />
      <Route path='/login' component={Login} exact />
      <Route path='/register' component={Register} exact />
      <Route path='/password/forgot' component={ForgotPassword} exact />
      <Route path='/password/reset/:token' component={NewPassword} exact />
      <ProtectedRoute path='/me' component={Profile} exact />
      <Route path="/event/:id" component={EventDetails} exact />
      <ProtectedRoute path='/me/update' component={UpdateProfile} exact />
      <ProtectedRoute path='/password/update' component={UpdatePassword} exact />

      <ProtectedRoute path='/registers/me' component={ListRegistration} exact />
      <ProtectedRoute path='/registerinfo' component={Registration} exact />
      <ProtectedRoute path='/event/confirm/confirm' component={ConfirmRegisteration} exact />
      <ProtectedRoute path='/success' component={RegisterSuccess} exact />

      <ProtectedRoute path='/register/:id' component={RegisterDetails} exact />
      </div>
      <ProtectedRoute path='/dashboard' isAdmin={true} component={Dashboard} exact />
      <ProtectedRoute path='/admin/events' isAdmin={true} component={EventList} exact />
      <ProtectedRoute path='/admin/event' isAdmin={true} component={NewEvent} exact />
      <ProtectedRoute path='/admin/event/:id' isAdmin={true} component={UpdateEvent} exact />
      <ProtectedRoute path='/admin/registers' isAdmin={true} component={RegisterList} exact />
      <ProtectedRoute path='/admin/register/:id' isAdmin={true} component={ProcessRegister} exact />
      <ProtectedRoute path='/admin/users' isAdmin={true} component={UserList} exact />
      <ProtectedRoute path='/admin/user/:id' isAdmin={true} component={UpdateUser} exact />


      <Footer/>
    </div>
    </Router>
  );
}

export default App;
