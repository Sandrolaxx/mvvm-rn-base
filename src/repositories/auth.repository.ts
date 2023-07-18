import { UserModel } from "../common/user.model";
import client from "./client";

export interface loginDTO {
    email: string;
    password: string;
}

export async function login({ email, password }: loginDTO) {
    const { data } = await client.post<UserModel>("/auth", { email, password });

    return data;
}
