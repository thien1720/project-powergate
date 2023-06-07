import { useState, useEffect, Key , useRef} from "react"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Table, } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

import { addEmployeeDocment } from "../../service/redux/employee.document"
import { EmployE } from "../../module/employee";
import { AppState } from '../../service/reducer';
import { PropTable } from "../../module/employee";

import classNames from "classnames/bind"
import styles from "./style.module.scss";
import "./style.scss"
const cx = classNames.bind(styles);

const columns: ColumnsType<EmployE> = [
    {
        title: 'NIK',
        dataIndex: 'staff_id',
        width: 100,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        width: 100,

    },
    {
        title: 'Gender',
        dataIndex: 'age',
        render: (_, record, index) => (<>
            {record.gender == 0 && "Male"}
            {record.gender == 1 && "Female"}
        </>),
        width: 80,

    },
    {
        title: 'Bank Card No.',
        dataIndex: 'bank_name',
        width: 150,

    },
    {
        title: 'Bank Account No.',
        dataIndex: 'bank_account_no',
        width: 150,

    },
    {
        title: 'Family Card No.',
        dataIndex: 'family_card_number',
        width: 150,

    },
    {
        title: 'Marriage Status',
        dataIndex: 'marriage_id',
        width: 150,

    },
    {
        title: 'Mother Name',
        dataIndex: 'mother_name',
        width: 150,
    },
    {
        title: 'Place of birth',
        dataIndex: 'pob',
        width: 150,

    },
    {
        title: 'Home Address_1',
        dataIndex: 'home_address_1',
        width: 150,

    },
    {
        title: 'Home Address_2',
        dataIndex: 'home_address_2',
        width: 150,

    },
    {
        title: 'Date of birth',
        dataIndex: 'dob',
        width: 150,

    },
    {
        title: 'National Card ID No.',
        dataIndex: 'nc_id',
        width: 150,

    },
    {
        title: 'Date Start',
        dataIndex: 'contract_start_date',
        width: 150,
    },
    {
        title: 'First Contract',
        // dataIndex: '',
        width: 150,

    },
    {
        title: 'Second Contract',
        // dataIndex: '',
        width: 150,
    },
    {
        title: 'End Contract',
        // dataIndex: '',
        width: 150,
    },
    {
        title: 'Department',
        dataIndex: 'department_id',
        width: 150,

    },
    {
        title: 'Employee Type',
        // dataIndex: '',
        width: 150,
    },
    {
        title: 'Salary Rp.',
        // dataIndex: '',
        width: 150,

    },
    {
        title: 'Position',
        dataIndex: 'position_id',
        width: 150,


    },
    {
        title: 'O/T Paid',
        dataIndex: 'home_address_1',
        width: 150,

    },
    {
        title: 'Meal paid',
        dataIndex: 'meal_allowance_paid',
        width: 150,


    },
    {
        title: 'Meal Rp.',
        dataIndex: 'meal_allowance',
        width: 150,
        

    },
    {
        title: 'Grading',
        dataIndex: 'grade_id',
        width: 150,

    }


];


function TableData(props: PropTable) {
    const { selectedRowKeys, setSelectedRowKeys, selectedRows, setSelectedRows, loading } = props;
    let navigate = useNavigate()
    const employData = useSelector((state: AppState) => { return state.employeeReducer.data })

    const handleRowClick = (record: EmployE) => {
        setSelectedRowKeys([...selectedRowKeys, record.id]);
        setSelectedRows([...selectedRows, record]);
    };
    const handleRowDoubleClick = (record: EmployE) => {
        // Thực hiện chuyển hướng sang component khác
        navigate(`/employee/create-or-update/${record.id}`);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: (id: any, rows: any) => {
            setSelectedRowKeys(id);
            setSelectedRows(rows);
        },
    };
    const tableRef = useRef<any>();


  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.recalculate();
    }
  }, [employData]);
    return (<div className={cx("box-table")}>
            <Table
                // ref={tableRef}
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
                loading={loading}
                className={cx("table-data")}
                scroll={{ x: 1000, y: 500 }}
            />

    </div>);
}

export default TableData;