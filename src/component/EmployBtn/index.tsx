import { useState , memo} from "react";
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { Button, Space, Modal } from 'antd';

import { addEmployeeDocment } from "../../service/redux/employee.document"
import { AppState } from '../../service/reducer';
import { API_PATHS } from '../../config/api';
import { fetchThunk } from '../../common/thunk';

import { Link } from "react-router-dom";
import classNames from "classnames/bind"
import styles from "./style.module.scss";
const cx = classNames.bind(styles);
export interface Rowid {
    record_ids: number
}
export interface AddOrDelete {
    deleteEm: number[], 
    setSelectedRowKeys: any
}

function EmployBtn({ deleteEm , setSelectedRowKeys}: AddOrDelete) {
    const newDelete = { record_ids: deleteEm }
    const checkRowDelete = deleteEm.length > 0 ? false : true
    const [isModalOpen, setIsModalOpen] = useState(false);
    const userJSON : string  = localStorage.getItem('auth') || "";
    const idUser = JSON.parse(userJSON);
    
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        setIsModalOpen(false);
        const deleteE = await dispatch(fetchThunk(`${API_PATHS.employeeDocument}/multiple-delete?record_ids`, "delete", newDelete));
        if (deleteE.result) {
            const employee = await dispatch(fetchThunk(`${API_PATHS.employeeDocument}/get-available-for-assign/${idUser.id}`, "get"));
            dispatch(addEmployeeDocment(employee.data.data))
            // setPage(employee.data)
            setSelectedRowKeys([])
        }
        console.log(deleteE)
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (<div className={cx("btn-add-remove")}>

        <Modal
            title="Delete"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width={400}
            footer={[
                <Button size="large" className={cx("custom-btn")} key="back" onClick={handleCancel} >
                    NO
                </Button>,
                <Button size="large" className={cx("custom-btn")} key="submit" type="primary" onClick={handleOk} >
                    YES
                </Button>
            ]}
        >
            <p>Are you sure you want to delete?</p>

        </Modal>
        <div className={cx("btn-add-employ")}>

            <button className={cx("btn", "btn-add")}>
                <img src="/image/add-btn.svg" alt="add-btn" />
                <Link to="/employee/create-or-update">Add</Link>
            </button>
        </div>
        <div className={cx("btn-add-employ")}>
            <button
                disabled={checkRowDelete}
                className={cx("btn" , checkRowDelete ? "btn-delete" : "")}
                onClick={showModal}
            >
                <img src="/image/delete-btn.svg" alt="delete-btn" />
                Delete
            </button>
        </div>
    </div>);
}

export default memo(EmployBtn);