import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "@/graphql/mutations";

import { useAuth } from "@/hooks/useAuth";
import { useForm } from "@/hooks/useForm";

import { UserMutationType } from "@/types";

const initialState = {
    username: '',
    password: ''
};

export default function Login() {
    const [error, setError] = useState('');

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();
    const { setAuth } = useAuth();

    const { values, onChange, onSubmit } = useForm(loginUser, initialState);

    const [login, { loading }] = useMutation<UserMutationType>(LOGIN_USER, {
        variables: values,
        onCompleted: (user) => {
            if (user) {
                setAuth(user.loginUser);
                navigate('/');
            };
        },
        onError: (err) => {
            setError(err.graphQLErrors[0]?.message);
        },
    });

    async function loginUser() {
        const isAllFilled = Object.values(values).every(el => el.length);

        if (!isAllFilled) {
            setError('Fields must not be empty');
            return;
        }

        await login();
    }

    useEffect(() => {
        if (error.includes('Password')) {
            passwordRef.current?.focus();
        }
        if (error.includes('Username')) {
            usernameRef.current?.focus();
        }
        setTimeout(() => setError(''), 3000);
    }, [error]);

    return (
        <div className="bg-[#12b488] p-5 w-72 h-96 mx-auto my-12 rounded-lg">
            <div className="bg-zinc-50 p-5 w-72 h-96 rounded-lg drop-shadow-xl">
                <h2 className="font-semibold text-lg text-center mb-2">Login</h2>
                <form
                    onSubmit={onSubmit}
                    autoComplete='off'
                    noValidate
                    className='flex flex-col items-center'
                >
                    <input
                        className='form-input'
                        placeholder='Username'
                        type="text"
                        name='username'
                        ref={usernameRef}
                        value={values.username}
                        onChange={onChange}
                    />
                    <input
                        className='form-input'
                        placeholder='Password'
                        type="password"
                        name='password'
                        ref={passwordRef}
                        value={values.password}
                        onChange={onChange}
                    />
                    {error && <p className="error">{error}</p>}
                    <button type='submit' className='form-btn' disabled={loading}>
                        {loading ? 'Submitting..' : 'Login'}
                    </button>
                </form>
                <h6 className='text-center mt-2'>
                    <small className='text-gray-500'>
                        Don't have an account? {' '}
                        <Link className='hover:text-gray-800' to='/auth/register'>
                            Signup here
                        </Link>
                    </small>
                </h6>
            </div>
        </div>
    );
}