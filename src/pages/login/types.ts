import { Dispatch, SetStateAction } from "react";

export interface LoginViewModel {
    email: string;
    password: string;
    setEmail: Dispatch<SetStateAction<string>>;
    setPassword: Dispatch<SetStateAction<string>>;
    isLoading: boolean;
    onSubmit: () => void;
}
