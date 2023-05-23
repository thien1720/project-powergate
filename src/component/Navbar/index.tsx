import { NavLink } from "react-router-dom";

import classNames from "classnames/bind"
import styles from "./style.module.scss";
const cx = classNames.bind(styles);

function NavBar() {
    return (<div className={cx("nav-bar")}>
        <div className={cx("content-nav")}>
            <h1>General</h1>

            <div className={cx("list-page")}>
                <ul>
                    <li>
                        <NavLink to="/atentdance"  className={(nav) => cx("next-page", { active: nav.isActive })}>
                            <div className={cx("icon-page")}>
                                <img src="/image/attendance-management.svg" alt="attend" />

                            </div>
                            Attendance Management
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/leave"  className={(nav) => cx("next-page", { active: nav.isActive })}>
                            <div className={cx("icon-page")}>
                                <img src="/image/leave-management.svg" alt="attend" />

                            </div>
                            Leave Management
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/payroll"  className={(nav) => cx("next-page", { active: nav.isActive })}>
                            <div className={cx("icon-page")}>
                                <img src="/image/payroll-management.svg" alt="attend" />

                            </div>
                            Payroll Management
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/employee" className={(nav) => cx("next-page", { active: nav.isActive })}>
                            <div className={cx("icon-page")}>
                                <img src="/image/employ-management.svg" alt="attend" />

                            </div>
                            Employee Management
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/user"  className={(nav) => cx("next-page", { active: nav.isActive })}>
                            <div className={cx("icon-page")}>
                                <img src="/image/user-management.svg" alt="attend" />

                            </div>
                            User Management
                        </NavLink>
                    </li>


                    <li>
                        <NavLink to="/master"  className={(nav) => cx("next-page", { active: nav.isActive })}>
                            <div className={cx("icon-page")}>
                                <img src="/image/master-management.svg" alt="attend" />

                            </div>
                            Master Management
                        </NavLink>
                    </li>
                </ul>
            </div>
            <hr></hr>

            <div className={cx("advance")}>
                <h1>Advance</h1>
                <div className={cx("list-page")}>
                    <ul>
                        <li>
                            <NavLink to="/setting"  className={(nav) => cx("next-page", { active: nav.isActive })}>
                                <div className={cx("icon-page")}>
                                    <img src="/image/global-setting.svg" alt="attend" />

                                </div>
                                Global Settings
                            </NavLink>
                        </li>

                    </ul>
                </div>
            </div>
        </div>



    </div>);
}

export default NavBar;