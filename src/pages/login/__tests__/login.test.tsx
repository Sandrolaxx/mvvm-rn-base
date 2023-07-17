import { act } from "react-test-renderer";
import { UserModel } from "../../../common/user.model";
import client from "../../../repositories/client";
import MockAdapter from "axios-mock-adapter";
import useLoginViewModel from "../view.model";
import { renderHook } from "@testing-library/react-hooks";

const mock = new MockAdapter(client);

it("Should be able to sign in", async () => {
    const userPassword = "teste_bala";
    const userName = "Sandrolaxx";
    const userEmail = "sandrolaxx@gmail.com";
    
    const responseUser: UserModel = {
        id: "234",
        email: "sandrolaxx@gmail.com",
        name: "Sandrolaxx",
    }

    mock.onPost("/session").reply(200, responseUser);

    const { result, waitFor } = renderHook(() => useLoginViewModel());

    act(() => result.current.setEmail(userEmail));

    await waitFor(() => result.current.email == userEmail);

    act(() => result.current.setPassword(userPassword));
    
    await waitFor(() => result.current.password == userPassword);
    
    act(async () => await result.current.onSubmit());
    
    await waitFor(() => result.current.isLoading == false);

    expect(result.current.isLoading).toBe(false);
    expect(result.current.password).toBe(userPassword);
    expect(result.current.email).toBe(userEmail);
    expect(mock.history.post[0].url).toEqual("/session");
    expect(mock.history.post[0].data).toEqual(JSON.stringify({ email: userEmail, password: userPassword }));
    
    mock.resetHistory();
});