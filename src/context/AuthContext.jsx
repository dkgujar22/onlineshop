import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { redirect} from "react-router";

const AuthContext=createContext();

export const AuthProvider=({children})=>{

    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [user,setUser]=useState(null);
        
    const getuser=async()=>{
        const {data:{user}}=await supabase.auth.getUser();
        setUser(user)
    }

    useEffect(()=>{
        getuser();
        
        supabase.auth.onAuthStateChange((_event,session)=>{
            setUser(session?.user||null)
        })
        console.log(user);
        
    },[])
 const signUp=async()=>{
    const {error}=await supabase.auth.signUp({
        email,
        password,
        name
    })
    
    return error
}

    const login=async()=>{
        const {error}=await supabase.auth.signInWithPassword({
            email,
            password
        })
        return error
    }
    const googleLogin=async()=>{
        const error=await supabase.auth.signInWithOAuth({
            provider:'google'
        })
    }

    const Logout=async()=>{
        await supabase.auth.signOut();
    }

    const requireAuth= async({request})=>{
        // const user=await getUser();
     const {
    data: { session },
  } = await supabase.auth.getSession();

        if(!session){
          console.log("login");
          const url=new URL(request.url)
          throw redirect(`/login?redirectTo=${url.pathname}`)
        }
        return session

    }
  
    return (
        <AuthContext.Provider value={{googleLogin,Logout,requireAuth,name,setName,email,setEmail,password,setPassword,signUp,login}}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth=()=>useContext(AuthContext);

