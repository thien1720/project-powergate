import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  // Ngôn ngữ mặc định
  fallbackLng: 'en',
  // Ngôn ngữ được hỗ trợ
  supportedLngs: ['en', 'vi'],
  // Đường dẫn đến các file ngôn ngữ
  resources: {
    en: {
      translation: {
        // Các từ/câu trong ngôn ngữ Anh
        // Ví dụ:
        Username: 'Username',
        Password: 'Password',
        Factory : "Factory",
        Name: "Name",
        Gender: "Gender",
        "Mother Name": "Mother Name",
        "Date of birth": "Date of birth",
        "Place of birth": "Place of birth",
        "National Card ID": "National Card ID",
        "Home Address 1": "Home Address 1",
        "Home Address 2": "Home Address 2",
        "Mobile No": "Mobile No",
        "Tel No.": "Tel No.",
        "Marriage Status": "Marriage Status",
        "Bank Card No.": "Bank Card No.",
        "Bank Account No.": "Bank Account No.",
        "Bank Name": "Bank Name",
        "Family Card Number": "Family Card Number",
        "Safety Insurance No.": "Safety Insurance No.",
        "Health Insurance No.": "Health Insurance No.",
        "Date Start": "Date Start",
        "Employee Type": "Employee Type",
        "Contract Date": "Contract Date",
        "Contract Name": "Contract Name",
        "Department": "Department",
        "Position": "Position",
        "Basic Salary": "Basic Salary",
        "Basic Salary (Audit)": "Basic Salary (Audit)",
        "Safety Insurance Amount": "Safety Insurance Amount",
        "Healthy Insurance Amount": "Healthy Insurance Amount",
        "Meal Allowance": "Meal Allowance",
        "Grade": "Grade",
        "Remark": "Remark",
        "HRM User Account": "HRM User Account",

      },
    },
    vi: {
      translation: {
        // Các từ/câu trong ngôn ngữ Việt
        // Ví dụ:
        Username: 'Họ Và Tên',
        Password: 'Mật Khẩu',
        Factory: "Doanh Nghiệp",
        Name: "Tên",
        Gender: "Giới Tính",
        "Mother Name": "Tên Mẹ",
        "Date of birth": "Ngày Sinh",
        "Place of birth": "Nơi Sinh",
        "National Card ID": "ID thẻ quốc gia",
        "Home Address 1": "Địa chỉ nhà 1",
        "Home Address 2": "Địa chỉ nhà 2",
        "Mobile No": "Điện Thoại",
        "Tel No.": "Số điện thoại",
        "Marriage Status": "Tình trạng hôn nhân",
        "Bank Card No.": "Số thẻ ngân hàng",
        "Bank Account No.": "Số tài khoản ngân hàng.",
        "Bank Name": "Tên Ngân hàng",
        "Family Card Number": "Số thẻ gia đình",
        "Safety Insurance No.": "Số bảo hiểm an toàn",
        "Health Insurance No.": "Số Bảo hiểm Y tế",
        "Date Start": "Ngày Băt đầu",
        "Employee Type": "Loại nhân viên*",
        "Contract Date": "Thời hạn hợp đồng",
        "Contract Name": "Tên hợp đồng",
        "Department": "Phòng Ban",
        "Position": "Vị trí",
        "Basic Salary": "Lương cơ bản",
        "Basic Salary (Audit)": "Lương cơ bản (Kiểm toán)",
        "Safety Insurance Amount": "Số tiền bảo hiểm an toàn",
        "Healthy Insurance Amount": "Số tiền bảo hiểm sức khỏe",
        "Meal Allowance": "Trợ cấp bữa ăn",
        "Grade": "Cấp",
        "Benefit": "Lợi ích",
        "Remark": "Nhận xét",
        "HRM User Account": "Tài khoản người dùng HRM",
      },
    },
  },
});

export default i18n;
