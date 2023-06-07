import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Space, Select, Form, Input, DatePicker, Upload, Table } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { AiOutlineDelete, AiOutlineVerticalAlignBottom } from "react-icons/ai";
import { useTranslation } from 'react-i18next';
import { RcFile, UploadChangeParam } from 'antd/lib/upload';
import { UploadOutlined, } from '@ant-design/icons';

import renderCustomLabel from "../CustomLabel/customLabel"
import convert from "../../common/convertDate"
import classNames from "classnames/bind"
import styles from "./style.module.scss";
const cx = classNames.bind(styles);
export interface FormUpload {
    contract_date: any,
    name: string,
    fileList: UploadFile[],
    deletedContracts?: number
}

function ContactInfomation({ fileListContact, setFileListContact }: any) {
    let { id } = useParams()
    const { t } = useTranslation();
    const isEmployE = id ? true : false
    const initialFormUpload = {
        contract_date: "",
        name: "",
        fileList: [],
        deletedContracts: undefined
    };
    const [formUpload, setFormUpload] = useState<FormUpload>(initialFormUpload)
    const [ischeckDate, setCheckDate] = useState<Boolean>(false)
    const [ischeckName, setCheckName] = useState<Boolean>(false)
    const [ischeckFile, setCheckFile] = useState<Boolean>(false)

    const newLists = fileListContact.map((item: any, index: number) => {
        if (item.document) {
            const indexName = Number(item.document.indexOf(item.employee_id)) + `${item.employee_id}`.length + 1

            return { ...item, index: index, name_document: item.document.slice(indexName) }
        } else {
            return { ...item, index: index }
        }
    })
    const columns = [
        {
            title: 'No',
            dataIndex: 'index',
            width: 50,
            key: 'index',
        },
        {
            title: 'Contract Name',
            dataIndex: 'name',
            width: 200,
            key: 'name',
        },
        {
            title: 'Sign Date',
            dataIndex: 'contract_date',
            width: 200,
            key: 'contract_date',
        },
        {
            title: 'Action',
            // dataIndex: '',
            key: 'fileList',
            render: (_: any, record: any, index: number) => (<div className={cx("show-and-delete")}>
                {record.document && <a href={record.document} target="_blank" className={cx("show-item")}>
                    <p>
                        {record.name_document}
                    </p>
                    <AiOutlineVerticalAlignBottom className={cx("icon-show")} />
                </a>}

                <AiOutlineDelete onClick={() => handeleDeleteFile(index)} className={cx("delete-file")} />

            </div>
            ),
        },
    ];

    const handleBeforeUpload = (file: RcFile, fileList: RcFile[]) => {
        // Trả về false để ngăn chặn chức năng submit mặc định
        setCheckFile(false)
        return false;
    };
    const handeleDeleteFile = (indexs: number) => {
        const fileList = fileListContact.filter((item: RcFile, index: number) => index !== indexs);
        setFileListContact(fileList);
        const findId = fileListContact.find((item: RcFile, index: number) => index == indexs);
        setFormUpload({ ...formUpload, deletedContracts: findId.id })

    }

    const handeleChangeFile = ({ fileList }: { fileList: UploadFile[] }) => {
        setFormUpload({ ...formUpload, fileList: [...fileList] });
    };
    const handleAddContact = useCallback(() => {
        if (formUpload.contract_date == "") {
            setCheckDate(true)
            return
        }
        if (formUpload.name == "") {
            setCheckName(true)
            return
        }
        if (formUpload.fileList.length == 0) {
            setCheckFile(true)
            return
        }

        if (formUpload.contract_date !== "", formUpload.name != "", formUpload.fileList.length > 0) {

            formUpload.contract_date = convert(formUpload.contract_date)
            setFileListContact([...fileListContact, formUpload])
            console.log(formUpload)
            setFormUpload(initialFormUpload);
        }

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
                    label={renderCustomLabel(t("Date Start"), true)}
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
                    label={renderCustomLabel(t("Employee Type"), true)}
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
                        label={renderCustomLabel(t("Date of Start"))}
                        rules={[{
                            required: true,
                            message: ' '
                        }]}
                    >
                        <DatePicker
                            value={formUpload.contract_date}
                            onChange={(date: any) => {
                                setCheckDate(false)
                                // const newConTractDate = convert(date)
                                setFormUpload({ ...formUpload, contract_date: date });
                            }}
                            size="large"
                            className={cx("style-datepick", ischeckDate ? "warning" : "")}
                        />
                    </Form.Item>

                    <Form.Item

                        className={cx("label-custom")}
                        label={renderCustomLabel(t("Contract Name"))}
                        rules={[{
                            required: true,
                            message: " "
                        }]}
                    >
                        <Input
                            size="large"
                            value={formUpload.name}
                            onChange={(event: any) => {
                                setCheckName(false)
                                setFormUpload({ ...formUpload, name: event.target.value });
                            }}
                            type="text"
                            className={cx("style-input", ischeckName ? "warning" : "")}
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
                        {ischeckFile && <p className={cx("warning-text")}>No file chosen</p>}
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
