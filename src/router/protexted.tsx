import React , {useEffect} from 'react';
import {  Navigate , useLocation , useNavigate  } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../utils/constants';

interface ProtectedRouteProps {
    children ?: any;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const auth = Cookies.get(ACCESS_TOKEN_KEY);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (auth) {
          console.log(location)
          if(location.pathname == "/"){
            console.log("goback")
            navigate(-1);
        }
        }
      }, [location , auth, navigate]);
      
    if (auth) {

        if(location.pathname == "/auth/sign-in"){
            navigate(-1);
            return
        }
        return children;
    }

    return <Navigate to="/auth/sign-in" replace />;
};

export default ProtectedRoute