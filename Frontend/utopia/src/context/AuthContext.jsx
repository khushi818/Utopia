import { React, useState, useEffect, createContext, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthtoken] = useState(
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    ) // data 
    const [user, setUser] = useState(""); // this store user s token
    const [authenticatedUser, setAuthenticatedUser] = useState(
        localStorage.getItem("userData")
            ? JSON.parse(localStorage.getItem("userData"))
            : null
    ) // user info
    const isAuthenticated = useRef(false)
    // const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (authToken) {
            setUser(`${authToken.token.access}`);
            console.log(user)
        }
    }, [authToken]);

    const navigate = useNavigate()

    const loginUser = async (email, password) => {
        const response = await fetch("http://localhost:8000/api/user/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        const data = await response.json();
        console.log(data)
        if (data) {
            console.log(data.token.access)

            if (response.status === 200) {
                setAuthtoken(data);
                setUser(`${data.token.access}`);
                localStorage.setItem("authTokens", JSON.stringify(data));
                accessUser()
                isAuthenticated.current = true
                navigate('/')
            } else {
                alert("Something went wrong!");
            }
        }
        else {
            console.log("data not found")
        }
        console.log(authToken)
    }

    const accessUser = async () => {
        const response = await fetch("http://127.0.0.1:8000/api/user/profile/", {
            method: "GET",
            headers:
            {
                "Authorization": `Bearer ${user}`,
                "Content-Type": "application/json",
            }
        })
        const data = await response.json()

        console.log(data)
        setAuthenticatedUser(data)
        localStorage.setItem("userData", JSON.stringify(data))
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
        isAuthenticated.current = false
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData")
        navigate("/login");
    };

    const contextData = {
        user,
        setUser,
        authToken,
        setAuthtoken,
        registerUser,
        loginUser,
        logoutUser,
        authenticatedUser,
        setAuthenticatedUser,
        isAuthenticated,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}

