
import { useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { createContext } from "react";
import { redirect } from "react-router";


const CustomerAuthContext=createContext();

export const CustAuthProvider=({children})=>{
    const [cust,setCust]=useState(null)

    const getUser=async()=>{
        const {data:{user}}=await supabase.auth.getUser();
        setCust(user);
    }
    useEffect(()=>{
        getUser()

        supabase.auth.onAuthStateChange((_event,session)=>{
            setCust(session?.user||null);
        })
        console.log(cust);
        

    },[])

    const login=async(useremail,userpassword)=>{
        const {error}=await supabase.auth.signInWithPassword({
            email:useremail,
            password:userpassword
        })
        if(error){
            return error
        }
    }

    const signIn=async(useremail,userpassword)=>{
        const {error}=await supabase.auth.signUp({
             email:useremail,
            password:userpassword
        })
        if(error){
            return error
        }
    }

    const logout=async()=>{
        await supabase.auth.signOut();

    }

    const requiresecondAuth=async({request})=>{

        const {data:{session}}=await supabase.auth.getSession();

        if(!session){
          const url=new URL(request.url)
          throw redirect(`/signin?redirectTo=${url.pathname}`)

        }
        return session
    }


    return(
        <CustomerAuthContext.Provider value={{cust,setCust,requiresecondAuth,login,signIn,logout}}>
            {children}
        </CustomerAuthContext.Provider>
    )

}

export const useCust=()=>useContext(CustomerAuthContext)