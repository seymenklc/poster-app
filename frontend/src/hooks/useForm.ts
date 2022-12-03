import { ChangeEvent, FormEvent, useState } from 'react';

type FormValues = {
    [key: string]: string;
};

export const useForm = (callback: () => void, initialState: FormValues = {}) => {
    const [values, setValues] = useState(initialState);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValues(prev => ({
            ...prev,
            [e.target?.name]: e.target?.value
        }));
    };

    const onSubmit = (e: FormEvent | HTMLFormElement) => {
        e.preventDefault();
        callback();
        setValues(initialState);
    };

    return { values, onChange, onSubmit };
};