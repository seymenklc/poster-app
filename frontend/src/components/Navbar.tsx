import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
    const { auth, setAuth } = useAuth();

    const handleLogout = () => {
        setAuth({});
        localStorage.removeItem('token');
    };

    return (
        <nav className="w-full p-4 px-28 mx-auto flex justify-between shadow-sm ">
            <Link to='/home'>
                <h1 className="font-semibold text-2xl text-[#12b488]">Poster</h1>
            </Link>
            {!auth.username && (
                <ul className="flex gap-3 items-center text-lg">
                    <li><Link to='/auth/login'>Login</Link></li>
                    <li><Link to='/auth/register'>Register</Link></li>
                </ul>
            )}
            {auth.username && (
                <div className="flex gap-3 items-center">
                    <span className="text-lg text-slate-600 cursor-default">
                        Hello, {auth.username}
                    </span>
                    <button className="btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
}