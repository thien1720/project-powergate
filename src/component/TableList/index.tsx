import { useState, useEffect, Key } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Divider, Radio, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { addEmployeeDocment } from "../../service/redux/employee.document"
import { EmployE } from "../../module/employee";
import { AppState } from '../../service/reducer';
import { API_PATHS } from '../../config/api';
import { fetchThunk } from '../../common/thunk';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Rowid } from "../EmployBtn"

import classNames from "classnames/bind"
import styles from "./style.module.scss";
const cx = classNames.bind(styles);

// interface DataType {
//     id: number;
//     NIK: string;
//     Name: string;
//     Gender: number;
//     Bank Card No : 
// }


const columns: ColumnsType<EmployE> = [
    {
        title: 'NIK',
        dataIndex: 'staff_id',
        width: 500,
        // render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        width: 500,

    },
    {
        title: 'Gender',
        dataIndex: 'age',
        // render: (text: string) => <a>{text}</a>,
        width: 500,

    },
    {
        title: 'Bank Card No.',
        dataIndex: 'bank_name',
        // render: (text: string) => <a>{text}</a>,
        width: 500,

    },
    {
        title: 'Bank Account No.',
        dataIndex: 'bank_account_no',
        // render: (text: string) => <a>{text}</a>,
        width: 500,

    },
    {
        title: 'Name',
        dataIndex: 'family_card_number',
        width: 500,

    },
    {
        title: 'Marriage Status',
        dataIndex: 'marriage_id',
        width: 500,

    },
    {
        title: 'Mother Name',
        dataIndex: 'mother_name',
        width: 500,

    },
    {
        title: 'Home Address_1',
        dataIndex: 'home_address_1',
        width: 500,

    },
    {
        title: 'Home Address_2',
        dataIndex: 'home_address_2',
        width: 500,

    },
    {
        title: 'Place of birth',
        dataIndex: 'pob',
        width: 500,

    },
    {
        title: 'Date of birth',
        dataIndex: 'dob',
        width: 500,

    },
    {
        title: 'National Card ID No.',
        dataIndex: 'nc_id',
        width: 500,

    },
    {
        title: 'Date Start',
        dataIndex: 'contract_start_date',
        width: 500,

    },
    {
        title: 'First Contract',
        dataIndex: '',
        width: 500,

    },
    {
        title: 'Second Contract',
        dataIndex: '',
        width: 500,

    },
    {
        title: 'End Contract',
        dataIndex: '',
        width: 500,

    },
    {
        title: 'Department',
        dataIndex: 'department_id',
        width: 500,

    },
    {
        title: 'Employee Type',
        dataIndex: '',
        width: 500,

    },
    {
        title: 'Salary Rp.',
        dataIndex: '',
        width: 500,

    },
    {
        title: 'Position',
        dataIndex: 'position_id',
        width: 500,

    },
    {
        title: 'O/T Paid',
        dataIndex: 'home_address_1',
        width: 500,

    },
    {
        title: 'Meal paid',
        dataIndex: 'meal_allowance_paid',
        width: 500,

    },
    {
        title: 'Meal Rp.',
        dataIndex: 'meal_allowance',
        width: 500,

    },
    {
        title: 'Grading',
        dataIndex: 'grade_id',
        width: 500,

    }


];


export interface PropTable {
    selectedRowKeys: number[],
    setSelectedRowKeys: any,
    selectedRows: EmployE[],
    setSelectedRows: any,
}

function TableData(props: PropTable) {
    const { selectedRowKeys, setSelectedRowKeys,selectedRows ,setSelectedRows} = props;
    let navigate = useNavigate()
    const employData = useSelector((state: AppState) => { return state.employeeReducer.data })

    const handleRowClick = (record: EmployE) => {
        // Kiểm tra và thay đổi trạng thái của input
        // ...
        // Chỉ định hàng đã được chọn
        setSelectedRowKeys([...selectedRowKeys,record.id]);
        setSelectedRows([ ...selectedRows, record]);
      };
    const handleRowDoubleClick = (record : EmployE) => {
        // Thực hiện chuyển hướng sang component khác
        navigate(`/employee/create-or-update/${record.id}`);
      };
      const rowSelection = {
        selectedRowKeys,
        onChange: (id : any, rows : any) => {
          setSelectedRowKeys(id);
          setSelectedRows(rows);
        },
      };

    return (<div className={cx("box-table")}>
        <Table
            rowKey="id"
            rowSelection={
                rowSelection
            }
            onRow={(record) => ({
                onClick: () => handleRowClick(record),
                onDoubleClick: () => handleRowDoubleClick(record),
              })}
            dataSource={employData}
            columns={columns}
            pagination={false}
            className={cx("table-data")}
        />
    </div>);
}

export default TableData;