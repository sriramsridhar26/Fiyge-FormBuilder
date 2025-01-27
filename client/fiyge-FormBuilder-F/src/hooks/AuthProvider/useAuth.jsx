import {useNavigate} from "react-router";
import useLocalStorage from "../useLocalStorage/useLocalStorage.jsx";
import {createContext, useContext, useMemo} from "react";

const AuthContext = createContext();
export default function AuthProvider({children}){
    const [user, setUser] = useLocalStorage("user", null);
    const navigate = useNavigate();


    const login = async (data)=>{
        setUser(data);
        navigate("/");
    }
    const logout = async ()=>{
        setUser(null);
        navigate("/login");
    }

    const value = useMemo(
        () =>({
            user,
            login,
            logout
        }),
        [user]
    );

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>

}

export const useAuth = ()=>{
    return useContext(AuthContext);
}