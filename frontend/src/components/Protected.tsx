import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function Protected() {
    const { auth } = useAuth();
    const location = useLocation();

    if (!auth?.username) {
        return (
            <Navigate
                to='/auth/login'
                state={{ from: location }}
                replace
            />
        );
    }

    return <Outlet />;
}