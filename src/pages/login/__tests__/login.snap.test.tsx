import renderer from "react-test-renderer";
import { LoginViewModel } from "../types";
import LoginView from "../view";

function mockGetFnLoginViewModel(email: string, pass: string, loading: boolean) {
    const fnLoginViewModel = jest.fn();

    fnLoginViewModel.mockImplementation(
        () =>
        ({
            email: email,
            isLoading: loading,
            password: pass,
            setEmail: jest.fn(),
            onSubmit: jest.fn(),
            setPassword: jest.fn()
        } as LoginViewModel)
    );

    return fnLoginViewModel;
}

jest.mock("../view.model", () => {
    return mockGetFnLoginViewModel("", "", false);
});

it("Should render correctly", () => {
    const { toJSON } = renderer.create(<LoginView />);

    expect(toJSON()).toMatchSnapshot();
});

jest.mock("../view.model", () => {
    return mockGetFnLoginViewModel("sandrolax@gmail.com", "234234", false);
});

it("Should render correctly with email and password", () => {
    const { toJSON } = renderer.create(<LoginView />);

    expect(toJSON()).toMatchSnapshot();
});

jest.mock("../view.model", () => {
    return mockGetFnLoginViewModel("sandrolax@gmail.com", "234234", true);
});

it("Should render correctly while is loading", () => {
    const { toJSON } = renderer.create(<LoginView />);

    expect(toJSON()).toMatchSnapshot();
});