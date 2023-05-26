import { FormItemProps } from 'antd/lib/form';
import classNames from "classnames/bind"
import styles from "./style.module.scss";
const cx = classNames.bind(styles);

export default function renderCustomLabel(label: string, required?: boolean) {
    return <p className={cx("label-input")}>
        {label}
        {
            required ? <span>*</span> : <></>
        }
    </p>
}