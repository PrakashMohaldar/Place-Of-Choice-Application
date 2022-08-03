import React,{useState,useCallback} from 'react';
import {BrowserRouter as Router,Route,Redirect,Switch} from 'react-router-dom'
import Users from './user/pages/Users';
import NewPlaces from './places/pages/NewPlace'
import MainNavigation from './shared/components/Navigation/MainNavigation'
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context';


function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);

/*context variables*/
  const [userId, setUserId] = useState(false)

  const login = useCallback((uid)=>{
    setisLoggedIn(true)
    setUserId(uid)
  },[]);
  const logout = useCallback(()=>{
    setisLoggedIn(false);
    setUserId(null)
  },[])


  let routes;
  if(isLoggedIn){
    routes = (
      <Switch>

        <Route path="/" exact={true}>
            <Users/>
        </Route>

        <Route path="/:userId/places" exact>
            <UserPlaces/>
        </Route>

        <Route path="/places/new" exact>
            <NewPlaces/>
        </Route>


        <Route path="/places/:placeId">
            <UpdatePlace/>
        </Route>

      <Redirect to="/" />
      
    </Switch>    
    );
  }else{
    routes = (
      <Switch>
        <Route path="/" exact>
            <Users/>
        </Route>

        <Route path="/:userId/places" exact>
            <UserPlaces/>
        </Route>

        <Route path="/auth">
            <Auth/>
        </Route>

        <Redirect to="/auth" />
        
      </Switch>    
    )
  }

  return(
    <AuthContext.Provider value={ {isLoggedIn:isLoggedIn,userId:userId, login:login, logout:logout}}>

      <Router>
      <MainNavigation/>
      <main>
        {routes}
      </main>

      </Router>
    </AuthContext.Provider>

  ) 
}

export default App;
