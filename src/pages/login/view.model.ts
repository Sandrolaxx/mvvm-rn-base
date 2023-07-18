import { useState } from "react";
import { Alert } from "react-native";
import { login } from "../../repositories/auth.repository";

export default function useLoginViewModel() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoading] = useState(false);

    async function onSubmit() {
        try {
            setLoading(true);

            return await login({ email, password });
        } catch (error) {
            console.error(error);

            Alert.alert("Login error! Check the credentials.");
        } finally {
            setLoading(false);
        }
    }

    return {
        email,
        password,
        isLoading,
        setEmail,
        setPassword,
        onSubmit,
    };
}
