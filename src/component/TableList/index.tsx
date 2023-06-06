import { useState, useEffect, Key } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Table, } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { addEmployeeDocment } from "../../service/redux/employee.document"
import { EmployE } from "../../module/employee";
import { AppState } from '../../service/reducer';
import { PropTable } from "../../module/employee";

import classNames from "classnames/bind"
import styles from "./style.module.scss";
const cx = classNames.bind(styles);

const columns: ColumnsType<EmployE> = [
    {
        title: 'NIK',
        dataIndex: 'staff_id',
        className :cx("staff-id")
    },
    {
        title: 'Name',
        dataIndex: 'name',
        className : cx("name")
    },
    {
        title: 'Gender',
        dataIndex: 'age',
        render: (_, record, index) => (<>
            {record.gender == 0 && "Male"}
            {record.gender == 1 && "Female"}
        </>),
    },
    {
        title: 'Bank Card No.',
        dataIndex: 'bank_name',
        className: cx("bank-card"),

    },
    {
        title: 'Bank Account No.',
        dataIndex: 'bank_account_no',
        className : cx("bank-account")
    },
    {
        title: 'Family Card No.',
        dataIndex: 'family_card_number',
        className : cx('family-card')
    },
    {
        title: 'Marriage Status',
        dataIndex: 'marriage_id',
        className : cx("marriage")
    },
    {
        title: 'Mother Name',
        dataIndex: 'mother_name',
        className : cx('mother-name')
    },
    {
        title: 'Place of birth',
        dataIndex: 'pob',
        className :cx("date")

    },
    {
        title: 'Home Address_1',
        dataIndex: 'home_address_1',
        className : cx("home")
            
    },
    {
        title: 'Home Address_2',
        dataIndex: 'home_address_2',
        className : cx("home")
        
    },
    {
        title: 'Date of birth',
        dataIndex: 'dob',
        className :cx("date")

    },
    {
        title: 'National Card ID No.',
        dataIndex: 'nc_id',
        className : cx("national-card")
    },
    {
        title: 'Date Start',
        dataIndex: 'contract_start_date',
        className :cx("date")
    },
    {
        title: 'First Contract',
        dataIndex: '',
        className : cx("contract")
    },
    {
        title: 'Second Contract',
        dataIndex: '',
        className : cx("contract")
    },
    {
        title: 'End Contract',
        dataIndex: '',
        className : cx("contract")
    },
    {
        title: 'Department',
        dataIndex: 'department_id',
        className : cx("footer-table")

    },
    {
        title: 'Employee Type',
        dataIndex: '',
        className : cx("employee-type")
    },
    {
        title: 'Salary Rp.',
        dataIndex: '',
        className : cx("footer-table")

    },
    {
        title: 'Position',
        dataIndex: 'position_id',
        className : cx("footer-table")

    },
    {
        title: 'O/T Paid',
        dataIndex: 'home_address_1',
        className : cx("footer-table")

    },
    {
        title: 'Meal paid',
        dataIndex: 'meal_allowance_paid',
        className : cx("footer-table")

    },
    {
        title: 'Meal Rp.',
        dataIndex: 'meal_allowance',
        className : cx("footer-table")

    },
    {
        title: 'Grading',
        dataIndex: 'grade_id',
        className : cx("footer-table")

    }


];


function TableData(props: PropTable) {
    const { selectedRowKeys, setSelectedRowKeys, selectedRows, setSelectedRows , loading } = props;
    let navigate = useNavigate()
    const employData = useSelector((state: AppState) => { return state.employeeReducer.data })

    const handleRowClick = (record: EmployE) => {
        // Kiểm tra và thay đổi trạng thái của input
        // Chỉ định hàng đã được chọn
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
            loading = {loading}
            className={cx("table-data")}
        />
    </div>);
}

export default TableData;