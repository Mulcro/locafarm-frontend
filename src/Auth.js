import { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import UserContext from './Context/userContext';   
import {toast} from 'react-toastify';

const Auth = () => {
    const [user] = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
        if(!user){
            toast("Please login!");
            navigate('/login');
        }
    },[])

    return(
        <Outlet/>
    )
}

export default Auth;