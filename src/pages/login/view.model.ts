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

            const response = await login({ email, password });

            console.log(response);
        } catch (error) {
            console.error(error);
            
            Alert.alert("Algo deu errado!");
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
