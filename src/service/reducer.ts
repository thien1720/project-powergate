import { combineReducers } from '@reduxjs/toolkit'

import authReducer , {AuthState} from "./redux/auth.login"
import employeeReducer , {employeeDocument} from "./redux/employee.document"
// import {EmployE} from "../module/employee"

export interface AppState {
    employeeReducer: employeeDocument;
    authReducer: AuthState

}
const rootReducer = combineReducers({
    // your reducers here 
    employeeReducer,
    authReducer
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer

