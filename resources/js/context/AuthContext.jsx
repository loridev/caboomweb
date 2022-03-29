import { createContext } from "react";
import Http from "../utils/Http";

const AuthContext = createContext({
    isAuth: false,
    getIsAuth: () => {},
});

export default AuthContext;

export function AuthContextProvider(props) {
    const getIsAuth = async () => {
        const responseFromApi = await Http.fetchData({url: '/sanctum/csrf-cookie'})
    }
}