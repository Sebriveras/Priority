import { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [newContent, setNewContent] = useState("");

    return (
        <UserContext.Provider value={{ newContent, setNewContent }}>
            {children}
        </UserContext.Provider>
    );
};
