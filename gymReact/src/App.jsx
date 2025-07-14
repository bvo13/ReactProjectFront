import { createBrowserRouter, RouterProvider, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {jwtDecode} from 'jwt-decode';

const router = createBrowserRouter([
  {path: '/',
    element: <HomePage/>
  },
  {path: "/login",
    element: <LoginPage />
  },
  {path: "/register",
    element: <RegisterPage/>
  },
  {path: "/loggedin",
    element: <LoggedInPage/>
  }
]);
function App() {

  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

function HomePage() {

  const nav = useNavigate();
  return (
    <div>
    <h1>Home</h1>
    <button type="button" onClick={e=>{nav('/login')}}>Login</button>
    <button type="button" onClick={e=>{nav('/register')}}>Register</button>
    </div>
  )
  
} 
function LoginPage() {
  const nav = useNavigate();

  const [login, setLogin] = useState({email:'', password:''})
  async function handleLoginSubmit(e){
    e.preventDefault();

    try{
    const response = await fetch('http://localhost:8080/api/auth/login',{
      method:'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(login)
    })
    if(response.ok){
      alert('login successful!')
      const data =  await response.json();
      localStorage.setItem('token',data.jwtToken);
    }
    else{
      alert('Login failed, incorrect credentials')
    }

  }
  catch(error){
    alert('Incorrect Credentials, or other error')
  }
  }

  function handleChange(e){

    setLogin({...login,[e.target.name]:e.target.value});
  }
  const areFilled = login.email!=''&&login.password!='';

  return (<div>
     <form onSubmit={handleLoginSubmit}>
      <label htmlFor="email">Email: </label>
      <input type="email" id="email" name="email" onChange={handleChange} />

      <label htmlFor="password">Password: </label>
      <input type="password" id="password" name="password" onChange={handleChange} />
      <button type="submit" disabled={!areFilled}>Login</button>
      </form>
      <button type ="button" className='backButton' onClick={e=>{nav('/')}}>Home</button>
      </div>
)
}
function RegisterPage() {
  const nav = useNavigate();


  const [registration, setRegistration] = useState({name:'',email:'',password:''})

  async function handleRegistrationSubmit(e){
  e.preventDefault();
  console.log("button clicked")
try{
  const response = await fetch('http://localhost:8080/api/auth/register',{
    method: 'POST',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify(registration)
  }
)
console.log('response'+ response.status)
if(response.ok){
  alert("Successfully registered!")
  setRegistration({name:'',email:'',password:''})
  nav("/loggedin")
}
else{
  alert("failed")
}
}
catch(error){
  alert("an error occurred")
}

}
  function handleChange(e){

    setRegistration({...registration,[e.target.name]:e.target.value});
  }
  const areFilled = registration.name!=''&&registration.email!=''&&registration.password!='';

  return (<div>
  <h2>Register Page</h2>
    <form onSubmit={handleRegistrationSubmit}>
      <label htmlFor="name">Name: </label>
      <input type="text" id="name" name="name" value={registration.name}
      onChange={handleChange}/>

      <label htmlFor="email">Email: </label>
      <input type="email" id="email" name="email" value={registration.email}
      onChange={handleChange}/>

      <label htmlFor="password">Password: </label>
      <input type="password" id="password" name="password" value={registration.password}
      onChange={handleChange}/>

      <button type="submit" disabled={!areFilled} >Register</button>
    </form>
    <button type ="button" className='backButton' onClick={e=>{nav('/')}}>Home</button>
 
    </div>
  )
}

function LoggedInPage(){

  return <SessionList></SessionList>
}

function SessionList(){
  const [sessions, setSessions] = useState([]);

  useEffect(()=>{
    async function getSessions(){
      const response = await fetch(`http://localhost:8080/users/
        ${jwtDecode(localStorage.getItem('token')).userId}/sessions`
        , {
          method:"GET",
          headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        if(!response.ok){
          throw new Error("not found or error")
        }
        const data = await response.json();
        setSessions(data);
    }
    getSessions();
  }, [])
  function handleDateClick(){

  }
  return(
    <div>
      {sessions.length===0?
      <p>No sessions found</p>:
      sessions.map(session=>{
        <button type="button" onClick={handleDateClick}>{session.date}</button>
      })}

    </div>
  )
}

export default App
