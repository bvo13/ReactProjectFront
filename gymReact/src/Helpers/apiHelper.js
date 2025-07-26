import {getToken} from './tokenRetrieval'
export async function apiFetch(endpoint, request){

    const token = getToken();

    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const headers= {
        'Content-Type':'application/json',
        ...request.headers|| {}
    }

    if(token){
        headers['Authorization'] = `Bearer ${token}`
        
    }

    const response = await fetch(`${BASE_URL}${endpoint}`,
        {
            ...request,
            headers,
        }
    );

    let data;
    try{
        data = await response.json();
    }
    catch(error){
        throw new Error('error in parsing JSON')
    }
    if(!response.ok){
        throw new Error(data.message || `failed with status ${response.status}`)
    }
}