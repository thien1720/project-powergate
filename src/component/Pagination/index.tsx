import { useState, useEffect, Key , useCallback } from "react"
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import { BsChevronDoubleLeft, BsChevronDoubleRight, BsChevronLeft, BsChevronRight, BsThunderboltFill } from "react-icons/bs";
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch, useSelector } from 'react-redux';

import { API_PATHS } from '../../config/api';
import { addEmployeeDocment } from "../../service/redux/employee.document"
import { AppState } from '../../service/reducer';
import { fetchThunk } from '../../common/thunk';
import classNames from "classnames/bind"
import styles from "./style.module.scss";
const cx = classNames.bind(styles);

export type PaginationItemType =
    | 'start-ellipsis'
    | 'end-ellipsis'
    | 'page'
    | 'next'
    | 'previous';

function PaginationPage({ pagiNation , setPage , setLoading , setPageItem}: {pagiNation : any, setPage: any, setLoading: any , setPageItem: any} ) {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const userJSON : string  = localStorage.getItem('auth') || "";
    const idUser = JSON.parse(userJSON);
    const { total, to, last_page, from, next_page_url, last_page_url,current_page ,path } = pagiNation
    const getItemAriaLabel = useCallback(async (e : any, page : number |string) =>{
        setLoading(true)
        setPageItem(page)
        const employee = await dispatch(fetchThunk(`${API_PATHS.employeeDocument}/get-available-for-assign/${idUser.id}?page=${page}`))
        dispatch(addEmployeeDocment(employee.data.data))
        setPage(employee.data)
        setLoading(false)
    }, [current_page]);
    

    return (<div className={cx("pagination-page")}>
        <Stack spacing={2}>
            <Pagination
                count={last_page}
                onChange={(e , page) => getItemAriaLabel(e, page)}

                renderItem={(item) => (
                    <PaginationItem
                        components={{
                            first: (props) => <p {...props}><BsChevronDoubleLeft /></p>,
                            previous: (props) => <p {...props}><BsChevronLeft /></p>,
                            next: (props) => <p {...props}><BsChevronRight /></p>,
                            last: (props) => <p {...props}><BsChevronDoubleRight /></p>
                        }}
                        {...item}

                    />
                )}

                showFirstButton
                showLastButton
                size="large"
            />

        </Stack>

        <div className={cx("show-item-total")}>
            <p>
                <span>{from ? from : 0}</span>-
                <span>{to ? to : 0}</span>of
                <span>{total ? total : 0}</span>
            </p>
        </div>
    </div>)
}

export default PaginationPage;