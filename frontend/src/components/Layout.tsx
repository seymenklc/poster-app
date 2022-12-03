import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";

export default function Layout() {
    return (
        <main className='h-screen'>
            <Navbar />
            <Outlet />
        </main>
    );
}