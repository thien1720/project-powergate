// const handleTabChange = (activeKey: string) => {
//     // setActiveTab(activeKey);
//     // console.log(activeKey)
//     formRef.current?.validateFields().then((values) => {
//         setIsEmploy(false)
//         setIsContact(false)
//         setIsAdd(false)
//         // Do something when the form is valid
//     }).catch((error: any) => {
//         // console.log(error)
//         const filErrorCon = error.errorFields.some((err: any) => {
//             return err.name.toString() === "contract_start_date" || err.name.toString() === "type"
//         })

//         const filErrorEm = error.errorFields.some((err: any) => {
//             return err.name.toString() === "name"
//                 || err.name.toString() === "gender"
//                 || err.name.toString() === "nc_id"
//                 || err.name.toString() === "ktp_no"
//                 || err.name.toString() === "nc_id"
//         })

//         // check Employee
//         if (error.errorFields && activeKey == "2" && filErrorEm) {
//             // console.log("contract")
//             setIsEmploy(true)
//             if (filErrorCon) {
//                 // setIsEmploy(false)
//                 console.log("contactset")
//                 setIsContact(true)
//                 return
//             }
//         } else if (filErrorCon) {
//             setIsEmploy(false)
//         }

//         // check contact
//         if (error.errorFields && activeKey == "1" && filErrorCon) {
//             // console.log("employContact")

//             setIsContact(true)
//             if (filErrorEm) {
//                 setIsEmploy(true)
//                 return
//             }
//             // setIsEmploy(true)
//         } else if (filErrorEm) {
//             setIsContact(false)
//         }

//         // check Employee Detail
//         if (error.errorFields && activeKey === "3") {
//             // console.log("detail")
//             // console.log(filErrorEm)
//             if (filErrorCon && filErrorEm) {
//                 setIsContact(true)
//                 setIsEmploy(true)
//                 return
//             }

//             if (filErrorEm) {
//                 setIsEmploy(true)
//                 return
//             }
//             if (filErrorCon) {
//                 setIsContact(true)
//                 return
//             }

//         }
//         // check Salary
//         if (error.errorFields && activeKey == "4") {
//             // console.log(filErrorEm)
//             if (filErrorCon && filErrorEm) {
//                 setIsContact(true)
//                 setIsEmploy(true)
//                 return
//             }
//             if (filErrorEm) {
//                 setIsEmploy(true)
//                 return
//             }
//             if (filErrorCon) {
//                 setIsContact(true)
//                 return

//             }

//         }

//         // check other
//         if (error.errorFields && activeKey == "5") {
//             // console.log(filErrorEm)
//             if (filErrorCon && filErrorEm) {
//                 setIsContact(true)
//                 setIsEmploy(true)
//                 return
//             }
//             if (filErrorEm) {
//                 setIsEmploy(true)
//                 return
//             }
//             if (filErrorCon) {
//                 setIsContact(true)
//                 return
//             }

//         }
//     });
// };

export {}