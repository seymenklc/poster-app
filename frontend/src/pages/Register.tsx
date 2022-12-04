import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "@/graphql/mutations";

import { useAuth } from "@/hooks/useAuth";
import { useForm } from "@/hooks/useForm";

import { UserMutationType } from "@/types";

const initialState = {
    email: '',
    password: '',
    username: ''
};

export default function Register() {
    const [error, setError] = useState('');

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();
    const { setAuth } = useAuth();

    const { values, onChange, onSubmit } = useForm(createUser, initialState);

    const [register, { loading }] = useMutation<UserMutationType>(REGISTER_USER, {
        variables: values,
        onCompleted: (user) => {
            if (user) {
                setAuth(user.createUser);
                navigate('/');
            };
        },
        onError: (err) => {
            setError(err.graphQLErrors[0]?.message);
        },
    });

    async function createUser() {
        const isAllFilled = Object.values(values).every(el => el.length);

        if (!isAllFilled) {
            setError('Fields must not be empty');
            return;
        }

        await register();
    }

    useEffect(() => {
        if (error.includes('Email')) {
            emailRef.current?.focus();
        }
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
                <h2 className="font-semibold text-lg text-center mb-2">Signup</h2>
                <form
                    onSubmit={onSubmit}
                    autoComplete='off'
                    className='flex flex-col items-center my-4'
                >
                    <input
                        className='form-input'
                        placeholder='Email'
                        type="email"
                        name='email'
                        ref={emailRef}
                        value={values.email}
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
                    <input
                        className='form-input'
                        placeholder='Username'
                        type="text"
                        name='username'
                        ref={usernameRef}
                        value={values.username}
                        onChange={onChange}
                    />
                    {error && <p className="error">{error}</p>}
                    <button type='submit' className='form-btn' disabled={loading}>
                        {loading ? 'Submitting..' : 'Signup'}
                    </button>
                </form>
                <h6 className='text-center mt-2'>
                    <small className='text-gray-500'>
                        Already have an account? {' '}
                        <Link className='hover:text-gray-800' to='/auth/login'>
                            Login here
                        </Link>
                    </small>
                </h6>
            </div>
        </div>
    );
}