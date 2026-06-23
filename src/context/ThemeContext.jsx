import { createContext, useContext, useState } from "react";

const ThemeContext=createContext();

export const ThemeProvider=({children})=>{
    const [theme, setTheme] = useState("dark");

    const ToggleTheme=()=>{
        setTheme((prev)=>prev==="dark"?"light":"dark")
    }

    return(
        <ThemeContext.Provider value={{theme,ToggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )

}

export const useTheme=()=>useContext(ThemeContext);
