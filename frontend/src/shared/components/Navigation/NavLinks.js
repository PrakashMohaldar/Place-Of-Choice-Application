import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import { useHistory } from "react-router-dom";
import './NavLinks.css'

const NavLinks = props =>{
  const auth =  useContext(AuthContext);
  const history = useHistory();
    return(
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact>ALL USERS</NavLink>
            </li>

            {auth.isLoggedIn && 
             <li>
             <NavLink to={`/${auth.userId}/places`}>My PLACES</NavLink>
             </li>
            }

            {auth.isLoggedIn && 
             <li>
                <NavLink to="/places/new">ADD PLACE</NavLink>
             </li>
            }

            {!auth.isLoggedIn && 
             <li>
                <NavLink to="/auth">AUTHENTICATE</NavLink>
             </li>
            }
            {auth.isLoggedIn && 
              <li>
                <button onClick = {()=>{ auth.logout()
                history.push('/auth')}}>LOGOUT</button>
              </li>
            }

        </ul>
    ) 
};
export default NavLinks