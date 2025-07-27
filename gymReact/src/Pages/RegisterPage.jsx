import { useNavigate } from "react-router-dom";
import { getToken } from "../Helpers/tokenRetrieval";
import { apiFetch } from "../Helpers/apiHelper";
import Button from "../ReusableComponents/Button";
import Label from "../ReusableComponents/FormLabel";
import Input from "../ReusableComponents/FormInput";
import { useEffect, useState } from "react";

function RegisterPage() {
  const nav = useNavigate();

  useEffect(() => {
  localStorage.removeItem('token');
}, []);
  const [registration, setRegistration] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function handleRegistrationSubmit(e) {
    e.preventDefault();
    try {
      const data = await apiFetch('/api/auth/register',
        {method: 'POST',
          body: JSON.stringify(registration),
        }
      );
      alert('registered successfully')
      localStorage.setItem('token',data.jwtToken);
      setRegistration({ name: "", email: "", password: "" });
      nav("/sessions");
   
    } catch (error) {
      alert("an error with registration occurred");
    }
  }
  function handleChange(e) {
    setRegistration({ ...registration, [e.target.name]: e.target.value });
  }
  const areFilled =
    registration.name != "" &&
    registration.email != "" &&
    registration.password != "";

  return (
    <div className="h-screen w-screen">
      <div className="relative">
        <Button className=" absolute top-0 left-0 m-4" onClick={() => nav("/")}>
          Home
        </Button>
        <div className="flex-grow flex justify-center">
          <h1 className="m-10 font-serif text-9xl">Register Page</h1>
        </div>
      </div>

      <form
        className="flex-col flex justify-center items-center space-y-10 m-10"
        onSubmit={handleRegistrationSubmit}
      >
        <div className="flex space-x-5">
          <Label htmlFor="name">Name: </Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={registration.name}
            onChange={handleChange}
          />
        </div>
        <div className="flex space-x-5">
          <Label htmlFor="email">Email: </Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={registration.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex space-x-5">
          <Label htmlFor="password">Password: </Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={registration.password}
            onChange={handleChange}
          />
        </div>
        <p className="m-10"></p>
        <Button type="submit" disabled={!areFilled}>
          Register
        </Button>
      </form>
    </div>
  );
}
export default RegisterPage;