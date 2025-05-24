
import { ToastContainer } from "react-toastify/unstyled";
import 'react-toastify/ReactToastify.css';

export default function AuthLayout({ children }: DefaultPageProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <ToastContainer />
            {children}
        </div>
    )
}