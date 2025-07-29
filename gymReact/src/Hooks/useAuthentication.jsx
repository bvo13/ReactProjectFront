import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { apiFetch } from '../Helpers/apiHelper';
export function useAuthentication(endpoint = '/users/me'){

    const nav = useNavigate();
    
    useEffect(()=>
    {
        const authCheck = async ()=>{
            try{

            await apiFetch(endpoint,{method:"GET"});
            }
            catch(error){
                if(error.message&&error.message.includes("invalid")){
                    nav('/login');
                }
            }
        }
        authCheck();
    },
[nav])
    
}