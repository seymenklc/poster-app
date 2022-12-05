import { AuthType, UserType } from "@/types";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { createContext, useEffect, useState, PropsWithChildren } from "react";

const AuthContext = createContext<AuthType>({} as AuthType);

function AuthProvider({ children }: PropsWithChildren<{}>) {
    const [auth, setAuth] = useState({} as UserType);
    const [ready, setReady] = useState(false);

    useEffect(() => {

    }, []);

    useEffect(() => {
        const token = JSON.stringify(auth?.token);
        if (token) localStorage.setItem('token', token);
    }, [setAuth, auth]);

    useEffect(() => {
        setReady(true);
        // check existing token
        (() => {
            const prevToken = localStorage.getItem('token');

            if (prevToken) {
                const decoded: UserType & JwtPayload = jwtDecode(prevToken);

                if (decoded?.exp != undefined) {
                    const { email, token, username } = decoded;
                    // check if token token expired
                    if (decoded.exp * 1000 < Date.now()) {
                        localStorage.removeItem('token');
                        return;
                    }
                    setAuth({ email, username, token });
                }
            }
        })();
    }, []);

    return (
        <AuthContext.Provider value={{ auth, ready, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };