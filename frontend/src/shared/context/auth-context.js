import { createContext } from "react";
/*context variables are passed from app.js*/ 
export const AuthContext = createContext({
    isLoggedIn:false,
    userId:null,
    login:()=>{},
    logout:()=>{}
});