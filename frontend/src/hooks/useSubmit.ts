import { FormEvent } from "react";

const getFormValues = (event: FormEvent | SubmitEvent | HTMLFormElement) => {
    const data = new FormData(event.currentTarget);
    return Object.fromEntries(data.entries());
};

export const useSubmit = (fn: () => void, callback: (values: any) => void) => {
    return (event: FormEvent) => {
        event.preventDefault();

        const values = getFormValues(event);

        fn();
        return callback(values);
    };
};