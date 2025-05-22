
import { ToastContainer } from "react-toastify/unstyled";
import 'react-toastify/ReactToastify.css';

export default function AuthLayout({ children }: DefaultPageProps) {
    return (
        <>
            <ToastContainer />
            {children}
        </>
    )
}