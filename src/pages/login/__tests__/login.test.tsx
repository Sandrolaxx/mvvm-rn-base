import { renderHook } from "@testing-library/react-hooks";
import MockAdapter from "axios-mock-adapter";
import { Alert } from "react-native";
import { act } from "react-test-renderer";
import { UserModel } from "../../../common/user.model";
import client from "../../../repositories/client";
import useLoginViewModel from "../view.model";

const mock = new MockAdapter(client);

it("Should be able to sign in", async () => {
    const userPassword = "teste_bala";
    const userEmail = "sandrolaxx@gmail.com";
    let userResponse: UserModel | undefined;

    const expectedResponseUser: UserModel = {
        id: "234",
        email: "sandrolaxx@gmail.com",
        name: "Sandrolaxx",
    }

    mock.onPost("/auth").reply(200, expectedResponseUser);

    const { result, waitFor } = renderHook(() => useLoginViewModel());

    act(() => result.current.setEmail(userEmail));

    await waitFor(() => result.current.email == userEmail);

    act(() => result.current.setPassword(userPassword));

    await waitFor(() => result.current.password == userPassword);

    act(async () => {
        userResponse = await result.current.onSubmit();
    });

    await waitFor(() => result.current.isLoading == false);

    expect(result.current.isLoading).toBe(false);
    expect(result.current.password).toBe(userPassword);
    expect(result.current.email).toBe(userEmail);

    expect(userResponse?.name).toBe(expectedResponseUser.name);
    expect(userResponse?.id).toBe(expectedResponseUser.id);
    expect(userResponse?.email).toBe(userEmail);

    expect(mock.history.post[0].url).toEqual("/auth");
    expect(mock.history.post[0].data).toEqual(JSON.stringify({ email: userEmail, password: userPassword }));

    mock.resetHistory();
});

it("Should handle error on sign in", async () => {
    const userEmail = "sandrolaxx@gmail.com";
    const userPassword = "12354";

    mock.onPost("/auth").reply(404, "User not found");

    const alert = jest.spyOn(Alert, "alert");

    const { result, waitFor } = renderHook(() => useLoginViewModel());

    act(() => result.current.setEmail(userEmail));

    await waitFor(() => result.current.email == userEmail);

    act(() => result.current.setPassword(userPassword));

    await waitFor(() => result.current.password == userPassword);

    act(async () => {
        await result.current.onSubmit();
    });

    await waitFor(() => result.current.isLoading == false);

    expect(result.current.isLoading).toBe(false);
    expect(result.current.password).toBe(userPassword);
    expect(result.current.email).toBe(userEmail);

    expect(mock.history.post[0].url).toEqual("/auth");
    expect(mock.history.post[0].data).toEqual(JSON.stringify({ email: userEmail, password: userPassword }));

    expect(alert).toHaveBeenCalledWith("Login error! Check the credentials.");

    mock.resetHistory();
});