import React from 'react'
import { Fragment } from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Search from './Search'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import {logout} from '../../actions/AuthAction'
const Header = () => {

  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading } = useSelector(state => state.auth)

  const logoutHandler=()=>{
    dispatch(logout());
    alert.success('Logged out successfully')
  }
  return (
    <Fragment>
      <nav className="navbar row navbar-expand-lg navbar-light">
        <div className="col-12 col-md-3 col-sm-3">
          <div className="navbar-brand">
            <Link to="/">
              <img width='40%' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAB3CAMAAAAO5y+4AAAAllBMVEX///+FFg+EFg+EFQ6DEQqIHRbfxMPTr6vdvLvu4N64e3b8+/rNoZ6hTEe+hIG7fnyrXFujUk2wbGX17uzFko+TMSvhy8jRpqXPpJ+sYFmMJR6eR0L38vCwaGSSMSrn1tTs4ty2dG/w5+ilV1GjT06+hYfWtbDawb3r2tmbRUOVMCqjT0bYsLKfQj2vYF/9+f3GkJKlVFXgRJr2AAAEsklEQVRoge2b65qiOBCGIYWcEUXAFgUX7FXbGadn7v/mJuEQDgokSOvu03x/RFLJS4BUKgeEncarf1ZCXSvuIrSdoKAZr+YNrsNdAlIFRUIin5Dd4IYi8BUAEuHyZRJFiM+almRII8HHCxG4ykBoGDfwIk83Uu7O8TwvgMFcxJERiMKcuwSSmZWLmlycE3FIhF8FlycbFrnCan0PJp9O+fNVOfMt6/UVm23ji2Tor+EKL+K+qr4TNz+9ZNK+UtTpnSnLv531tdLTPU4DgVzh4gJYHMaim5u6lF4dkyTrhFeJZkosOaCPS073eluQIMzsJexgu80BkW6yt76pm5d6lXPfJRZbxMQFy2XQMbVfs5hu2eoL+sBG0iZn4k7cCtfoEC2UwYiT69u6rbfILeJYbd5mouv23hjCNaV2r+cVPYMftBshZVB934jjvT+YQMHGUXFlFGcxu+sbU+cJx2FcnBn71rYOxhVItHQ//oU0IJcG1hdT7ZPcopOGTc5tqbKsP8JF6/LF5ZQ5nCth7lDsxP2fc43azxdx4+2NfqYJym2CPSJ3iZtywzVYc03Y6x+3Ue9mTC4SvYtXURR5P/aCfL3gg8rZSySNy4WIzYEYwbhc0WPCCsLEnbgT98lc7AWfx0U5l4yM4alcnKIKezxADZ7IRbMYE7X0j0efL+54pJG4OPim3Mr8Bpqp1Ljk7n2lwoWH6ovgZz5OkRzfP9/j0vssCBrlqtvgofpet/lksQN0RaLGNeZxfCz+nCl3l/zKuYYlRqxcKLiSnxi3XCXW6aSbIVTipCQMaVAVz7LDz+OClXvR8+qYM604Z5YlEk5/Ty6vz0XWwycbdynnxe7N5vLWEO1YC0kGD2zua+TiWHVW+22IDDUZgWaGxcSry9qOPPUzuzVqWLkCo3pU/kk0jT6/xLLMIiWcZeNQw9wyt9/DW37NQN9n1zJp+oqshRbXsNhuaUrpNxL5kLcjwQJmLm2/oJzyGjtAvZLhbi2fGpd+Ej9JGMtPQtkv2MUdbPPPa3cOtfH+cC5U+gWrmL9t41pk7W8krki5SEL57S+5vhOGT+1/0XsYhnsS5wBIT4w3yNxWFl+hZ8ZXGAbwTePYifvdueibcV/2fFHQ0GXrG/I1ap5G4ohcY4nq6wwIId3fCSs/biws4N5szPrOFzfKejPlcJPgjsgdoIk7cVu48DruoW2p09bJEObYumCqLx/htm9/A/Qbm+g30/90gfCR9UEQ28oNbJcMN2RXn7VcGIEPfa/aFZXrvx1Ww7iJ7LerGNTtOmzkZBB3NE3c/xQXjc0N2bhSnKz6lb3QOwbLhJEL3uY2vKhrs9n8Tu3n+KjHerPw2Lhiz065bO9EFkb9If6sf3MdW3375V2v2RRrfL16LNg+7jsDFA+blSR/vvjpvXVspynFsI+RQWpluvLItH1S3HRyTZtJ5xIr7NmyrDu5X62JO3GfwUXRD4tL86wFGzZfNiuqc0noyCFR3OTfaxz48iGxUV+OL1vIXj+gXIQ4vgJC6T7B+vcp7NzgiruF/D7r14+PgIMr1rk8wvGIUVtPinkLGPj9UTMOGsjlVtzgOvxFqHhUwKvTucHt2EXZptVfp5zEWW3OXYUAAAAASUVORK5CYII=" />
            </Link>
          </div>
        </div>        
        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Route render={({ history }) => <Search history={history} />} />
        </div>
        

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">

          {user ? (
            <div className='ml-1 dropdown d-inline'>

              <Link to='#' className='btn dropdown-toggle text-white mr-4' type='button' id='dropDownMenuButton' data-toggle="dropdown"
                aria-haspopup='true' area-aria-expanded='false'>
                <figure className='avatar avtar-nav'>
                  <img
                    src={user.avatar && user.avatar.url} alt='User'
                    className='rounded-circle'
                  />
                </figure>
                <span>{user && user.name}</span>
              </Link>

              <div
                className='dropdown-menu'
                aria-labelledby='dropDownMenuButton'
              >
                {user && user.role === 'admin' &&
                  (<Link className='dropdown-item'
                    to='/dashboard'>
                    Dashboard

                  </Link>)}
                <Link className='dropdown-item'
                  to='/registers/me'
                >My Events

                </Link>
                <Link className='dropdown-item'
                  to='/me'
                >Profile

                </Link>

                <Link className='dropdown-item text-danger' to='/' onClick={logoutHandler} >
                  Logout
                </Link>
              </div>


            </div>
          ) : !loading &&
          <Link to='/login' className="btn ml-4" id="login_btn">Login</Link >
          }


        </div>
      </nav>

    </Fragment>
  )
}

export default Header
