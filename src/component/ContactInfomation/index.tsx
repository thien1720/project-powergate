import { useCallback, useState } from "react";
import { NavLink, Link, useParams, useNavigate } from "react-router-dom";
import { Button,Space, Select, Form, Input, DatePicker, Upload, Table } from 'antd';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { AiOutlineDelete } from "react-icons/ai";

import { RcFile, UploadChangeParam } from 'antd/lib/upload';
import { UploadOutlined } from '@ant-design/icons';
// import moment, { Moment } from 'moment';
import renderCustomLabel from "../../common/customLabel"
import convert from "../../common/convertDate"
import classNames from "classnames/bind"
import styles from "./style.module.scss";
const cx = classNames.bind(styles);
export interface FormUpload {
    contract_dates: any,
    names: string,
    fileList: UploadFile[], 
}

function ContactInfomation({ fileListContact, setFileListContact }: any) {
    let { id } = useParams()
    const isEmployE = id ? true : false
    const initialFormUpload = {
        contract_dates: "",
        names: "",
        fileList: [], 
      };
    const [formUpload, setFormUpload] = useState<FormUpload>(initialFormUpload)
    const newLists = fileListContact.map((item: any, index: number) => {        
            return { ...item, index: index }
    })
    const columns = [
        {
            title: 'No',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Contract Name',
            dataIndex: 'names',
            key: 'names',
        },
        {
            title: 'Sign Date',
            dataIndex: 'contract_dates',
            key: 'contract_dates',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'fileList',
            render: (_ : any, record : any, index : number) => (<>

                <Space size="middle">

                    <AiOutlineDelete onClick={() => handeleDeleteFile(index)} className={cx("delete-file")} />
                </Space>

            </>
            ),
        },
    ];

    const handleBeforeUpload = (file: RcFile, fileList: RcFile[]) => {
        // Trả về false để ngăn chặn chức năng submit mặc định
        return false;
    };
    const handeleDeleteFile = (indexs: number) => {
        console.log(indexs)
        const fileList = fileListContact.filter((item :RcFile, index : number) => index !== indexs);
        setFileListContact(fileList);
        // const findId = fileLists.find((item :RcFile, index : number) => index == indexs);

        // setDeleteId([...deleteId, findId.id])

    }

    const handeleChangeFile = ({ fileList }: { fileList: any }) => {
        setFormUpload({ ...formUpload, fileList: [...fileList] });
    };
    console.log(fileListContact)
    const handleAddContact = useCallback(() => {
        // const formatDate = convert(date)    
        // Xử lý tìm kiếm
        formUpload.contract_dates = convert(formUpload.contract_dates)
        setFileListContact([...fileListContact, formUpload])
        setFormUpload(initialFormUpload);

    }, [formUpload]);


    return (<div className={cx("contact-infomation")}>
        <div className={cx("head-infomation")}>
            <h1>Contac Information</h1>
            <p>Required(<span>
                *
            </span>)</p>
        </div>

        <div className={cx("box-confirm")}>
            <div className={cx("form-1")}>

                <Form.Item
                    name="contract_start_date"
                    className={cx("label-custom")}
                    label={renderCustomLabel("Date Start")}
                    rules={[{
                        required: true,
                        message: 'Please select date time'
                    }
                    ]}
                >
                    <DatePicker
                        format="YYYY-MM-DD"
                        className={cx("style-datepick")}

                        size="large"
                    />
                </Form.Item>

                <Form.Item
                    name="type"
                    className={cx("label-custom")}
                    label={renderCustomLabel("Employee Type")}
                    rules={[{
                        required: true,
                        message: 'Please select an option'
                    }]}
                >
                    <Select
                        disabled={isEmployE}
                        size="large"
                        placeholder="Employee Type"
                    >
                        <Select.Option value={0}>Permanent</Select.Option>
                        <Select.Option value={1}>Part-time</Select.Option>
                        <Select.Option value={2}>Contract</Select.Option>

                    </Select>
                </Form.Item>

            </div>

            <div className={cx("box-contact")}>
                <div className={cx("title")}>
                    <p>CONTRACT:</p>
                    <span>Please upload pdf, png, xlsx, docx file format!</span>
                </div>

                <div className={cx("form-1")}>

                    <Form.Item
                        
                        className={cx("label-custom")}
                        label={renderCustomLabel("Date of Start")}
                        rules={[{
                            required: true,
                            message: ' '
                        }]}
                    >
                        <DatePicker
                            value={formUpload.contract_dates}
                            onChange={(date: any) => {
                                // const newConTractDate = convert(date)
                                setFormUpload({ ...formUpload, contract_dates: date });
                            }}
                            size="large"
                            className={cx("style-datepick")}
                        />
                    </Form.Item>

                    <Form.Item
                        
                        className={cx("label-custom")}
                        label={renderCustomLabel("Contract Name")}
                        rules={[{
                            required: true,
                            message: " "
                        }]}
                    >
                        <Input
                            size="large"
                            value={formUpload.names}
                            onChange={(event: any) => {
                                setFormUpload({ ...formUpload, names: event.target.value });
                            }}
                            type="text"
                            className={cx("style-input")}
                            placeholder="Contract Name" />
                    </Form.Item>


                </div>

                <div className={cx("btn-upload")}>
                    <Upload
                        // name="upload"
                        fileList={formUpload.fileList}
                        className={cx("upload")}
                        onChange={handeleChangeFile}
                        beforeUpload={handleBeforeUpload}
                        maxCount={1}
                    >
                        <Button
                            className={cx("btn-upload-img")}
                        >
                            <UploadOutlined />
                            Upload File</Button>
                    </Upload>

                    <p
                        onClick={handleAddContact}
                        className={cx("btn-color-add")}
                    >
                        Add
                    </p>

                </div>
            </div>

            <div className={cx("table-list-doc")}>
                <Table dataSource={newLists} columns={columns} pagination={false} />
            </div>
        </div>
    </div>);
}

export default ContactInfomation;
