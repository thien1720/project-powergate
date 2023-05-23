import toast, { Toaster } from 'react-hot-toast';
import Header from "../component/Header";
import NavBar from "../component/Navbar";

import classNames from "classnames/bind"
import styles from "./style.module.scss";
const cx = classNames.bind(styles);

function DefaultLayout({ children }: any) {
    return <>
        <Toaster
            position="top-right"
            reverseOrder={false}
        />
        <Header />

        <div className={cx("content-page")}>

            <NavBar />
            <div className={cx("main")}>{children}</div>

        </div>
    </>;
}

export default DefaultLayout; 