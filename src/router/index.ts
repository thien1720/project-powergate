
import EmployeeUpdate from "../views/EmployeeUpdate"
import EmployeeCreate from "../views/EmployeeCreate"

import Login from "../views/Login"
import Employee from "../views/Employee"
import ForgotPass from "../views/ForgotPass"        
const RouterPage = [
    {
        path: "/",
        component : Login,
        layout: null
    },
    {
        path: "/forgot",
        component : ForgotPass,
        layout: null
    },
    {
        path : "/employee", 
        component : Employee
    }, 
    {
        path : "/employee/create-or-update",
        component: EmployeeCreate
    },
    {
        path : "/employee/create-or-update/:id",
        component: EmployeeUpdate
    },

]

export default RouterPage