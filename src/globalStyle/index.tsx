import { Toaster } from 'react-hot-toast';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import "./style.module.scss"

function GlobalStyle({ children }: any) {
    return (<>
        <Toaster
            position="top-right"
            reverseOrder={false}
        />
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
        {/* Same as */}
        <ToastContainer />
        {
            children
        }
    </>
    );
}

export default GlobalStyle;