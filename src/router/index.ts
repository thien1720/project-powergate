
import EmployeeUpdate from "../views/EmployeeUpdate"
import EmployeeCreate from "../views/EmployeeCreate"

import Login from "../views/Login"
import Employee from "../views/Employee"
import ForgotPass from "../views/ForgotPass"        
import NotFound from "../views/NotFound"

const RouterPage = [
    // {
    //     path: "/",
    //     component : Login,
    //     layout: null, 
    
    // },
    {
        path: "/auth/sign-in",
        component : Login,
        layout: null, 
        // protext : true
        
    },
    {
        path: "/forgot",
        component : ForgotPass,
        layout: null
    },
    {
        path : "/employee", 
        component : Employee,
        protext : true

    }, 
    {
        path : "/employee/create-or-update",
        component: EmployeeCreate,
        protext : true

    },
    {
        path : "/employee/create-or-update/:id",
        component: EmployeeUpdate,
        protext : true
    },

    {   
        path: "*",
        component: NotFound ,
        layout: null,
        protext : true

    }

]

export default RouterPage