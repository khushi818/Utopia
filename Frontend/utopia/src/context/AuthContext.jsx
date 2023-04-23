import { React, useState, useEffect, createContext, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    //store access token
    const [authToken, setAuthtoken] = useState("")
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userData, setUserData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (userData) {
            localStorage.setItem("userdata", JSON.stringify(userData))
        }
    }, [userData])

    useEffect(() => {
        if (authToken) {
            localStorage.setItem("token", JSON.stringify(authToken))
            navigate('/')
            setIsAuthenticated(true)
            UserDetails()
        }
    }, [authToken])


    const loginUser = async (username, password) => {
        await fetch("http://localhost:8000/api/user/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        }).then(res => res.json())
            .then((data) => {
                setAuthtoken(data.token.access)
                console.log(data.msg)
            }).catch((errors) =>{
             alert("something went wrong! try again")   
             console.log(errors)
            })
    }

    const UserDetails = async () => {
        await fetch("http://127.0.0.1:8000/api/user/personal", {
            method: "GET",
            headers:
            {
                "Authorization": `Bearer ${authToken}`,
                "Content-Type": "application/json",
            }
        }).then(res => res.json())
            .then((data) => setUserData(data))
            .catch((errors) => {
                console.log(errors)
                alert("something went wrong! try again")
            })
    }


    const registerUser = async (username,email, password) => {
        await fetch("http://127.0.0.1:8000/api/user/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        }).then((res) => res.json())
            .then((data) => {
                console.log(data.msg)
                navigate('/login')
            }).catch((errors) => {
                console.log(errors)
                alert("something went wrong! try again")
            })
    };

    const logoutUser = () => {
        setIsAuthenticated(false)
        setAuthtoken("")
        setUserData("")
        localStorage.removeItem("token");
        localStorage.removeItem("userData")
        navigate("/login");
    };

    const contextData = {
        authToken,
        setAuthtoken,
        setUserData,
        userData,
        registerUser,
        loginUser,
        logoutUser,
        isAuthenticated,
        UserDetails,
        setIsAuthenticated
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}

