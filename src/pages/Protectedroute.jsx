
import { redirect } from 'react-router';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';



const Protectedroute = async ({request}) => {
    
    const {user,setUser}=useAuth();
   
    const getUser=async()=>{
            const {data:{user}}=await supabase.auth.getUser();
            setUser(user)
        }
        useEffect(()=>{
            getUser();
            console.log(user);
            
            supabase.auth.onAuthStateChange((session,_event)=>{
            setUser(session?.user||null);
        })
        },[])
    if(!user){
        const url=new URL(request.url)
        throw redirect(`/login?redirectTo=${url.pathname}`)
    }
    return user
    

}

export default Protectedroute
