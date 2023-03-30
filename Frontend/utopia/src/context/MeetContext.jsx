import { React, useState, useEffect, createContext, useContext, useRef } from "react";
// import { useNavigate } from "react-router-dom";

// const MeetContext = createContext()

// export const useRoomContext = () => {
//     return useContext(MeetContext)
// }

const UserContext = createContext()
const StartContext = createContext()
const ClientContext = createContext()

export const useUsers = () => {
    return useContext(UserContext)
}
export const useStart = () => {
    return useContext(StartContext)
}
export const useClient = () => {
    return useContext(ClientContext)
}

export const MeetProvider = ({ children }) => {
    const [users, setUsers] = useState([])
    const [start, setStart] = useState(false)
    // const rtc = useRef({
    //     // For the local client.
    //     client: null,
    //     // For the local audio and video tracks.
    //     localAudioTrack: null,
    //     localVideoTrack: null,
    // });


    return (
        // <ClientContext.Provider value={rtc}>
        <UserContext.Provider value={[users, setUsers]}>
            <StartContext.Provider value={[start, setStart]}>
                {children}
            </StartContext.Provider>
        </UserContext.Provider>
        // </ClientContext.Provider>
    );
}

