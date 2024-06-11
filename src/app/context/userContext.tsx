import { createContext, Dispatch, SetStateAction } from "react";

interface userContextProps {
    isAdmin: boolean;
    setIsAdmin: Dispatch<SetStateAction<boolean>>;
}
const userContext = createContext<userContextProps>({
    isAdmin: false,
    setIsAdmin: () => { },
});

export default userContext;