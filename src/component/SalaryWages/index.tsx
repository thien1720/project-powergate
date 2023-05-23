
import { Button, Select, Form, Input, DatePicker, InputNumber } from 'antd';
import classNames from "classnames/bind"
import renderCustomLabel from "../../common/customLabel"
import styles from "./style.module.scss";
const cx = classNames.bind(styles);

export interface Salary{
    defaultSalary: any,
}


function SalaryWages(
    {defaultSalary} : Salary
    ) {

    const onChange = (value: any) => {
        console.log('changed', value);
    };
    console.log(defaultSalary)
    return (<div className={cx("salary-wages")}>
        <div className={cx("head-infomation")}>
            <h1>Salary & Wages</h1>
            <p>Required(<span>
                *
            </span>)</p>
        </div>

        <div className={cx("list-salary")}>

            <Form.Item
                name="basic_salary"
                className={cx("label-custom")}
                label={renderCustomLabel("Basic Salary")}
                rules={[{ required: true, message: 'Please input basic salary' }]}
            >
                <InputNumber
                    className={cx("input-values")}
                    size='large'
                />
            </Form.Item>

            <Form.Item
                name="audit_salary"
                className={cx("label-custom")}
                label={renderCustomLabel("Basic Salary (Audit)")}
                rules={[{ required: true, message: 'Please input audit salary' }]}

            >
                <InputNumber
                    className={cx("input-values")}
                    size='large'
                />

            </Form.Item>
            <Form.Item
                name="safety_insurance"
                className={cx("label-custom")}
                label={renderCustomLabel("Safety Insurance Amount")}
                rules={[{ required: true, message: 'Please input safety insurance' }]}

            >
                <InputNumber
                    type='number'
                    className={cx("input-values")}
                    size='large'
                />

            </Form.Item>

            <Form.Item
                name="health_insurance"
                className={cx("label-custom")}
                label={"Healthy Insurance Amount"}
            >
                <InputNumber
                    type='number'
                    className={cx("input-values")}
                    size='large'
                />

            </Form.Item>

            <Form.Item
                name="meal_allowance"
                className={cx("label-custom")}
                label={renderCustomLabel("GenMeal Allowanceder")}
                rules={[{ required: true, message: 'Please input meal allowance' }]}

            >
                <InputNumber
                    type='number'
                    className={cx("input-values")}
                    size='large'
                />

            </Form.Item>
        </div>
    </div>);
}

export default SalaryWages;
