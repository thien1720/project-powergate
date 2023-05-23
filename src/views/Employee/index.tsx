import { useState, useEffect, Key, useCallback } from "react"
import { NavLink, Link, useNavigate, useSearchParams } from "react-router-dom";
import { debounce } from 'lodash';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch, useSelector } from 'react-redux';
import { BsSearch } from "react-icons/bs";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

import { Rowid } from "../../component/EmployBtn";
import EmployBtn from "../../component/EmployBtn"
import TableData from "../../component/TableList";
import { addEmployeeDocment } from "../../service/redux/employee.document"
import { EmployE } from "../../module/employee";
import { AppState } from '../../service/reducer';
import { API_PATHS } from '../../config/api';
import { fetchThunk } from '../../common/thunk';

import classNames from "classnames/bind"
import styles from "./style.module.scss";
import PaginationPage from "../../component/Pagination";
const cx = classNames.bind(styles);

interface userD {
    id: number,
    username: string,
    email: string,
}

function Employee() {
    
    const [query, setQuery] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
  
             
    const [selectedRows, setSelectedRows] = useState<EmployE[]>([]);
    const [page, setPage] = useState({})
    const userJSON: string = localStorage.getItem('auth') || "";
    const idUser = JSON.parse(userJSON);

    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const handleSearch = debounce(async () => {
        if (query) {
            // Thực hiện tìm kiếm khi người dùng nhập vào input
            const employee = await dispatch(fetchThunk(`${API_PATHS.employeeDocument}?search=${query}`, "get"));
            dispatch(addEmployeeDocment(employee.data.data))
            // console.log(employee)
        } else {
            getEmployee()
        }

    }, 500);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let search;
        if (event.target.value) {
            search = {
              search: event.target.value
            }
          } else {
            search = undefined;
          }
        setQuery(event.target.value);
        setSearchParams(search, { replace: true });

        handleSearch(); // Gọi hàm debounce
    };

    const getEmployee = async () => {
        const employee = await dispatch(fetchThunk(`${API_PATHS.employeeDocument}/get-available-for-assign/${idUser.id}`, "get"));
        dispatch(addEmployeeDocment(employee.data.data))
        setPage(employee.data)
    }

    useEffect(() => {
        getEmployee()
    }, [query])
    return <div className={cx("employee-page")}>
        <div className={cx("map-page")}>
            <Link to="/">General</Link>
            <span>&gt;</span>
            <NavLink
                to="/employee"
                className={(nav) => cx("next-page", { active: nav.isActive })}
            >Employees Management</NavLink>
        </div>
        <div className={cx("head-employ-search")}>
            <h1>Employee Management</h1>
            <div className={cx("search-employ")}>
                <div className={cx("icon-search")}><BsSearch /></div>
                <input type="text" placeholder="Search......." value={query} onChange={handleChange} />
            </div>
        </div>
        <div className={cx("show-list")}>
            <EmployBtn deleteEm={selectedRowKeys} />

            <SimpleBar style={{ maxHeight: 500 }}>

                <div className={cx("show-list-employee")}>
                    <TableData
                        selectedRowKeys={selectedRowKeys}
                        setSelectedRowKeys={setSelectedRowKeys}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                    />
                </div>
            </SimpleBar>
            <PaginationPage pagiNation={page} setPage={setPage} />
        </div>
    </div>
}

export default Employee;