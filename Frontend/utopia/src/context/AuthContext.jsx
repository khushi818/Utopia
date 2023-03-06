import { React, useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthtoken] = useState(() => {
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    })

    const [user, setUser] = useState(() =>
        localStorage.getItem("authTokens")
            ? jwt_decode(localStorage.getItem("authTokens"))
            : null
    );

    // const [loading, setLoading] = useState(true);

    const navigate = useNavigate()

    const loginUser = async (email, password) => {
        const response = await fetch("http://localhost:8000/api/user/login/", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${authToken?.access}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        const data = await response.json();

        if (response.status === 200) {
            setAuthtoken(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem("authTokens", JSON.stringify(data));
            navigate("/");
        } else {
            alert("Something went wrong!");
        }
    }

    const registerUser = async (email, name, password, tc) => {
        const response = await fetch("http://127.0.0.1:8000/api/user/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                name,
                password,
                tc
            })
        });
        if (response.status === 201) {
            navigate("/login");
        } else {
            alert("Something went wrong!");
        }
    };

    const logoutUser = () => {
        setAuthtoken(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        navigate("/login");
    };

    const contextData = {
        user,
        setUser,
        authToken,
        setAuthtoken,
        registerUser,
        loginUser,
        logoutUser
    };


    useEffect(() => {
        if (authToken) {
            setUser(jwt_decode(authToken.access));
        }
    }, [authToken]);

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}