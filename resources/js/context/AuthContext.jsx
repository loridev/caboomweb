import { createContext } from "react";

const AuthContext = createContext({
    userId: 0,
    token: ''
});

export default AuthContext;

export function AuthContextProvider(props) {
    
}